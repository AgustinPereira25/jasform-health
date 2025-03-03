<?php

namespace App\Http\Controllers;

use App\Users\Request\StoreUserRequest;
use App\Users\Transformers\UserListTransformer;
use Domain\Users\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Domain\Users\Actions\StoreUserAction;
use Illuminate\Http\JsonResponse;
use App\Users\Transformers\UserTransformer;
use Domain\Organizations\Models\Organization;
use Domain\Roles\Models\Role;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;
use Illuminate\Support\Str;

class AuthController
{
    protected $transformer;

    public function __construct(UserListTransformer $transformer)
    {
        $this->transformer = $transformer;
    }

    public function login(Request $request)
    {
        Log::info(
            'AuthController-login##########################################################################################################'
        );

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return responder()
                ->error()
                ->data([
                    'code' => 401,
                    'message' => 'Incorrect email or password.',
                ])
                ->respond(401);
            // throw ValidationException::withMessages(['Incorrect email or password']);
        }

        if (!$user->is_active) {
            return responder()
                ->error()
                ->data([
                    'code' => 402,
                    'message' => 'Your user is currently inactive, contact your administrator.',
                ])
                ->respond(402);
        }

        if ($user->is_two_factor_email_active) {
            if (!$request->has('two_factor_code')) {
                DB::table('two_factor_tokens')->where('email', $user->email)->delete();

                $token = Str::random(8);
                DB::table('two_factor_tokens')->insert([
                    'email' => $user->email,
                    'token' => $token,
                    'token_type' => 'email',
                    'created_at' => Carbon::now(),
                ]);

                $userFullName = "$user->first_name $user->last_name";

                try {
                    Mail::send('emails.loginTwoFactorEmail', ['userFullName' => $userFullName, 'token' => $token], function ($message) use ($user) {
                        $message->to($user->email);
                        $message->subject('Login with Two Factor Authentication - JASForm');
                    });
                } catch (\Exception $e) {
                    return responder()
                        ->error(
                            message: 'An error occurred while sending the email. Please try again.'
                        )
                        ->respond(status: 500);
                }

                return responder()
                    ->success([
                        'message' => 'A two-factor authentication code has been sent to your email.'
                    ])
                    ->respond(273);
            }

            $twoFactorToken = DB::table('two_factor_tokens')
                ->where('email', $user->email)
                ->where('token', $request->two_factor_code)
                ->where('token_type', 'email')
                ->first();

            if (!$twoFactorToken || Carbon::now()->diffInMinutes($twoFactorToken->created_at) > 15) {
                return responder()
                    ->error()
                    ->data([
                        'message' => 'The provided two-factor authentication code is incorrect or expired.',
                    ])
                    ->respond(401);
            }

            DB::table('two_factor_tokens')->where('email', $user->email)->where('token_type', 'email')->delete();
        }


        // if (!Auth::attempt($credentials)) {
        //     return response()->json([
        //         'message' => 'Incorrect email or password',
        //     ], 401);
        // }

        // $user = User::where('email', $request->email)->firstOrFail();

        $token = $user->createToken('api-token');

        $user = $this->transformer->transform($user);

