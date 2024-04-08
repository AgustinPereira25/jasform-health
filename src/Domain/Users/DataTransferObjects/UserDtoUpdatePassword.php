<?php

declare(strict_types=1);

namespace Domain\Users\DataTransferObjects;

class UserDtoUpdatePassword
{
    public function __construct(
        private readonly string $id,
        private readonly string $email,
        private readonly string $password,
    ) {
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'email' => $this->getEmail(),
            'password' => $this->getPassword(),
        ];
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getPassword(): string
    {
        return $this->password;
    }
}
