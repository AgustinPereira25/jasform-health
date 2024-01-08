<?php

declare(strict_types=1);

namespace Domain\Question_types\Actions;

use Domain\Question_types\DataTransferObjects\Question_typeDto;
use Domain\Question_types\Models\Question_type;
use Illuminate\Contracts\Hashing\Hasher;

class StoreQuestion_typeAction
{
    public function __construct(private readonly Hasher $hasher)
    {
    }

    public function execute(Question_typeDto $question_typeDto): Question_type
    {
        return Question_type::create([
            'name' => $question_typeDto->getName(),
            'description' => $question_typeDto->getDescription(),
        ]);
    }
}
