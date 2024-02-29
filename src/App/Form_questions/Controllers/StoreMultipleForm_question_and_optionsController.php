<?php

namespace App\Form_questions\Controllers;

use App\Form_questions\Request\StoreMultipleForm_questionAndOptionsRequest;
use App\Forms\Transformers\FormTransformer;
use Domain\Form_questions\Models\Form_question;
use Domain\Forms\Models\Form;
use Domain\Question_options\Models\Question_option;
use Domain\Question_types\Models\Question_type;
use Illuminate\Http\JsonResponse;

class StoreMultipleForm_question_and_optionsController
{
    public function __invoke(StoreMultipleForm_questionAndOptionsRequest $request): JsonResponse
    {
        $form = Form::find($request->form_id);

        if (! $form) {
            return responder()->error("Form not found")->respond(JsonResponse::HTTP_NOT_FOUND);
        }

        foreach ($form->form_questions as $question) {
            $question->question_options()->delete();
        }
        $form->form_questions()->delete();


        try {
            foreach ($request->form_questions as $questionKey => $questionData) {
                $questionType = Question_type::find($questionData['question_type_id']);

                if (! $questionType) {
                    throw new \Exception("Question type not found for question index: $questionKey");
                }
                $question = new Form_question($questionData);
                $question->question_type()->associate($questionType);
                $form->form_questions()->save($question);

                if (isset($questionData['question_options'])) {
                    foreach ($questionData['question_options'] as $optionKey => $optionData) {
                        if (array_key_exists('next_question', $optionData)) {
                            if ($optionData['next_question'] === 'null') {
                                $optionData['next_question'] = null;
                            } else {
                                $optionData['next_question'] = (int) $optionData['next_question'];
                            }
                        } else {
                            $optionData['next_question'] = null;
                        }

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
