<?php

namespace App\Forms\Controllers;

use App\Forms\Request\StoreFormRequest;
use App\Forms\Transformers\FormTransformer;
use Domain\Forms\Actions\StoreFormAction;
use Illuminate\Http\JsonResponse;

class StoreFormController
{
    public function __invoke(StoreFormRequest $request, StoreFormAction $storeFormAction): JsonResponse
    {
        $form = $storeFormAction->execute($request->toDto());

        return responder()
            ->success($form, FormTransformer::class)
            ->respond(JsonResponse::HTTP_CREATED);
    }
}

