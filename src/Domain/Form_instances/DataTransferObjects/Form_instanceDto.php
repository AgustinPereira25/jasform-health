<?php

declare(strict_types=1);

namespace Domain\Form_instances\DataTransferObjects;

class Form_instanceDto
{
    public function __construct(
        private readonly string $initial_date_time,
        private readonly string $is_completed,
        private readonly string $completed_questions,
        private readonly string $final_date_time,
        private readonly string $form_id,
        private readonly string $completer_user_id,
    ) {
    }

    public function getInitialDateTime(): string
    {
        return $this->initial_date_time;
    }

    public function getIsCompleted(): string
    {
        return $this->is_completed;
    }

    public function getCompletedQuestions(): string
    {
        return $this->completed_questions;
    }

    public function getFinalDateTime(): string
    {
        return $this->final_date_time;
    }

    public function getFormId(): string
    {
        return $this->form_id;
    }

    public function getCompleterUserId(): string
    {
        return $this->completer_user_id;
    }
}
