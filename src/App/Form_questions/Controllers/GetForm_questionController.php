<?php

namespace App\Form_questions\Controllers;

use Domain\Form_questions\Models\Form_question;
use App\Form_questions\Transformers\Form_questionTransformer;
use Illuminate\Http\JsonResponse;

class GetForm_questionController
{
    public function __invoke(Form_question $form_question): JsonResponse
    {
        return responder()
            ->success($form_question, Form_questionTransformer::class)
            ->respond();
    }
}
