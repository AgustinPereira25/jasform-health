<?php

namespace App\Forms\Controllers;

use App\Forms\Request\UpdateFormRequest;
use App\Forms\Transformers\FormTransformer;
use Domain\Forms\Actions\UpdateFormAction;
use Domain\Forms\Models\Form;
use Illuminate\Http\JsonResponse;

use Illuminate\Support\Facades\Log;

class UpdateFormController
{
    public function __invoke(UpdateFormRequest $request, UpdateFormAction $updateFormAction): JsonResponse
    {
        Log::info(
            'UpdateFormController###########'
        );
        $loggedUser = $request->user();
        if (!$loggedUser) {
            return responder()->error('Unauthenticated')->respond(500);
        }
        $loggedRoleName = $loggedUser->role->name;
        if ($loggedRoleName !== 'Admin') {
            $userId = $request->user_id;
            if ($loggedUser->id != $userId) {
                return responder()->error('You do not have permission for this request')->respond(500);
            }
        }

        sleep(1);
        $formIdToUpdate = (string) $request->id;
        $user_id = $request->input('user_id');
        $public_code = $request->input('public_code');

        $form = Form::find($formIdToUpdate);
        Log::info('UpdateFormController-form-id: ' . $form->id);
        Log::info('UpdateFormController-form-user_id: ' . $form->user_id);
        Log::info('UpdateFormController-form-public_code: ' . $form->public_code);


        if ($loggedRoleName == 'Admin') {
            if (
                !$form
                || (string) $form->public_code !== (string) $public_code
            ) {
                return response()->json(
                    ['error' => 'Provided formId or public_code does not match with the records'],
                    400
                );
            }
        } else {
            if (
                !$form
                || (string) $form->user_id !== (string) $user_id
                || (string) $form->public_code !== (string) $public_code
            ) {
                return response()->json(
                    ['error' => 'Provided formId, user_id or public_code does not match with the records'],
                    400
                );
            }
        }

        $updatedForm = $updateFormAction->execute($request->toDtoUpdate(), $form);

        return responder()
            ->success($updatedForm->refresh(), FormTransformer::class)
            ->respond(JsonResponse::HTTP_OK);
    }
}
