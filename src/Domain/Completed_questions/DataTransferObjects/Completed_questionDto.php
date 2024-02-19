<?php

declare(strict_types=1);

namespace Domain\Completed_questions\DataTransferObjects;

class Completed_questionDto
{
    public function __construct(
        private readonly string $title,
        private readonly string $answer,
        private readonly int $form_instance_id,
        private readonly int $question_type_id,
    ) {
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getAnswer(): string
    {
        return $this->answer;
    }

    public function getFormInstanceId(): int
    {
        return $this->form_instance_id;
    }

    public function getQuestionTypeId(): int
    {
        return $this->question_type_id;
    }
}
