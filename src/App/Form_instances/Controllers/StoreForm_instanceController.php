<?php

namespace App\Form_instances\Controllers;

use App\Form_instances\Request\StoreForm_instanceRequest;
use App\Form_instances\Transformers\Form_instanceTransformer;
use Domain\Form_instances\Actions\StoreForm_instanceAction;
use Domain\Completer_users\Actions\StoreCompleter_userAction;
use Domain\Completed_questions\Actions\StoreCompleted_questionAction;
use Domain\Completer_users\DataTransferObjects\Completer_userDto;
use Domain\Form_instances\DataTransferObjects\Form_instanceDto;
use Domain\Completed_questions\DataTransferObjects\Completed_questionDto;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class StoreForm_instanceController
{
    public function __invoke(
        StoreForm_instanceRequest $request,
        StoreForm_instanceAction $storeForm_instanceAction,
        StoreCompleter_userAction $storeCompleter_userAction,
        StoreCompleted_questionAction $storeCompleted_questionAction
    ): JsonResponse {
        Log::info('Invoked StoreForm_instanceController');
        Log::info('*********StoreForm_instanceRequest::', $request->all());

        if ($request->filled('completer_user_email') && $request->filled('completer_user_name') && $request->filled('completer_user_last_name')) {
            $completerUserDto = new Completer_userDto(
                email: $request->input('completer_user_email'),
                first_name: $request->input('completer_user_name'),
                last_name: $request->input('completer_user_last_name'),
                code: $request->input('aux_code', null)
            );

            try {
                $completerUser = $storeCompleter_userAction->execute($completerUserDto);
                $completerUserId = $completerUser->id;
            } catch (\Exception $e) {
                Log::error('Error creating Completer User:', [$e->getMessage()]);
                return responder()->error()->respond(JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
            }
        } else {
            $completerUserId = null;
        }

        $formInstanceDto = new Form_instanceDto(
            initial_date_time: $request->input('initial_date_time'),
            final_date_time: $request->input('final_date_time'),
            form_id: intval($request->input('form_id')),
            completer_user_id: $completerUserId,
        );

        try {
            $formInstance = $storeForm_instanceAction->execute($formInstanceDto);
        } catch (\Exception $e) {
            Log::error('Error creating Form Instance:', [$e->getMessage()]);
            return responder()->error()->respond(JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }

        try {
            $completedQuestions = $request->input('completed_questions');
            foreach ($completedQuestions as $question) {
                if (isset($question['completer_user_answer_checked_options'])) {
                    $answer = json_encode($question['completer_user_answer_checked_options']);
                } else {
                    $answer = $question['completer_user_answer'];
                }
                $completedQuestionDto = new Completed_questionDto(
                    title: $question['title'],
                    answer: $answer,
                    form_instance_id: $formInstance->id,
                    question_type_id: $question['question_type_id'],
                );
                $storeCompleted_questionAction->execute($completedQuestionDto);
            }
        } catch (\Exception $e) {
            Log::error('Error creating Completed Questions:', [$e->getMessage()]);
            return responder()->error()->respond(JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }

        return responder()
            ->success($formInstance, Form_instanceTransformer::class)
            ->respond(JsonResponse::HTTP_CREATED);
    }
}
