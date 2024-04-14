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

    public function register(StoreUserRequest
    $request, StoreUserAction $storeUserAction): JsonResponse
    {
        sleep(1);
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

        $user = null;

        DB::transaction(function () use ($request, $storeUserAction, &$user) {
            try {
                $user = $storeUserAction->execute($request->toDto());
            } catch (QueryException $e) {
                if ($e->getCode() == 23000) {
                    $errorMessage = 'An account with this email already exists.';
                    throw new \InvalidArgumentException($errorMessage);
                }
                throw $e;
            }
        });

        return responder()
            ->success($user->refresh(), UserTransformer::class)
            ->respond(JsonResponse::HTTP_CREATED);
    }
}
