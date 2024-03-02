<?php

namespace App\Forms\Controllers;

use App\Forms\Transformers\FormTransformer;
use Domain\Forms\Models\Form;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class ListForm_byUserIdController
{
    public function __invoke(Request $request, $userId): JsonResponse
    {
        $user = $request->user();
        if (!$user) {
            return responder()->error('Unauthenticated')->respond(500);
        }
        $roleName = $user->role->name;
        if ($roleName !== 'Admin') {
            if ($user->id != $userId) {
                return responder()->error('You do not have permission for this request')->respond(500);
            }
        }

        $forms = QueryBuilder::for(Form::class)
            ->where('user_id', $userId)
            ->withCount('form_instances')
            ->withCount('form_questions')
            ->get();

        return responder()
            ->success($forms, FormTransformer::class)
            ->respond();
    }
}
