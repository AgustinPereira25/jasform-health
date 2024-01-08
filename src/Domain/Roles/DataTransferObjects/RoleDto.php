<?php

declare(strict_types=1);

namespace Domain\Roles\DataTransferObjects;

class RoleDto
{
    public function __construct(
        private readonly string $name,
        private readonly string $description,
        private readonly string $activity,
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

    public function getActivity(): string
    {
        return $this->activity;
    }
}
