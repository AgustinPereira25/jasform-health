<?php

declare(strict_types=1);

namespace App\Users\Controllers;

use Illuminate\Pagination\Paginator;
use App\Users\Transformers\UserListTransformer;
use Domain\Users\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class ListUserController
{
    public function __invoke(Request $request): JsonResponse
    {
        $perPage = $request->get('perPage', 10);
        $currentPage = $request->get('currentPage', 1);
        $isActive = $request->get('isActive', "false");
        $isAdmin = $request->get('isAdmin', "false");

        Paginator::currentPageResolver(function () use ($currentPage) {
            return $currentPage;
        });

        if ($isActive=="true" && $isAdmin=="true") {
            $users = QueryBuilder::for(User::class)
            ->with(['organization', 'roles'])
            ->where('is_active', true)
            ->whereHas('roles', function ($query) {
                $query->where('name', 'Admin');
            })
            ->paginate($perPage);
        } elseif ($isActive=="true") {
            $users = QueryBuilder::for(User::class)
            ->with(['organization', 'roles'])
            ->where('is_active', true)
            ->paginate($perPage);
        } elseif ($isAdmin=="true") {
            $users = QueryBuilder::for(User::class)
            ->with(['organization', 'roles'])
            ->whereHas('roles', function ($query) {
                $query->where('name', 'Admin');
            })
            ->paginate($perPage);
        } else {
            $users = QueryBuilder::for(User::class)
            ->with(['organization', 'roles'])
            ->paginate($perPage);
        }

        return responder()
            ->success($users, UserListTransformer::class)
            ->respond();
    }
}
