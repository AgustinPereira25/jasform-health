<?php

declare(strict_types=1);

namespace Domain\Question_options\DataTransferObjects;

class Question_optionDto
{
    public function __construct(
        private readonly string $order,
        private readonly string $title,
        private readonly string $next_question,
        private readonly string $form_question_id,
    ) {
    }
    
    public function getOrder(): string
    {
        return $this->order;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getNextQuestion(): string
    {
        return $this->next_question;
    }

    public function getFormQuestionId(): string
    {
        return $this->form_question_id;
    }
}
