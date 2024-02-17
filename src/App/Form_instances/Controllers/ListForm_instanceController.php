<?php

namespace App\Form_instances\Controllers;

use Illuminate\Http\Request;
use Domain\Form_instances\Models\Form_instance;
use App\Form_instances\Transformers\Form_instanceTransformer;
use Illuminate\Http\JsonResponse;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Pagination\Paginator;

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
            ->get();

        $form_instances = $form_instances->paginate($perPage);

        return responder()
            ->success($form_instances, Form_instanceTransformer::class)
            ->respond();
    }
}
