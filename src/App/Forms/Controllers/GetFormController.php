<?php

namespace App\Forms\Controllers;

use App\Forms\Transformers\FormTransformer;
use Domain\Forms\Models\Form;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GetFormController
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

        $form->loadCount('form_instances');
        $form->loadCount('form_questions');

        return responder()
            ->success($form, FormTransformer::class)
            ->respond();
    }
}
