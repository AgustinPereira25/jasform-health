<?php

namespace App\Form_instances\Controllers;

use App\Form_instances\Request\StoreForm_instanceRequest;
use App\Form_instances\Transformers\Form_instanceTransformer;
use Domain\Form_instances\Actions\StoreForm_instanceAction;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class StoreForm_instanceController
{
    public function __invoke(StoreForm_instanceRequest $request, StoreForm_instanceAction $storeForm_instanceAction): JsonResponse
    {
        Log::info('Invoked StoreForm_instanceController');
        Log::info('*********StoreForm_instanceRequest::', $request->all());

        // Acceder a los valores del request
        $formId = $request->input('form_id');
        $completerUserName = $request->input('completer_user_name');
        $completerUserLastName = $request->input('completer_user_last_name');
        $completerUserEmail = $request->input('completer_user_email');
        $auxCode = $request->input('aux_code');
        $initialDateTime = $request->input('initial_date_time');
        $finalDateTime = $request->input('final_date_time');
        $completedQuestions = $request->input('completed_questions');

        Log::info('======>Form ID:', [$formId]);
        Log::info('Completer User Name:', [$completerUserName]);
        Log::info('Completer User Last Name:', [$completerUserLastName]);
        Log::info('Completer User Email:', [$completerUserEmail]);
        Log::info('Aux Code:', [$auxCode]);
        Log::info('Initial Date Time:', [$initialDateTime]);
        Log::info('Final Date Time:', [$finalDateTime]);

        // Iterar sobre las preguntas completadas y loggear la información
        foreach ($completedQuestions as $question) {
            Log::info('====== Questions answer by user');
            Log::info('======>----> Question ID:', [$question['id']]);
            Log::info('======>----> Question Title:', [$question['title']]);
            Log::info('======>----> Completer User Answer:', [$question['completer_user_answer']]);
            // ... puedes continuar con el resto de los campos de la pregunta

            // Si la pregunta tiene opciones de respuesta marcadas, también puedes iterar sobre ellas
            if (isset($question['completer_user_answer_checked_options'])) {
                Log::info('-------- Sub Options Checked by user');

                foreach ($question['completer_user_answer_checked_options'] as $option) {
                    Log::info('======>---->.....>Checked Option ID:', [$option['id']]);
                    // ... puedes continuar con el resto de los campos de la opción marcada
                }
            }
        }





        $form_instance = $storeForm_instanceAction->execute($request->toDto());

        return responder()
            ->success($form_instance, Form_instanceTransformer::class)
            ->respond(JsonResponse::HTTP_CREATED);
    }
}
