<?php

namespace App\Forms\Controllers;

use Illuminate\Http\Request;
use Domain\Forms\Models\Form;
use Support\Controllers\Controller;
use App\Forms\Transformers\FormTransformer;
use Illuminate\Http\JsonResponse;
use Spatie\QueryBuilder\QueryBuilder;


class FormsController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $forms = QueryBuilder::for(Form::class)
            ->get();

        return responder()
            ->success($forms, FormTransformer::class)
            ->respond();
    }
}
