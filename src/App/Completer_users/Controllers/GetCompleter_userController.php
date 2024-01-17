<?php

namespace App\Completer_users\Controllers;

use Domain\Completer_users\Models\Completer_user;
use App\Completer_users\Transformers\Completer_userTransformer;
use Illuminate\Http\JsonResponse;

class GetCompleter_userController
{
    public function __invoke(Completer_user $completer_user): JsonResponse
    {
        return responder()
            ->success($completer_user, Completer_userTransformer::class)
            ->respond();
    }
}
