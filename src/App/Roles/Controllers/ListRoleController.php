<?php

namespace App\Roles\Controllers;

use App\Roles\Transformers\RoleTransformer;
use Domain\Roles\Models\Role;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class ListRoleController
{
    public function __invoke(Request $request): JsonResponse
    {
        $roles = QueryBuilder::for(Role::class)
            ->get();

        return responder()
            ->success($roles, RoleTransformer::class)
            ->respond();
    }
}
