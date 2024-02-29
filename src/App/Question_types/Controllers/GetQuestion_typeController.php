<?php

namespace App\Question_types\Controllers;

use App\Question_types\Transformers\Question_typeTransformer;
use Domain\Question_types\Models\Question_type;
use Illuminate\Http\JsonResponse;

class GetQuestion_typeController
{
    public function __invoke(Question_type $question_type): JsonResponse
    {
        return responder()
            ->success($question_type, Question_typeTransformer::class)
            ->respond();
    }
}
