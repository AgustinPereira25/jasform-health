<?php

namespace App\Form_activities\Controllers;

use Domain\Form_activities\Models\Form_activity;
use App\Form_activities\Transformers\Form_activityTransformer;
use Illuminate\Http\JsonResponse;

class GetForm_activityController
{
    public function __invoke(Form_activity $form_activity): JsonResponse
    {
        return responder()
            ->success($form_activity, Form_activityTransformer::class)
            ->respond();
    }
}
