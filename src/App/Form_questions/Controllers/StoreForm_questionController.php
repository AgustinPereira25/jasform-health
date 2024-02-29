<?php

namespace App\Form_questions\Controllers;

use App\Form_questions\Request\StoreForm_questionRequest;
use App\Form_questions\Transformers\Form_questionTransformer;
use Domain\Form_questions\Actions\StoreForm_questionAction;
use Illuminate\Http\JsonResponse;

class StoreForm_questionController
{
    public function __invoke(
        StoreForm_questionRequest $request,
        StoreForm_questionAction $storeForm_questionAction,
    ): JsonResponse {
        $form_question = $storeForm_questionAction->execute($request->toDto());

        return responder()
            ->success($form_question, Form_questionTransformer::class)
            ->respond(JsonResponse::HTTP_CREATED);
    }
}
