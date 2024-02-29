<?php

namespace App\Form_instances\Controllers;

use App\Form_instances\Transformers\Form_instanceTransformer;
use Domain\Form_instances\Models\Form_instance;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Spatie\QueryBuilder\QueryBuilder;

class ListForm_instanceController
{
    public function __invoke(Request $request): JsonResponse
    {
        $perPage = $request->get('perPage', 10);
        $currentPage = $request->get('currentPage', 1);

        Paginator::currentPageResolver(function () use ($currentPage) {
            return $currentPage;
        });

        $form_instances = QueryBuilder::for(Form_instance::class)
            ->with(['completer_user', 'completed_questions'])
            ->withCount('completed_questions')
            ->paginate($perPage);

        return responder()
            ->success($form_instances, Form_instanceTransformer::class)
            ->respond();
    }
}
