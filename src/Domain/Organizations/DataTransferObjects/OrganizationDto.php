<?php

declare(strict_types=1);

namespace Domain\Organizations\DataTransferObjects;

class OrganizationDto
{
    public function __construct(
        private readonly string $name,
        private readonly string $description,
        private readonly string $logo,
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

    public function getLogo(): string
    {
        return $this->logo;
    }
}
