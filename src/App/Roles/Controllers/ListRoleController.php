<?php

namespace App\Roles\Controllers;

use Illuminate\Http\Request;
use Domain\Roles\Models\Role;
use App\Roles\Transformers\RoleTransformer;
use Illuminate\Http\JsonResponse;
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