        return responder()
            ->success([
                'message' => 'Logged in successfully',
                'user' => $user,
                'accessToken' => $token->plainTextToken,
            ])
            ->respond();
    }


    public function recover(Request $request)
    {
        sleep(1);
        if (!$request->has('email')) {
            return responder()
                ->error(
                    message: 'An email address is required to recover your password.'
                )
                ->respond(status: 500);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return responder()
                ->error(
                    message: 'An error occurred. Please try again later, or contact us if the problem persists.'
                )
                ->respond(status: 500);
        }

        DB::table('password_reset_tokens')->where('email', $user->email)->delete();

        $token = Hash::make($user->email . Str::random(40));
        DB::table('password_reset_tokens')->insert([
            'email' => $user->email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);

        $userFullName = "$user->first_name $user->last_name";

        try {
            Mail::send('emails.recover', ['userFullName' => $userFullName, 'token' => $token], function ($message) use ($user) {
                $message->to($user->email);
                $message->subject('Recover your Account - JASForm');
            });
        } catch (\Exception $e) {
            return responder()
                ->error(
                    message: 'An error occurred while sending the email. Please try again.'
                )
                ->respond(status: 500);
        }

        return responder()
            ->success()
            ->respond(status: 200);
    }

    public function recoverChangePassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'newPassword' => 'required|min:8|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/|confirmed',
        ]);

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return responder()
                ->error(
                    message: 'An error occurred. Please try again later, or contact us if the problem persists.'
                )
                ->respond(status: 404);
        }

        $tokenData = DB::table('password_reset_tokens')->where('email', $request->email)->first();

        if (!$tokenData) {
            return responder()
                ->error(
                    message: 'There is no data for these parameters. Please try again.'
                )
                ->respond(status: 400);
        }

        if (($request->token !== $tokenData->token) || ($request->email !== $tokenData->email)) {
            return responder()
                ->error(
                    message: 'All data does not match. Please try again.'
                )
                ->respond(status: 400);
        }

        $tokenCreationDate = Carbon::parse($tokenData->created_at);

        if (Carbon::now()->diffInMinutes($tokenCreationDate) > 30) {
            return responder()
                ->error(
                    message: 'The token has expired. Please request a new one.'
                )
                ->respond(status: 400);
        }

        $user->password = Hash::make($request->newPassword);
        $user->save();

        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        return responder()
            ->success()
            ->respond(status: 200);
    }


    public function registerPreEmailValidation(Request $request)
    {
        sleep(1);

        $request->validate([
            'email' => 'required|email',
        ]);

        $email = $request->input('email');

        $user = User::where('email', $email)->first();

        if ($user) {
            return response()->json(['error' => 'There was an error. Try again later or contact us.'], 400);
        }

        DB::table('password_reset_tokens')->where('email', $email)->delete();

        $token = Str::random(8);

        DB::table('password_reset_tokens')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);

        try {
            Mail::send('emails.registerEmailValidation', ['email' => $email, 'token' => $token], function ($message) use ($email) {
                $message->to($email);
                $message->subject('Pre-Validate your email - JASForm');
            });
        } catch (\Exception $e) {
            return responder()
                ->error(
                    message: 'An error occurred while sending the email. Please try again.'
                )
                ->respond(status: 500);
        }

        return response()->json(['success' => 'A code has been sent to your email.'], 200);
    }


    public function register(StoreUserRequest
    $request, StoreUserAction $storeUserAction): JsonResponse
    {
        sleep(1);
        $request->validate([
            'emailValidationCode' => 'required',
        ]);
        $emailValidationCode = $request->input('emailValidationCode');

        $tokenRecord = DB::table('password_reset_tokens')->where('token', $emailValidationCode)->first();
        if (!$tokenRecord) {
            return response()->json(['error' => 'Invalid validation code.'], 400);
        }
        $emailRecord = DB::table('password_reset_tokens')->where('email', $request->input('email'))->first();
        if (!$emailRecord) {
            return response()->json(['error' => 'There is no email record.'], 400);
        }

        $matchRecords = DB::table('password_reset_tokens')->where('email', $request->input('email'))->first();
        if ($matchRecords->token !== $emailValidationCode) {
            return response()->json(['error' => 'The data does not match'], 400);
        }

        $tokenAge = Carbon::now()->diffInMinutes($tokenRecord->created_at);
        if ($tokenAge > 30) {
            DB::table('password_reset_tokens')->where('email', $request->input('email'))->delete();
            return response()->json(['error' => 'The validation code has expired. Try again.'], 400);
        }

        $organizationName = $request->input(StoreUserRequest::ORGANIZATION_NAME);
        $organization = Organization::firstOrCreate(
            ['name' => $organizationName],
            ['description' => $organizationName]
        );
        $request->merge([StoreUserRequest::ORGANIZATION_ID => $organization->id]);

        $roleName = "Creator";
        $role = Role::where('name', $roleName)->first();
        if (!$role) {
            $errorMessage = "The role '$roleName' does not exist.";
            throw new \RuntimeException($errorMessage);
        }
        $request->merge([StoreUserRequest::ROLE_ID => $role->id]);

        $request->merge([StoreUserRequest::IS_TWO_FACTOR_EMAIL_ACTIVE => 0]);
        // $request->merge([StoreUserRequest::IS_ACTIVE => 0]);

        $user = null;

        DB::transaction(function () use ($request, $storeUserAction, &$user) {
            try {
                $user = $storeUserAction->execute($request->toDto());
                $user->email_verified_at = Carbon::now();
                $user->save();
            } catch (QueryException $e) {
                if ($e->getCode() == 23000) {
                    $errorMessage = 'An account with this email already exists.';
                    throw new \InvalidArgumentException($errorMessage);
                }
                throw $e;
            }
        });

        DB::table('password_reset_tokens')->where('email', $request->input('email'))->delete();

        return responder()
            ->success($user->refresh(), UserTransformer::class)
            ->respond(JsonResponse::HTTP_CREATED);
    }
}
