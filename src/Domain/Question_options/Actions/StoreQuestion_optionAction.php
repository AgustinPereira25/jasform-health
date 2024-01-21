<?php

declare(strict_types=1);

namespace Domain\Question_options\Actions;

use Domain\Question_options\DataTransferObjects\Question_optionDto;
use Domain\Question_options\Models\Question_option;
use Illuminate\Contracts\Hashing\Hasher;

class StoreQuestion_optionAction
{
    public function __construct(private readonly Hasher $hasher)
    {
    }

    public function execute(Question_optionDto $question_optionDto): Question_option
    {
        return Question_option::create([
            'order' => $question_optionDto->getOrder(),
            'title' => $question_optionDto->getTitle(),
            'next_question' => $question_optionDto->getNextQuestion(),
            'form_question_id' => $question_optionDto->getFormQuestionId(),
        ]);
    }
}

