<?php

declare(strict_types=1);

namespace Domain\Question_types\DataTransferObjects;

class Question_typeDto
{
    public function __construct(
        private readonly string $name,
        private readonly string $description,
    ) {
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getDescription(): string
    {
        return $this->description;
    }
}
