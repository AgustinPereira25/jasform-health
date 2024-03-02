<?php

declare(strict_types=1);

namespace App\Users\Controllers;

use App\Users\Request\UpdateUserRequest;
use App\Users\Transformers\UserListTransformer;
use Domain\Organizations\Models\Organization;
use Domain\Roles\Models\Role;
use Domain\Users\Actions\UpdateUserAction;
use Domain\Users\Models\User;
use Illuminate\Http\JsonResponse;

class UpdateUserController
{
    public function __invoke(UpdateUserRequest $request, UpdateUserAction $updateUserAction): JsonResponse
    {
        $loggedUser = $request->user();
        if (!$loggedUser) {
            return responder()->error('Unauthenticated')->respond(500);
        }
        $loggedRoleName = $loggedUser->role->name;
        if ($loggedRoleName !== 'Admin') {
            $userId = $request->id;
            if ($loggedUser->id != $userId) {
                return responder()->error('You do not have permission for this request')->respond(500);
            }
        }



        sleep(1);
        $idString = (string) $request->id;

        $organizationName = $request->input(UpdateUserRequest::ORGANIZATION_NAME);
        $organization = Organization::firstOrCreate(
            ['name' => $organizationName],
            ['description' => $organizationName]
        );
        $request->merge([UpdateUserRequest::ORGANIZATION_ID => $organization->id]);

        $roleName = $request->input(UpdateUserRequest::ROLE_NAME);
        $role = Role::where('name', $roleName)->first();
        if (!$role) {
            $errorMessage = "The role '$roleName' does not exist.";
            throw new \RuntimeException($errorMessage);
        }
        $request->merge([UpdateUserRequest::ROLE_ID => $role->id]);


        $user = User::find($idString);

        if ($user->email !== $request->email) {
            return response()->json(['error' => 'Id does not match with the email'], 400);
        }

        $updatedUser = $updateUserAction->execute($request->toDtoUpdate(), $user);

        return responder()
            ->success($updatedUser->refresh(), UserListTransformer::class)
            ->respond(JsonResponse::HTTP_OK);
    }
}
