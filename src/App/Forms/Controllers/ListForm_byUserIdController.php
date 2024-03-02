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
        $loggedUser = $request->user();
        if (!$loggedUser) {
            return responder()->error('Unauthenticated')->respond(500);
        }
        $loggedRoleName = $loggedUser->role->name;
        if ($loggedRoleName !== 'Admin') {
            if ($loggedUser->id != $userId) {
                return responder()->error('You do not have permission for this request')->respond(500);
            }
        }

        $forms = QueryBuilder::for(Form::class)
            ->where('user_id', $userId)
            ->withCount('form_instances')
            ->withCount('form_questions')
            ->orderBy('last_modified_date_time', 'desc')
            ->get();

        return responder()
            ->success($forms, FormTransformer::class)
            ->respond();
    }
}
