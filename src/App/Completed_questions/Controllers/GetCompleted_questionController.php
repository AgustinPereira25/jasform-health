<?php

namespace App\Completed_questions\Controllers;

use App\Completed_questions\Transformers\Completed_questionTransformer;
use Domain\Completed_questions\Models\Completed_question;
use Illuminate\Http\JsonResponse;

class GetCompleted_questionController
{
    public function __invoke(Completed_question $completed_question): JsonResponse
    {
        return responder()
            ->success($completed_question, Completed_questionTransformer::class)
            ->respond();
    }
}
