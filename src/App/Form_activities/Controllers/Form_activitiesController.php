<?php

namespace App\Form_activities\Controllers;

use Illuminate\Http\Request;
use Domain\Form_activities\Models\Form_activity;
use Support\Controllers\Controller;
use App\Form_activities\Transformers\Form_activityTransformer;
use Illuminate\Http\JsonResponse;
use Spatie\QueryBuilder\QueryBuilder;

class Form_activitiesController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $form_activities = QueryBuilder::for(Form_activity::class)
            ->get();

        return responder()
            ->success($form_activities, Form_activityTransformer::class)
            ->respond();
    }
}
