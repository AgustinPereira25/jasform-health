<?php

namespace App\Form_instances\Controllers;

use App\Form_instances\Request\StoreForm_instanceRequest;
use App\Form_instances\Transformers\Form_instanceTransformer;
use Domain\Form_instances\Actions\StoreForm_instanceAction;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class StoreForm_instanceController
{
    public function __invoke(StoreForm_instanceRequest $request, StoreForm_instanceAction $storeForm_instanceAction): JsonResponse
    {
        Log::info('Invoked StoreForm_instanceController');

        Log::info('*********StoreForm_instanceRequest::', $request->all());

        $form_instance = $storeForm_instanceAction->execute($request->toDto());

        return responder()
            ->success($form_instance, Form_instanceTransformer::class)
            ->respond(JsonResponse::HTTP_CREATED);
    }
}
