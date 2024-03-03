<?php

declare(strict_types=1);

namespace App\Users\Controllers;

use Domain\Users\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DeleteUserController
{
    public function __invoke(Request $request, User $user): JsonResponse
    {
        $loggedUser = $request->user();
        if (!$loggedUser) {
            return responder()->error('Unauthenticated')->respond(500);
        }
        $loggedRoleName = $loggedUser->role->name;
        if ($loggedRoleName !== 'Admin') {
            if ($loggedUser->id != $user->id) {
                return responder()->error('You do not have permission for this request')->respond(500);
            }
        }



        $user->delete();

        return responder()
            ->success()
            ->respond();
    }
}
