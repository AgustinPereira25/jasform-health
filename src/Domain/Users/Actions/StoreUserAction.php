<?php

declare(strict_types=1);

namespace Domain\Users\Actions;

use Domain\Users\DataTransferObjects\UserDto;
use Domain\Users\Models\User;
use Illuminate\Contracts\Hashing\Hasher;

class StoreUserAction
{
    public function __construct(private readonly Hasher $hasher)
    {
    }

    public function execute(UserDto $userDto): User
    {
        return User::create([
            'first_name' => $userDto->getFirstName(),
            'last_name' => $userDto->getLastName(),
            'photo' => $userDto->getPhoto(),
            'position_in_organization' => $userDto->getPosition(),
            'is_active' => $userDto->getIsActive(),
            'email' => $userDto->getEmail(),
            'password' => $this->hasher->make($userDto->getPassword()),
            'organization_id' => $userDto->getOrganization(),
            'role_id' => $userDto->getRole(),
        ]);
    }
}
