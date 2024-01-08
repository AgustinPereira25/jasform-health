<?php

declare(strict_types=1);

namespace Domain\Form_activities\DataTransferObjects;

class Form_activityDto
{
    public function __construct(
        private readonly string $date_time,
        private readonly string $description,
        private readonly string $completed,
        private readonly string $completed_questions,
        private readonly string $form_instance_id,
    ) {
    }

    public function getDateTime(): string
    {
        return $this->date_time;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function getCompleted(): string
    {
        return $this->completed;
    }

    public function getCompletedQuestions(): string
    {
        return $this->completed_questions;
    }

    public function getFormInstanceId(): string
    {
        return $this->form_instance_id;
    }
}
