<?php

namespace App\Completer_users\Controllers;

use App\Completer_users\Transformers\Completer_userTransformer;
use Domain\Completer_users\Models\Completer_user;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class ListCompleter_userController
{
    public function __invoke(Request $request): JsonResponse
    {
        $completer_users = QueryBuilder::for(Completer_user::class)
            ->get();

        return responder()
            ->success($completer_users, Completer_userTransformer::class)
            ->respond();
    }
}
