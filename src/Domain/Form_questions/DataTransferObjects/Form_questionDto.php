<?php

declare(strict_types=1);

namespace Domain\Form_questions\DataTransferObjects;

class Form_questionDto
{
    public function __construct(
        private readonly string $title,
        private readonly string $text,
        private readonly int $order,
        private readonly int $is_mandatory,
        private readonly string $mapping_key,
        private readonly int $form_id,
        private readonly int $question_type_id,
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

    public function getOrder(): int
    {
        return $this->order;
    }

    public function getIsMandatory(): int
    {
        return $this->is_mandatory;
    }

    public function getMappingKey(): string
    {
        return $this->mapping_key;
    }

    public function getFormId(): int
    {
        return $this->form_id;
    }

    public function getQuestionTypeId(): int
    {
        return $this->question_type_id;
    }
}
