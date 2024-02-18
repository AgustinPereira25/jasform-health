<?php

namespace App\Forms\Controllers;

use App\Forms\Request\StoreFormRequest;
use App\Forms\Transformers\FormTransformer;
use Domain\Forms\Actions\StoreFormAction;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;

class StoreFormController
{
    public function __invoke(StoreFormRequest $request, StoreFormAction $storeFormAction): JsonResponse
    {
        $publicCode = Str::random(20);
        $now = Carbon::now()->toDateTimeString();

        $formDto = $request->toDto()
            ->withPublicCode($publicCode)
            ->withCreationDateTime($now)
            ->withLastModifiedDateTime($now);
        $form = $storeFormAction->execute($formDto);

        return responder()
            ->success($form, FormTransformer::class)
            ->respond(JsonResponse::HTTP_CREATED);
    }
}
