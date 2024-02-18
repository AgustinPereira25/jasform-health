<?php

declare(strict_types=1);

namespace Domain\Form_questions\Actions;

use Domain\Form_questions\DataTransferObjects\Form_questionDto;
use Domain\Form_questions\Models\Form_question;
use Illuminate\Contracts\Hashing\Hasher;

class StoreForm_questionAction
{
    public function __construct(private readonly Hasher $hasher)
    {
    }

    public function execute(Form_questionDto $form_questionDto): Form_question
    {
        return Form_question::create([
            'title' => $form_questionDto->getTitle(),
            'text' => $form_questionDto->getText(),
            'order' => $form_questionDto->getOrder(),
            'is_mandatory' => $form_questionDto->getIsMandatory(),
            'form_id' => $form_questionDto->getFormId(),
            'question_type_id' => $form_questionDto->getQuestionTypeId(),
        ]);
    }
}
