<?php

namespace App\Completed_questions\Controllers;

use Domain\Completed_questions\Models\Completed_question;
use App\Completed_questions\Transformers\Completed_questionTransformer;
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
