<?php

namespace App\Activity_records\Controllers;

use Domain\Activity_records\Models\Activity_record;
use Illuminate\Http\JsonResponse;

class DeleteActivity_recordController
{
    public function __invoke(Activity_record $activity_record): JsonResponse
    {
        $activity_record->delete();

        return responder()
            ->success()
            ->respond();
    }
}
