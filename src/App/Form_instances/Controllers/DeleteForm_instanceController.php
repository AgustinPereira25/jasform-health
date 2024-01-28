<?php

namespace App\Form_instances\Controllers;

use Domain\Form_instances\Models\Form_instance;
use Illuminate\Http\JsonResponse;

class DeleteForm_instanceController
{
    public function __invoke(Form_instance $form_instance): JsonResponse
    {
        $form_instance->delete();

        return responder()
            ->success()
            ->respond();
    }
}
