<?php

namespace App\Forms\Controllers;

use Domain\Forms\Models\Form;
use App\Forms\Transformers\FormTransformer;
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
