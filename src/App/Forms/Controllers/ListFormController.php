<?php

namespace App\Forms\Controllers;

use Illuminate\Http\Request;
use Domain\Forms\Models\Form;
use App\Forms\Transformers\FormTransformer;
use Illuminate\Http\JsonResponse;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Pagination\Paginator;


class ListFormController
{
    public function __invoke(Request $request): JsonResponse
    {
        $perPage = $request->get('perPage', 1);
        $currentPage = $request->get('currentPage', 1);
        $isActive = $request->get('isActive', "false");

        Paginator::currentPageResolver(function () use ($currentPage) {
            return $currentPage;
        });

        $forms = QueryBuilder::for(Form::class)
            ->withCount('form_instances')
            ->withCount('form_questions');

            if ($isActive == "true") {
                $forms->where('is_active', true);
            };

        $forms = $forms->paginate($perPage);

        return responder()
            ->success($forms, FormTransformer::class)
            ->respond();
    }
}
