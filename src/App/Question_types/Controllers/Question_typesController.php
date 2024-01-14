<?php

namespace App\Question_types\Controllers;

use Illuminate\Http\Request;
use Domain\Question_types\Models\Question_type;
use Support\Controllers\Controller;
use App\Question_types\Transformers\Question_typeTransformer;
use Illuminate\Http\JsonResponse;
use Spatie\QueryBuilder\QueryBuilder;

class Question_typesController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $question_types = QueryBuilder::for(Question_type::class)
            ->get();

        return responder()
            ->success($question_types, Question_typeTransformer::class)
            ->respond();
    }
}
