<?php

namespace App\Completed_questions\Controllers;

use App\Completed_questions\Request\StoreCompleted_questionRequest;
use App\Completed_questions\Transformers\Completed_questionTransformer;
use Domain\Completed_questions\Actions\StoreCompleted_questionAction;
use Illuminate\Http\JsonResponse;

class StoreCompleted_questionController
{
    public function __invoke(
        StoreCompleted_questionRequest $request,
        StoreCompleted_questionAction $storeCompleted_questionAction,
    ): JsonResponse {
        $completed_question = $storeCompleted_questionAction->execute($request->toDto());

        return responder()
            ->success($completed_question, Completed_questionTransformer::class)
            ->respond(JsonResponse::HTTP_CREATED);
    }
}
