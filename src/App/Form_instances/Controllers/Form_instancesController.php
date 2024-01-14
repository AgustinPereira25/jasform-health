<?php

namespace App\Form_instances\Controllers;

use Illuminate\Http\Request;
use Domain\Form_instances\Models\Form_instance;
use Support\Controllers\Controller;
use App\Form_instances\Transformers\Form_instanceTransformer;
use Illuminate\Http\JsonResponse;
use Spatie\QueryBuilder\QueryBuilder;

class Form_instancesController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $form_instances = QueryBuilder::for(Form_instance::class)
            ->get();

        return responder()
            ->success($form_instances, Form_instanceTransformer::class)
            ->respond();
    }
}
