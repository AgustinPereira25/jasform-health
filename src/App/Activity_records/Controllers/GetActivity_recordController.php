<?php

namespace App\Activity_records\Controllers;

use App\Activity_records\Transformers\Activity_recordTransformer;
use Domain\Activity_records\Models\Activity_record;
use Illuminate\Http\JsonResponse;

class GetActivity_recordController
{
    public function __invoke(Activity_record $activity_record): JsonResponse
    {
        return responder()
            ->success($activity_record, Activity_recordTransformer::class)
            ->respond();
    }
}
