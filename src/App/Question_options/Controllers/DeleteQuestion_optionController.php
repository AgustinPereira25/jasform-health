<?php

namespace App\Question_options\Controllers;

use Domain\Question_options\Models\Question_option;
use Illuminate\Http\JsonResponse;

class DeleteQuestion_optionController
{
    public function __invoke(Question_option $question_option): JsonResponse
    {
        $question_option->delete();

        return responder()
            ->success()
            ->respond();
    }
}
