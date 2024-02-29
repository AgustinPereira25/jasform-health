<?php

namespace App\Question_types\Controllers;

use App\Question_types\Transformers\Question_typeTransformer;
use Domain\Question_types\Models\Question_type;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class ListQuestion_typeController
{
    public function __invoke(Request $request): JsonResponse
    {
        $question_types = QueryBuilder::for(Question_type::class)
            ->get();

        return responder()
            ->success($question_types, Question_typeTransformer::class)
            ->respond();
    }
}
