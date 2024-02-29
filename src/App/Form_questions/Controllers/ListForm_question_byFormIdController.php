<?php

namespace App\Form_questions\Controllers;

use App\Form_questions\Transformers\Form_questionTransformer;
use Domain\Form_questions\Models\Form_question;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class ListForm_question_byFormIdController
{
    public function __invoke(Request $request, $formId): JsonResponse
    {
        $form_questions = QueryBuilder::for(Form_question::class)
            ->with(['question_type'])
            ->where('form_id', $formId)
            ->get();

        return responder()
            ->success($form_questions, Form_questionTransformer::class)
            ->respond();
    }
}
