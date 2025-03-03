<?php

namespace App\Form_instances\Controllers;

use App\Form_instances\Request\StoreForm_instanceRequest;
use App\Form_instances\Transformers\Form_instanceTransformer;
use Domain\Completed_questions\Actions\StoreCompleted_questionAction;
use Domain\Completed_questions\DataTransferObjects\Completed_questionDto;
use Domain\Completer_users\Actions\StoreCompleter_userAction;
use Domain\Completer_users\DataTransferObjects\Completer_userDto;
use Domain\Form_instances\Actions\StoreForm_instanceAction;
use Domain\Form_instances\DataTransferObjects\Form_instanceDto;
use Domain\Forms\Models\Form;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;

class StoreForm_instanceController
{
    public function __invoke(
        StoreForm_instanceRequest $request,
        StoreForm_instanceAction $storeForm_instanceAction,
        StoreCompleter_userAction $storeCompleter_userAction,
        StoreCompleted_questionAction $storeCompleted_questionAction,
        Form $formModel,
    ): JsonResponse {
        Log::info('StoreForm_instanceController###########');

        Log::info('===StoreForm_instanceController=====> Request data: ', $request->all());
        Log::info('completer_user_email: ' . $request->input('completer_user_email'));
        Log::info('completer_user_first_name: ' . $request->input('completer_user_first_name'));
        Log::info('completer_user_last_name: ' . $request->input('completer_user_last_name'));
        Log::info('aux_code: ' . $request->input('aux_code'));
        Log::info('form_id: ' . $request->input('form_id'));
        Log::info('api_url: ' . $request->input('api_url'));
        Log::info('initial_date_time: ' . $request->input('initial_date_time'));
        Log::info('final_date_time: ' . $request->input('final_date_time'));
        Log::info('public_code: ' . $request->input('public_code'));
        Log::info('completed_questions_count: ' . $request->input('completed_questions_count'));

        $initial_date_time = new \DateTime($request->input('initial_date_time'));
        $formattedInitial_date_time = $initial_date_time->format('Y-m-d H:i:s');
        $final_date_time = new \DateTime($request->input('final_date_time'));
        $formattedFinal_date_time = $final_date_time->format('Y-m-d H:i:s');

        $completedQuestions = $request->input('completed_questions');

        if (
            $request->filled('completer_user_email')
            && $request->filled('completer_user_first_name')
            && $request->filled('completer_user_last_name')
        ) {
            $completerUserDto = new Completer_userDto(
                email: $request->input('completer_user_email') ?? 'Not apply',
                first_name: $request->input('completer_user_first_name') ?? 'Not apply',
                last_name: $request->input('completer_user_last_name') ?? 'Not apply',
                code: $request->input('aux_code') ?? 'Not apply',
            );

            try {
                $completerUser = $storeCompleter_userAction->execute($completerUserDto);
                $completerUserId = $completerUser->id;
            } catch (\Exception $e) {
                Log::info('error-Exception:' . $e->getMessage());
                return responder()->error()->respond(JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
            }
        } else {
            $completerUserId = null;
        }

        $formId = intval($request->input('form_id'));
        try {
            $formInstance = $formModel->findOrFail($formId);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            Log::info('error-ModelNotFoundException:' . $e->getMessage());
            return responder()
                ->error()
                ->data([
                    'code' => 'FORM_NOT_FOUND',
                    'message' => 'The form with the id ' . $formId . ' could not be found'
                ])
                ->respond(JsonResponse::HTTP_BAD_REQUEST);
        }

        $isUserResponsesLinked = $formInstance->is_user_responses_linked;

        Log::info('isUserResponsesLinked:' . $isUserResponsesLinked);

        $formInstanceDto = new Form_instanceDto(
            initial_date_time: $formattedInitial_date_time,
            final_date_time: $formattedFinal_date_time,
            api_response: "",
            form_id: $formId,
            completer_user_id: $isUserResponsesLinked ? $completerUserId : null,
        );

        try {
            $formInstance = $storeForm_instanceAction->execute($formInstanceDto);
        } catch (\Exception $e) {
            Log::info('error-Exception2:' . $e->getMessage());

            return responder()->error()->respond(JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }

        try {
            $completedQuestions = $request->input('completed_questions');
            foreach ($completedQuestions as $question) {
                Log::info('$question[mapping_key]:' . $question['mapping_key']);
                if (isset($question['completer_user_answer_checked_options'])) {
                    $answer = json_encode($question['completer_user_answer_checked_options']);
                } else {
                    $answer = $question['answer'];
                }
                $completedQuestionDto = new Completed_questionDto(
                    title: $question['title'],
                    answer: $answer,
                    mapping_key: $question['mapping_key'],
                    form_instance_id: $formInstance->id,
                    question_type_id: $question['question_type_id'],
                );
                $storeCompleted_questionAction->execute($completedQuestionDto);
            }
        } catch (\Exception $e) {
            Log::info('error-Exception3:' . $e->getMessage());

            return responder()->error()->respond(JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }

        try {
            $apiUrl = $request->input('api_url');
            $response = Http::post($apiUrl, $request->all());

            $formInstance->api_response = $response->body();
            $formInstance->save();

            if ($response->successful()) {
                // $formInstance->api_response = $response->body();
                // $formInstance->save();
            } else {
                Log::info('error-ExternalApiError:' . $response->body());
                // return responder()->error()->respond(JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
            }
        } catch (\Exception $e) {
            $formInstance->api_response = $e->getMessage();
            $formInstance->save();
            Log::info('error-Exception4:' . $e->getMessage());
            // return responder()->error()->respond(JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }

        return responder()
            ->success($formInstance, Form_instanceTransformer::class)
            ->respond(JsonResponse::HTTP_CREATED);
    }
}
