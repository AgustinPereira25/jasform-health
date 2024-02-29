<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
