<?php

namespace App\Forms\Controllers;

use Illuminate\Http\Request;
use Domain\Forms\Models\Form;
use App\Forms\Transformers\FormTransformer;
use Illuminate\Http\JsonResponse;
use Spatie\QueryBuilder\QueryBuilder;

class GetForm_byPublicCodeController
{
    public function __invoke(Request $request, $publicCode): JsonResponse
    {
        $form = QueryBuilder::for(Form::class)
            ->where('public_code', $publicCode)
            ->withCount('form_instances')
            ->withCount('form_questions')
            ->with(['form_questions', 'form_questions.question_options'])
            ->first();

        if (!$form) {
            return responder()->error('Form not found')->respond(404);
        }

        return responder()
            ->success($form, FormTransformer::class)
            ->respond();
    }
}
