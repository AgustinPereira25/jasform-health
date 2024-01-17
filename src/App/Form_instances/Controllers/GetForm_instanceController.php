<?php

namespace App\Form_instances\Controllers;

use Domain\Form_instances\Models\Form_instance;
use App\Form_instances\Transformers\Form_instanceTransformer;
use Illuminate\Http\JsonResponse;

class GetForm_instanceController
{
    public function __invoke(Form_instance $form_instance): JsonResponse
    {
        return responder()
            ->success($form_instance, Form_instanceTransformer::class)
            ->respond();
    }
}
