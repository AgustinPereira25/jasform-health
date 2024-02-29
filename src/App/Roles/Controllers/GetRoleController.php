<?php

namespace App\Roles\Controllers;

use App\Roles\Transformers\RoleTransformer;
use Domain\Roles\Models\Role;
use Illuminate\Http\JsonResponse;

class GetRoleController
{
    public function __invoke(Role $role): JsonResponse
    {
        return responder()
            ->success($role, RoleTransformer::class)
            ->respond();
    }
}
