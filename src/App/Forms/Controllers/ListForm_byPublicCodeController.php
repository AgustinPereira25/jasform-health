<?php

namespace App\Forms\Controllers;

use Illuminate\Http\Request;
use Domain\Forms\Models\Form;
use App\Forms\Transformers\FormTransformer;
use Illuminate\Http\JsonResponse;
use Spatie\QueryBuilder\QueryBuilder;

class ListForm_byPublicCodeController
{
    public function __invoke(Request $request, $publicCode): JsonResponse
    {
        $forms = QueryBuilder::for(Form::class)
            ->where('public_code', $publicCode)
            ->withCount('form_instances')
            ->withCount('form_questions')
            ->with(['form_questions', 'form_questions.question_options'])
            ->get();

        return responder()
            ->success($forms, FormTransformer::class)
            ->respond();
    }
}
