<?php

declare(strict_types=1);

namespace App\Users\Controllers;

use Illuminate\Pagination\Paginator;
use App\Users\Transformers\UserListTransformer;
use Domain\Users\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class ListActiveUserController
{
    public function __invoke(Request $request): JsonResponse
    {
        $perPage = $request->get('perPage', 10);
        $currentPage = $request->get('currentPage', 1);

        Paginator::currentPageResolver(function () use ($currentPage) {
            return $currentPage;
        });

        $users = QueryBuilder::for(User::class)
            ->with(['organization', 'roles'])
            ->where('is_active', true)
            ->paginate($perPage);

        return responder()
            ->success($users, UserListTransformer::class)
            ->respond();
    }
}
