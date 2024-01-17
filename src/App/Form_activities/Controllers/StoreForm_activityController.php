<?php

namespace App\Form_activities\Controllers;

use App\Form_activities\Request\StoreForm_activityRequest;
use App\Form_activities\Transformers\Form_activityTransformer;
use Domain\Form_activities\Actions\StoreForm_activityAction;
use Illuminate\Http\JsonResponse;

class StoreForm_activityController
{
    public function __invoke(StoreForm_activityRequest $request, StoreForm_activityAction $storeForm_activityAction): JsonResponse
    {
        $form_activity = $storeForm_activityAction->execute($request->toDto());

        return responder()
            ->success($form_activity, Form_activityTransformer::class)
            ->respond(JsonResponse::HTTP_CREATED);
    }
}

