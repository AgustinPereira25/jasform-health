<?php

namespace App\Forms\Controllers;

use Domain\Forms\Models\Form;
use App\Forms\Transformers\FormTransformer;
use Illuminate\Http\JsonResponse;

class GetFormController
{
    public function __invoke(Form $form): JsonResponse
    {
        return responder()
            ->success($form, FormTransformer::class)
            ->respond();
    }
}
