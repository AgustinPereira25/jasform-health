<?php

namespace App\Completed_questions\Controllers;

use Illuminate\Http\Request;
use Domain\Completed_questions\Models\Completed_question;
use App\Completed_questions\Transformers\Completed_questionTransformer;
use Illuminate\Http\JsonResponse;
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
