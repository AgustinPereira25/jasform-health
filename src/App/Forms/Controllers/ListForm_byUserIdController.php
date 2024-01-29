<?php

namespace App\Forms\Controllers;

use Illuminate\Http\Request;
use Domain\Forms\Models\Form;
use App\Forms\Transformers\FormTransformer;
use Illuminate\Http\JsonResponse;
use Spatie\QueryBuilder\QueryBuilder;

class ListForm_byUserIdController
{
    public function __invoke(Request $request, $userId): JsonResponse
    {
        $forms = QueryBuilder::for(Form::class)
            ->where('user_id', $userId)
            ->withCount('form_instances')
            ->withCount('form_questions')
            ->get();

        return responder()
            ->success($forms, FormTransformer::class)
            ->respond();
    }
}
