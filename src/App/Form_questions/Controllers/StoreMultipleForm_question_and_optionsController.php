<?php

namespace App\Form_questions\Controllers;

use App\Form_questions\Request\StoreMultipleForm_questionAndOptionsRequest;
use App\Forms\Transformers\FormTransformer;
use Domain\Form_questions\Actions\StoreForm_questionAction;
use Domain\Forms\Models\Form;
use Domain\Form_questions\Models\Form_question;
use Domain\Question_types\Models\Question_type;
use Domain\Question_options\Models\Question_option;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class StoreMultipleForm_question_and_optionsController
{
    // public function __invoke(StoreMultipleForm_questionAndOptionsRequest $request, StoreForm_questionAction $storeForm_questionAction): JsonResponse
    public function __invoke(StoreMultipleForm_questionAndOptionsRequest $request): JsonResponse
    {
        Log::info('***StoreMultipleForm_question_and_optionsController');
        $form = Form::find($request->form_id);

        if (!$form) {
            return responder()->error("Form not found")->respond(JsonResponse::HTTP_NOT_FOUND);
        }

        try {
            foreach ($request->form_questions as $questionKey => $questionData) {
                $questionType = Question_type::find($questionData['question_type_id']);

                if (!$questionType) {
                    throw new \Exception("Question type not found for question index: $questionKey");
                }

                Log::info('Question data: ', $questionData);

                $question = new Form_question($questionData);
                $question->question_type()->associate($questionType);
                $form->form_questions()->save($question);

                if (isset($questionData['question_options'])) {
                    foreach ($questionData['question_options'] as $optionKey => $optionData) {
                        $option = new Question_option($optionData);
                        $question->question_options()->save($option);
                    }
                }
            }
        } catch (\Exception $e) {
            return responder()->error($e->getMessage())->respond(JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
        }

        $form->load('form_questions.question_type', 'form_questions.question_options');

        return responder()
            ->success($form, FormTransformer::class)
            ->respond(JsonResponse::HTTP_CREATED);
    }
}
