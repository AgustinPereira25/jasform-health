<?php

namespace App\Form_instances\Controllers;

use App\Form_instances\Transformers\Form_instanceTransformer;
use Domain\Form_instances\Models\Form_instance;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Pagination\Paginator;

use Illuminate\Support\Facades\Log;

class ListForm_instance_byFormIdController
{
    public function __invoke(Request $request, $formId): JsonResponse
    {
        $perPage = $request->get('perPage', 10);
        $currentPage = $request->get('currentPage', 1);

        Paginator::currentPageResolver(function () use ($currentPage) {
            return $currentPage;
        });

        $form_instances = QueryBuilder::for(Form_instance::class)
            ->where('form_id', $formId)
            ->withCount('completed_questions');

        $sort = $request->get('sort', '-finalDateTime');

        switch ($sort) {
            case 'userName':
                $form_instances->join('completer_users', 'form_instances.completer_user_id', '=', 'completer_users.id')
                    ->orderBy('completer_users.first_name');
                break;
            case '-userName':
                $form_instances->join('completer_users', 'form_instances.completer_user_id', '=', 'completer_users.id')
                    ->orderByDesc('completer_users.first_name');
                break;
            case 'email':
                $form_instances->join('completer_users', 'form_instances.completer_user_id', '=', 'completer_users.id')
                    ->orderBy('completer_users.email');
                break;
            case '-email':
                $form_instances->join('completer_users', 'form_instances.completer_user_id', '=', 'completer_users.id')
                    ->orderByDesc('completer_users.email');
                break;
            case 'auxUserCode':
                $form_instances->join('completer_users', 'form_instances.completer_user_id', '=', 'completer_users.id')
                    ->orderBy('code');
                break;
            case '-auxUserCode':
                $form_instances->join('completer_users', 'form_instances.completer_user_id', '=', 'completer_users.id')
                    ->orderByDesc('code');
                break;
            case 'submittedDate':
                $form_instances->orderBy('final_date_time');
                break;
            case '-submittedDate':
                $form_instances->orderByDesc('final_date_time');
                break;
            case 'answeredQuestions':
                $form_instances->orderBy('completed_questions_count');
                break;
            case '-answeredQuestions':
                $form_instances->orderByDesc('completed_questions_count');
                break;
            default:
                $form_instances->orderBy('final_date_time', 'desc');
                break;
        }


        $form_instances = $form_instances->paginate($perPage);

        return responder()
            ->success($form_instances, Form_instanceTransformer::class)
            ->respond();
    }
}
