<?php

namespace App\Roles\Controllers;

use Domain\Roles\Models\Role;
use Illuminate\Http\JsonResponse;

class DeleteRoleController
{
    public function __invoke(Role $role): JsonResponse
    {
        $role->delete();

        return responder()
            ->success()
            ->respond();
    }
}
