<?php

namespace App\Question_options\Controllers;

use App\Question_options\Request\StoreQuestion_optionRequest;
use App\Question_options\Transformers\Question_optionTransformer;
use Domain\Question_options\Actions\StoreQuestion_optionAction;
use Illuminate\Http\JsonResponse;

class StoreQuestion_optionController
{
    public function __invoke(
        StoreQuestion_optionRequest $request,
        StoreQuestion_optionAction $storeQuestion_optionAction,
    ): JsonResponse {
        $question_option = $storeQuestion_optionAction->execute($request->toDto());

        return responder()
            ->success($question_option, Question_optionTransformer::class)
            ->respond(JsonResponse::HTTP_CREATED);
    }
}
