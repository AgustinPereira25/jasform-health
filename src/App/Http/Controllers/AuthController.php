<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Domain\Users\Models\User;
use Illuminate\Support\Facades\Log;
use App\Users\Transformers\UserListTransformer;

class AuthController
{
    protected $transformer;

    public function __construct(UserListTransformer $transformer)
    {
        $this->transformer = $transformer;
    }

    public function login(Request $request)
    {
        Log::info('AuthController##########################################################################################################');

        $credentials = $request->only('email', 'password');
        // Log::info('credentials-email: ' . $credentials['email']);
        // Log::info('credentials-password: ' . $credentials['password']);


        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Incorrect email or password',
            ], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();

        $token = $user->createToken('api-token');

        $user = $this->transformer->transform($user);

        return response()->json([
            'message' => 'Logged in successfully',
            'user' => $user,
            'accessToken' => $token->plainTextToken,
        ], 200);
    }

    public function recover(Request $request)
    {
        return response()->json([
            'message' => 'An error occurred. Please try again later, or contact us if the problem persists.',
        ], 500);
    }

    public function register(Request $request)
    {
        return response()->json([
            'message' => 'An error occurred. Please try again later, or contact us if the problem persists.',
        ], 500);
    }
}
