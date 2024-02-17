<?php

declare(strict_types=1);

namespace App\Users\Controllers;

use App\Users\Request\StoreUserRequest;
use App\Users\Transformers\UserTransformer;
use Domain\Users\Actions\StoreUserAction;
use Illuminate\Http\JsonResponse;
use Domain\Organizations\Models\Organization;
use Domain\Roles\Models\Role;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

class StoreUserController
{
    public function __invoke(StoreUserRequest $request, StoreUserAction $storeUserAction): JsonResponse
    {
        sleep(1);
        $organizationName = $request->input(StoreUserRequest::ORGANIZATION_NAME);
        $organization = Organization::firstOrCreate(
            ['name' => $organizationName],
            ['description' => $organizationName]
        );
        $request->merge([StoreUserRequest::ORGANIZATION_ID => $organization->id]);

        $roleName = $request->input(StoreUserRequest::ROLE_NAME);
        $role = Role::where('name', $roleName)->first();
        if (!$role) {
            $errorMessage = "The role '$roleName' does not exist.";
            throw new \RuntimeException($errorMessage);
        }
        $request->merge([StoreUserRequest::ROLE_ID => $role->id]);

        $user = null;

        DB::transaction(function () use ($request, $storeUserAction, &$user) {
            try {
                $user = $storeUserAction->execute($request->toDto());
            } catch (QueryException $e) {
                if ($e->getCode() == 23000) {
                    $errorMessage = 'An account with this email already exists.';
                    throw new \InvalidArgumentException($errorMessage);
                }
                throw $e;
            }
        });

        return responder()
            ->success($user->refresh(), UserTransformer::class)
            ->respond(JsonResponse::HTTP_CREATED);
    }
}
