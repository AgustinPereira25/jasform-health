<?php

namespace App\Forms\Controllers;

use App\Forms\Request\UpdateFormRequest;
use App\Forms\Transformers\FormTransformer;
use Domain\Forms\Actions\UpdateFormAction;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;
use Domain\Forms\Models\Form;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

class UpdateFormController
{
    public function __invoke(UpdateFormRequest $request, UpdateFormAction $updateFormAction): JsonResponse
    {
        sleep(1);
        $formIdToUpdate = (string)$request->id;

        $user_id = $request->input('user_id');
        $public_code = $request->input('public_code');

        $form = Form::find($formIdToUpdate);
        if (!$form || (string)$form->user_id !== (string)$user_id || (string)$form->public_code !== (string)$public_code) {
            return response()->json(['error' => 'Provided formId, user_id or public_code does not match with the records'], 400);
        }

        $updatedForm = $updateFormAction->execute($request->toDtoUpdate(), $form);

        return responder()
            ->success($updatedForm->refresh(), FormTransformer::class)
            ->respond(JsonResponse::HTTP_OK);
    }
}
