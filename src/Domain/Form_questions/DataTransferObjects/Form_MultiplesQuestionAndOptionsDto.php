<?php

declare(strict_types=1);

namespace Domain\Form_questions\DataTransferObjects;

class Form_MultiplesQuestionAndOptionsDto
{
    public function __construct(
        private readonly int $form_id,
        private readonly array $form_questions
    ) {
    }

    public function getFormId(): int
    {
        return $this->form_id;
    }

    public function getFormQuestions(): array
    {
        return $this->form_questions;
    }
}
