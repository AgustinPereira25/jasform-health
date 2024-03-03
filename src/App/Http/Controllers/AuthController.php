<?php

namespace App\Http\Controllers;

use App\Users\Transformers\UserListTransformer;
use Domain\Users\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

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

    // public function register(Request $request)
    // {
    //     return response()->json([
    //         'message' => 'An error occurred. Please try again later, or contact us if the problem persists.',
    //     ], 500);
    // }
}
