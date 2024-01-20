<?php

declare(strict_types=1);

namespace App\Users\Controllers;

use App\Users\Transformers\UserListTransformer;
use Domain\Users\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class ListUserController
{
    public function __invoke(Request $request): JsonResponse
    {
        $users = QueryBuilder::for(User::class)
            ->with(['organization', 'roles'])
            ->get();

        return responder()
            ->success($users, UserListTransformer::class)
            ->respond();
    }
}
