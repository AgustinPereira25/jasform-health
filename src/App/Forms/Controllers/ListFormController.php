<?php

namespace App\Forms\Controllers;

use App\Forms\Transformers\FormTransformer;
use Domain\Forms\Models\Form;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Spatie\QueryBuilder\QueryBuilder;

use Illuminate\Support\Facades\Log;

class ListFormController
{
    public function __invoke(Request $request): JsonResponse
    {
        Log::info('ListFormController#####################');
        Log::info('===ListFormController=====> Request data: ', $request->all());

        $loggedUser = $request->user();
        Log::info('loggedUser: ' . $loggedUser);
        if (!$loggedUser) {
            return responder()->error('Unauthenticated')->respond(500);
        }
        $loggedRoleName = $loggedUser->role->name;
        if ($loggedRoleName !== 'Admin') {
            $userId = $request->get('userId', "");
            if ($loggedUser->id != $userId) {
                return responder()->error('You do not have permission for this request')->respond(500);
            }
        }

        $perPage = $request->get('perPage', 10);
        $currentPage = $request->get('currentPage', 1);
        $isActive = $request->get('isActive', 'false');
        $name = $request->get('form_title', "");
        $date = $request->get('date', "");
        $userId = $request->get('userId', "");
        $publicCode = $request->get('publicCode', "");

        Paginator::currentPageResolver(function () use ($currentPage) {
            return $currentPage;
        });

        $forms = QueryBuilder::for(Form::class)
            ->withCount('form_instances')
            ->withCount('form_questions')
            ->orderBy('last_modified_date_time', 'desc');

        if ($isActive == 1) {
            $forms->where('is_active', true);
        }
        // if ($isActive == 0) {
        //     $forms->where('is_active', false);
        // };

        if (!empty($userId)) {
            $forms->where('user_id', $userId);
        }


        $forms->where(function ($query) use ($name, $publicCode) {
            if (!empty($name)) {
                $query->where(function ($query) use ($name) {
                    $query->where('name', 'like', '%' . $name . '%');
                });
            }
            if (!empty($publicCode)) {
                $query->where(function ($query) use ($publicCode) {
                    $query->where('public_code', 'like', '%' . $publicCode . '%');
                });
            }
            // if (!empty($date)) {
            //     $query->where(function ($query) use ($date) {
            //         $query->where('last_modified_date_time', 'like', '%' . $date . '%');
            //     });
            // }
            // if (!empty($userId)) {
            //     $query->where(function ($query) use ($userId) {
            //         $query->where('user_id', $userId);
            //     });
            // }
        });

        $forms = $forms->paginate($perPage);

        return responder()
            ->success($forms, FormTransformer::class)
            ->respond();
    }
}
