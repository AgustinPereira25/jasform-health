<?php

declare(strict_types=1);

namespace App\Users\Controllers;

use Domain\Completer_users\Models\Completer_user;
use Domain\Form_instances\Models\Form_instance;
use Domain\Form_questions\Models\Form_question;
use Domain\Forms\Models\Form;
use Domain\Users\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GetUserDashboardController
{
    public function __invoke(Request $request, User $user): JsonResponse
    {
        $loggedUser = $request->user();
        if (!$loggedUser) {
            return responder()->error('Unauthenticated')->respond(500);
        }
        $loggedRoleName = $loggedUser->role->name;
        if ($loggedRoleName !== 'Admin') {
            if ($loggedUser->id != $user->id) {
                return responder()->error('You do not have permission for this request')->respond(500);
            }
        }

        sleep(1);
        $totalForms = Form::where('user_id', $user->id)->count();

        $totalFormInstances = Form_instance::whereIn('form_id', function ($query) use ($user) {
            $query->select('id')->from('forms')->where('user_id', $user->id);
        })->count();

        $totalFormQuestions = Form_question::whereIn('form_id', function ($query) use ($user) {
            $query->select('id')->from('forms')->where('user_id', $user->id);
        })->count();

        $totalCompleterUsers = Completer_user::whereIn('id', function ($query) use ($user) {
            $query->select('completer_user_id')->from(
                'form_instances'
            )->whereIn(
                'form_id',
                function ($subQuery) use ($user) {
                    $subQuery->select('id')->from('forms')->where('user_id', $user->id);
                }
            );
        })->count();

        $data = [
            'total_forms' => $totalForms,
            'total_form_instances' => $totalFormInstances,
            'total_form_questions' => $totalFormQuestions,
            'total_completer_users' => $totalCompleterUsers,
        ];

        return responder()
            ->success($data)
            ->respond();
    }
}
