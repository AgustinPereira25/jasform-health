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
        return responder()
            ->error(
                message: 'An error occurred. Please try again later, or contact us if the problem persists.'
            )
            ->respond(status: 500);
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
