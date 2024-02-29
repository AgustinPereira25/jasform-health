<?php

namespace App\Forms\Controllers;

use App\Forms\Transformers\FormTransformer;
use Domain\Forms\Models\Form;
use Illuminate\Http\JsonResponse;

class GetFormController
{
    public function __invoke(Form $form): JsonResponse
    {
        $form->loadCount('form_instances');
        $form->loadCount('form_questions');

        return responder()
            ->success($form, FormTransformer::class)
            ->respond();
    }
}
