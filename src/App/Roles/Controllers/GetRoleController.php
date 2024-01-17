<?php

namespace App\Roles\Controllers;

use Domain\Roles\Models\Role;
use App\Roles\Transformers\RoleTransformer;
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
