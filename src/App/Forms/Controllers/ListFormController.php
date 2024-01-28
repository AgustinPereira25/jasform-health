<?php

namespace App\Forms\Controllers;

use Illuminate\Http\Request;
use Domain\Forms\Models\Form;
use App\Forms\Transformers\FormTransformer;
use Illuminate\Http\JsonResponse;
use Spatie\QueryBuilder\QueryBuilder;

class ListFormController
{
    public function __invoke(Request $request): JsonResponse
    {
        $forms = QueryBuilder::for(Form::class)
            ->withCount('form_instances')
            ->withCount('form_questions')
            ->get();

        return responder()
            ->success($forms, FormTransformer::class)
            ->respond();
    }
}
