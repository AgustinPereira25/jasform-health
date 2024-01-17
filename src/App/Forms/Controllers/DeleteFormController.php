<?php

namespace App\Forms\Controllers;

use Domain\Forms\Models\Form;
use Illuminate\Http\JsonResponse;

class DeleteFormController
{
    public function __invoke(Form $form): JsonResponse
    {
        $form->delete();

        return responder()
            ->success()
            ->respond();
    }
}
