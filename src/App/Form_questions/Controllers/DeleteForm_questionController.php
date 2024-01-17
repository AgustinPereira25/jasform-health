<?php

namespace App\Form_questions\Controllers;

use Domain\Form_questions\Models\Form_question;
use Illuminate\Http\JsonResponse;

class DeleteForm_questionController
{
    public function __invoke(Form_question $form_question): JsonResponse
    {
        $form_question->delete();

        return responder()
            ->success()
            ->respond();
    }
}
