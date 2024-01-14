<?php

namespace App\Form_questions\Controllers;

use Illuminate\Http\Request;
use Domain\Form_questions\Models\Form_question;
use Support\Controllers\Controller;
use App\Form_questions\Transformers\Form_questionTransformer;
use Illuminate\Http\JsonResponse;
use Spatie\QueryBuilder\QueryBuilder;

class Form_questionsController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $form_questions = QueryBuilder::for(Form_question::class)
            ->get();

        return responder()
            ->success($form_questions, Form_questionTransformer::class)
            ->respond();
    }
}
