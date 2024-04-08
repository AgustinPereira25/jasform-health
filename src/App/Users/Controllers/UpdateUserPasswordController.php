<?php

declare(strict_types=1);

namespace App\Users\Controllers;

use App\Users\Request\UpdateUserPasswordRequest;
use App\Users\Transformers\UserListTransformer;
use Domain\Users\Actions\UpdatePasswordUserAction;
use Domain\Users\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class UpdateUserPasswordController
{
    public function __invoke(UpdateUserPasswordRequest $request, UpdatePasswordUserAction $updatePasswordUserAction): JsonResponse
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
        $user = User::find($idString);
        $isUserEmailAdmin = $user->email === 'admin@jasform.com';

        if ($user->email !== $request->email) {
            return response()->json(['error' => 'Id does not match with the email'], 400);
        }

        if ($isUserEmailAdmin) {
            if ($loggedUser->email !== $request->email) {
                return response()->json(['error' => 'Cannot change password for this user', 'code' => 'PasswordError'], 400);
            }
        }

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['error' => 'Current password is incorrect'], 400);
        }

        $updatedUserPassword = $updatePasswordUserAction->execute($request->toDtoUpdatePassword(), $user);

        return responder()
            ->success($updatedUserPassword->refresh(), UserListTransformer::class)
            ->respond(JsonResponse::HTTP_OK);
    }
}
