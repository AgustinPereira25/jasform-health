<?php

namespace App\Question_types\Controllers;

use Domain\Question_types\Models\Question_type;
use Illuminate\Http\JsonResponse;

class DeleteQuestion_typeController
{
    public function __invoke(Question_type $question_type): JsonResponse
    {
        $question_type->delete();

        return responder()
            ->success()
            ->respond();
    }
}
