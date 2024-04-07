<?php

namespace App\Form_instances\Controllers;

use Domain\Form_instances\Models\Form_instance;
use Illuminate\Http\JsonResponse;

class DeleteAllForm_instances_byFormIdController
{
    public function __invoke($formId): JsonResponse
    {
        Form_instance::where('form_id', $formId)->delete();

        return responder()
            ->success()
            ->respond();
    }
}
