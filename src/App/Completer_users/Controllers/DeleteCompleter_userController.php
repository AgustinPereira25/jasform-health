<?php

namespace App\Completer_users\Controllers;

use Domain\Completer_users\Models\Completer_user;
use Illuminate\Http\JsonResponse;

class DeleteCompleter_userController
{
    public function __invoke(Completer_user $completer_user): JsonResponse
    {
        $completer_user->delete();

        return responder()
            ->success()
            ->respond();
    }
}
