<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Domain\Users\Models\User;
use Illuminate\Support\Facades\Log;

class AuthLogOutController
{

    public function logout(Request $request)
    {
        Log::info('AuthLogOutController##########################################################################################################');
        Log::info('Authenticated user: ', [$request->user()]);
        Log::info('Authenticated user ID: ', [$request->user()->id]);
        $request->user('sanctum')->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout successfully',
        ], 200);
    }
}
