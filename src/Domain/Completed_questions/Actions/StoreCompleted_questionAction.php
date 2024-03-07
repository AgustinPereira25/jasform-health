<?php

declare(strict_types=1);

namespace Domain\Completed_questions\Actions;

use Domain\Completed_questions\DataTransferObjects\Completed_questionDto;
use Domain\Completed_questions\Models\Completed_question;
use Illuminate\Contracts\Hashing\Hasher;

class StoreCompleted_questionAction
{
    public function __construct(private readonly Hasher $hasher)
    {
    }

    public function execute(Completed_questionDto $completed_questionDto): Completed_question
    {
        return Completed_question::create([
            'title' => $completed_questionDto->getTitle(),
            'answer' => $completed_questionDto->getAnswer(),
            'mapping_key' => $completed_questionDto->getMappingKey(),
            'form_instance_id' => $completed_questionDto->getFormInstanceId(),
            'question_type_id' => $completed_questionDto->getQuestionTypeId(),
        ]);
    }
}
