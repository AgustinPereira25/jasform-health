<?php

namespace App\Form_activities\Controllers;

use Domain\Form_activities\Models\Form_activity;
use Illuminate\Http\JsonResponse;

class DeleteForm_activityController
{
    public function __invoke(Form_activity $form_activity): JsonResponse
    {
        $form_activity->delete();

        return responder()
            ->success()
            ->respond();
    }
}
