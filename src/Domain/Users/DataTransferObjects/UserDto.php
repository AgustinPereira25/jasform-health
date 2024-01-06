<?php

declare(strict_types=1);

namespace Domain\Users\DataTransferObjects;

class UserDto
{
    public function __construct(
        private readonly string $first_name,
        private readonly string $last_name,
        private readonly string $photo,
        private readonly string $phone,
        private readonly string $position_in_organization,
        private readonly string $status,
        private readonly string $email,
        private readonly string $password,
        private readonly string $organization_id,
    ) {
    }

    public function getFirstName(): string
    {
        return $this->first_name;
    }

    public function getLastName(): string
    {
        return $this->last_name;
    }

    public function getPhoto(): string
    {
        return $this->photo;
    }

    public function getPhone(): string
    {
        return $this->phone;
    }

    public function getPosition(): string
    {
        return $this->position_in_organization;
    }

    public function getStatus(): string
    {
        return $this->status;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function getOrganization(): string
    {
        return $this->organization_id;
    }
}
