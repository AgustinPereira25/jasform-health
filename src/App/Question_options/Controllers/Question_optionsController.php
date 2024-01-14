<?php

namespace App\Question_options\Controllers;

use Illuminate\Http\Request;
use Domain\Question_options\Models\Question_option;
use Support\Controllers\Controller;
use App\Question_options\Transformers\Question_optionTransformer;
use Illuminate\Http\JsonResponse;
use Spatie\QueryBuilder\QueryBuilder;

class Question_optionsController extends Controller
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
