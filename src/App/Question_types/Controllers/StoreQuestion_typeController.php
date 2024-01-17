<?php

namespace App\Question_types\Controllers;

use App\Question_types\Request\StoreQuestion_typeRequest;
use App\Question_types\Transformers\Question_typeTransformer;
use Domain\Question_types\Actions\StoreQuestion_typeAction;
use Illuminate\Http\JsonResponse;

class StoreQuestion_typeController
{
    public function __invoke(StoreQuestion_typeRequest $request, StoreQuestion_typeAction $storeQuestion_typeAction): JsonResponse
    {
        $question_type = $storeQuestion_typeAction->execute($request->toDto());

        return responder()
            ->success($question_type, Question_typeTransformer::class)
            ->respond(JsonResponse::HTTP_CREATED);
    }
}

