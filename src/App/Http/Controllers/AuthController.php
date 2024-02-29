<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Domain\Users\Models\User;
use Illuminate\Support\Facades\Log;
use App\Users\Transformers\UserListTransformer;
use Illuminate\Support\Facades\Hash;
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
        Log::info('AuthController-login##########################################################################################################');

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Incorrect email or password'],
            ]);
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
