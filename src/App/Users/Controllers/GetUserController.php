<?php

declare(strict_types=1);

namespace App\Users\Controllers;

use App\Users\Transformers\UserDetailTransformer;
use Domain\Users\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GetUserController
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

        sleep(1);
        return responder()
            ->success($user, UserDetailTransformer::class)
            ->respond();
    }
}
