<?php

namespace App\Forms\Controllers;

use Domain\Forms\Models\Form;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DeleteFormController
{
    public function __invoke(Request $request, Form $form): JsonResponse
    {
        $loggedUser = $request->user();
        if (!$loggedUser) {
            return responder()->error('Unauthenticated')->respond(500);
        }
        $loggedRoleName = $loggedUser->role->name;
        if ($loggedRoleName !== 'Admin') {
            $userId = $form->user_id;
            if ($loggedUser->id != $userId) {
                return responder()->error('You do not have permission for this request')->respond(500);
            }
        }

        $form->delete();

        return responder()
            ->success()
            ->respond();
    }
}
