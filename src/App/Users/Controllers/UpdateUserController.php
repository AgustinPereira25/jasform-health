<?php

declare(strict_types=1);

namespace App\Users\Controllers;

use App\Users\Request\UpdateUserRequest;
use App\Users\Transformers\UserTransformer;
use Domain\Users\Actions\UpdateUserAction;
use Illuminate\Http\JsonResponse;
use Domain\Users\Models\User;
use Domain\Organizations\Models\Organization;
use Domain\Roles\Models\Role;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Log;

class UpdateUserController
{
    public function __invoke(UpdateUserRequest $request, UpdateUserAction $updateUserAction): JsonResponse
    {
        Log::info('**********========> Updating User: ' . $request->id);
        Log::info('**********========> Updating User', ['id' => $request->id]);
        Log::info('**********========> Updating request: ' . $request);

        $idString = (string)$request->id;

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
            Log::error($errorMessage);
            throw new \RuntimeException($errorMessage);
        }
        $request->merge([UpdateUserRequest::ROLE_ID => $role->id]);


        $user = User::find($idString);

        if ($user->email !== $request->email) {
            return response()->json(['error' => 'Id does not match with the email'], 400);
        }

        $updatedUser = $updateUserAction->execute($request->toDtoUpdate(), $user);

        return responder()
            ->success($updatedUser->refresh(), UserTransformer::class)
            //TODO: mejorar esto para reconocer en el front que fue correcto
            // ->withMeta(['message' => 'User was updated successfully.'])
            ->respond(JsonResponse::HTTP_OK);
    }
}
