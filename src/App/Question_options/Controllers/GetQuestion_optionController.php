<?php

namespace App\Question_options\Controllers;

use Domain\Question_options\Models\Question_option;
use App\Question_options\Transformers\Question_optionTransformer;
use Illuminate\Http\JsonResponse;

class GetQuestion_optionController
{
    public function __invoke(Question_option $question_option): JsonResponse
    {
        return responder()
            ->success($question_option, Question_optionTransformer::class)
            ->respond();
    }
}
