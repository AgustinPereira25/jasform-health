<?php

namespace App\Completed_questions\Controllers;

use App\Completed_questions\Transformers\Completed_questionTransformer;
use Domain\Completed_questions\Models\Completed_question;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class ListCompleted_questionController
{
    public function __invoke(Request $request): JsonResponse
    {
        $completed_questions = QueryBuilder::for(Completed_question::query())->get();

        return responder()
            ->success($completed_questions, Completed_questionTransformer::class)
            ->respond();
    }
}
