<?php

namespace App\Roles\Controllers;

use App\Roles\Request\StoreRoleRequest;
use App\Roles\Transformers\RoleTransformer;
use Domain\Roles\Actions\StoreRoleAction;
use Illuminate\Http\JsonResponse;

class StoreRoleController
{
    public function __invoke(StoreRoleRequest $request, StoreRoleAction $storeRoleAction): JsonResponse
    {
        $role = $storeRoleAction->execute($request->toDto());

        return responder()
            ->success($role, RoleTransformer::class)
            ->respond(JsonResponse::HTTP_CREATED);
    }
}
