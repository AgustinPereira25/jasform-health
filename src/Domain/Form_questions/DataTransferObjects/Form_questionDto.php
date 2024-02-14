<?php

declare(strict_types=1);

namespace Domain\Form_questions\DataTransferObjects;

class Form_questionDto
{
    public function __construct(
        private readonly string $title,
        private readonly string $text,
        private readonly string $order,
        private readonly string $is_mandatory,
        private readonly string $form_id,
        private readonly string $question_type_id,
    ) {
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getText(): string
    {
        return $this->text;
    }

    public function getOrder(): string
    {
        return $this->order;
    }

    public function getIsMandatory(): string
    {
        return $this->is_mandatory;
    }

    public function getFormId(): string
    {
        return $this->form_id;
    }

    public function getQuestionTypeId(): string
    {
        return $this->question_type_id;
    }
}
