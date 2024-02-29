<?php

declare(strict_types=1);

namespace Domain\Completer_users\DataTransferObjects;

class Completer_userDto
{
    public function __construct(
        private readonly string $email,
        private readonly string $first_name,
        private readonly string $last_name,
        private readonly string|null $code,
    ) {
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getFirstName(): string
    {
        return $this->first_name;
    }

    public function getLastName(): string
    {
        return $this->last_name;
    }

    public function getCode(): string|null
    {
        return $this->code;
    }
}
