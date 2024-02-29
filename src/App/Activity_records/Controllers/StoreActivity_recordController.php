<?php

namespace App\Activity_records\Controllers;

use App\Activity_records\Request\StoreActivity_recordRequest;
use App\Activity_records\Transformers\Activity_recordTransformer;
use Domain\Activity_records\Actions\StoreActivity_recordAction;
use Illuminate\Http\JsonResponse;

class StoreActivity_recordController
{
    public function __invoke(
        StoreActivity_recordRequest $request,
        StoreActivity_recordAction $storeActivity_recordAction,
    ): JsonResponse {
        $activity_record = $storeActivity_recordAction->execute($request->toDto());

        return responder()
            ->success($activity_record, Activity_recordTransformer::class)
            ->respond(JsonResponse::HTTP_CREATED);
    }
}
