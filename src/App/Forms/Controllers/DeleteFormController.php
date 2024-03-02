<?php

namespace App\Forms\Controllers;

use Domain\Forms\Models\Form;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DeleteFormController
{
    public function __invoke(Request $request, Form $form): JsonResponse
    {
        $user = $request->user();
        if (!$user) {
            return responder()->error('Unauthenticated')->respond(500);
        }
        $roleName = $user->role->name;
        if ($roleName !== 'Admin') {
            $userId = $form->user_id;
            if ($user->id != $userId) {
                return responder()->error('You do not have permission for this request')->respond(500);
            }
        }

        $form->delete();

        return responder()
            ->success()
            ->respond();
    }
}
