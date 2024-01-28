<?php

namespace App\Activity_records\Controllers;

use Illuminate\Http\Request;
use Domain\Activity_records\Models\Activity_record;
use App\Activity_records\Transformers\Activity_recordTransformer;
use Illuminate\Http\JsonResponse;
use Spatie\QueryBuilder\QueryBuilder;

class ListActivity_recordController
{
    public function __invoke(Request $request): JsonResponse
    {
        $activity_records = QueryBuilder::for(Activity_record::class)
            ->get();

        return responder()
            ->success($activity_records, Activity_recordTransformer::class)
            ->respond();
    }
}
