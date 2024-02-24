<?php

namespace App\Form_instances\Controllers;

use App\Form_instances\Request\StoreForm_instanceRequest;
use App\Form_instances\Transformers\Form_instanceTransformer;
use Domain\Form_instances\Actions\StoreForm_instanceAction;
use Domain\Forms\Models\Form;
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
        StoreCompleted_questionAction $storeCompleted_questionAction,
        Form $formModel
    ): JsonResponse {
        Log::info('####################################################################################################################################################################');

        Log::info('===StoreForm_instanceController=====> Request data: ', $request->all());
        Log::info('completer_user_email: ' . $request->input('completer_user_email'));
        Log::info('completer_user_first_name: ' . $request->input('completer_user_first_name'));
        Log::info('completer_user_last_name: ' . $request->input('completer_user_last_name'));
        Log::info('aux_code: ' . $request->input('aux_code'));
        Log::info('form_id: ' . $request->input('form_id'));


        $initial_date_time = new \DateTime($request->input('initial_date_time'));
        $formattedInitial_date_time = $initial_date_time->format('Y-m-d H:i:s');
        $final_date_time = new \DateTime($request->input('final_date_time'));
        $formattedFinal_date_time = $final_date_time->format('Y-m-d H:i:s');
        Log::info('formattedInitial_date_time: ' . $formattedInitial_date_time);
        Log::info('formattedFinal_date_time: ' . $formattedFinal_date_time);
        // Log::info('initial_date_time: ' . $request->input('initial_date_time'));
        // Log::info('final_date_time: ' . $request->input('final_date_time'));


        $completedQuestions = $request->input('completed_questions');
        foreach ($completedQuestions as $index => $question) {
            Log::info('-----------------');
            Log::info('-----------------completed_questions[' . $index . '][title]: ' . $question['title']);
            Log::info('-----------------completed_questions[' . $index . '][completer_user_answer]: ' . $question['completer_user_answer']);
            // Log::info('-----------------completed_questions[' . $index . '][completer_user_answer_checked_options]: ' . json_encode($question['completer_user_answer_checked_options']));
            Log::info('-----------------completed_questions[' . $index . '][question_type_id]: ' . $question['question_type_id']);
        }

        if ($request->filled('completer_user_email') && $request->filled('completer_user_first_name') && $request->filled('completer_user_last_name')) {
            $completerUserDto = new Completer_userDto(
                email: $request->input('completer_user_email'),
                first_name: $request->input('completer_user_first_name'),
                last_name: $request->input('completer_user_last_name'),
                code: $request->input('aux_code', null)
            );

            try {
                $completerUser = $storeCompleter_userAction->execute($completerUserDto);
                $completerUserId = $completerUser->id;
            } catch (\Exception $e) {
                return responder()->error()->respond(JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
            }
        } else {
            $completerUserId = null;
        }

        $formId = intval($request->input('form_id'));
        try {
            $formModel->findOrFail($formId);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return responder()
                ->error()
                ->data([
                    'code' => 'FORM_NOT_FOUND',
                    'message' => 'The form with the id ' . $formId . ' could not be found'
                ])
                ->respond(JsonResponse::HTTP_BAD_REQUEST);
        }

        $formInstanceDto = new Form_instanceDto(
            initial_date_time: $formattedInitial_date_time,
            final_date_time: $formattedFinal_date_time,
            form_id: $formId,
            completer_user_id: $completerUserId,
        );
        Log::info('1*************');

        try {
            Log::info('2*************');
            $formInstance = $storeForm_instanceAction->execute($formInstanceDto);
            Log::info('3*************');
        } catch (\Exception $e) {
            Log::info('4*************');
            Log::error($e->getMessage());
            return responder()->error()->respond(JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
        Log::info('5*************');


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
            return responder()->error()->respond(JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }

        return responder()
            ->success($formInstance, Form_instanceTransformer::class)
            ->respond(JsonResponse::HTTP_CREATED);
    }
}
