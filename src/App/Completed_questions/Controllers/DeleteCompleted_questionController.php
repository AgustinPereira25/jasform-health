<?php

namespace App\Completed_questions\Controllers;

use Domain\Completed_questions\Models\Completed_question;
use Illuminate\Http\JsonResponse;

class DeleteCompleted_questionController
{
    public function __invoke(Completed_question $completed_question): JsonResponse
    {
        $completed_question->delete();

        return responder()
            ->success()
            ->respond();
    }
}
