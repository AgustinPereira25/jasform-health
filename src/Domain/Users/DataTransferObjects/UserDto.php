<?php

declare(strict_types=1);

namespace Domain\Users\DataTransferObjects;

class UserDto
{
    public function __construct(
        private readonly string $first_name,
        private readonly string $last_name,
        private readonly string $photo,
        private readonly string $position_in_org,
        private readonly string $is_active,
        private readonly string $email,
        private readonly string $password,
        private readonly string $organization_id,
        private readonly string $role_id,
        private readonly string $is_two_factor_email_active,
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

    public function getPosition(): string
    {
        return $this->position_in_org;
    }

    public function getIsActive(): string
    {
        return $this->is_active;
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

    public function getRole(): string
    {
        return $this->role_id;
    }

    public function getIsTwoFactorEmailActive(): string
    {
        return $this->is_two_factor_email_active;
    }
}
