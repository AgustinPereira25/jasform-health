<?php

declare(strict_types=1);

namespace App\Form_questions\Request;

use Domain\Form_questions\DataTransferObjects\Form_MultiplesQuestionAndOptionsDto;
use Domain\Form_questions\DataTransferObjects\Form_questionDto;
use Illuminate\Foundation\Http\FormRequest;

class StoreMultipleForm_questionAndOptionsRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'form_id' => ['required'],
            'form_questions' => ['array'],
            'form_questions.*.title' => ['required'],
            'form_questions.*.text' => ['required'],
            'form_questions.*.order' => ['required'],
            'form_questions.*.is_mandatory' => ['required'],
            'form_questions.*.mapping_key' => [],
            'form_questions.*.question_type_id' => ['required'],
        ];
    }

    public function toDto(): Form_MultiplesQuestionAndOptionsDto
    {
        $form_questions = array_map(
            function ($question) {
                return new Form_questionDto(
                    title: $question['title'],
                    text: $question['text'],
                    order: $question['order'],
                    is_mandatory: $question['is_mandatory'],
                    mapping_key: $question['mapping_key'],
                    form_id: $question['form_id'],
                    question_type_id: $question['question_type_id'],
                );
            },
            $this->input('form_questions')
        );

        return new Form_MultiplesQuestionAndOptionsDto(
            form_id: $this->input('form_id'),
            form_questions: $form_questions
        );
    }
}
