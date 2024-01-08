<?php

declare(strict_types=1);

namespace Domain\Question_options\DataTransferObjects;

class Question_optionDto
{
    public function __construct(
        private readonly string $order,
        private readonly string $name,
        private readonly string $description,
        private readonly string $next_question,
        private readonly string $form_question_id,
    ) {
    }
    
    public function getOrder(): string
    {
        return $this->order;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getDescription(): string
    {
        return $this->description;
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
