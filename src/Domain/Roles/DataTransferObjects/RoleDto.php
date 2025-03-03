<?php

declare(strict_types=1);

namespace Domain\Roles\DataTransferObjects;

class RoleDto
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
