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
        $request->user()->currentAccessToken()->delete();

        return responder()
            ->success([
                'message' => 'Logout successfully',
            ])
            ->respond();
    }
}
