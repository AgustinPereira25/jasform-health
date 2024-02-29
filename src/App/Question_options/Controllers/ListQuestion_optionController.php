<?php

namespace App\Question_options\Controllers;

use App\Question_options\Transformers\Question_optionTransformer;
use Domain\Question_options\Models\Question_option;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class ListQuestion_optionController
{
    public function __invoke(Request $request): JsonResponse
    {
        $question_options = QueryBuilder::for(Question_option::class)
            ->get();

        return responder()
            ->success($question_options, Question_optionTransformer::class)
            ->respond();
    }
}
