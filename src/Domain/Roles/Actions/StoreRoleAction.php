<?php

declare(strict_types=1);

namespace Domain\Roles\Actions;

use Domain\Roles\DataTransferObjects\RoleDto;
use Domain\Roles\Models\Role;
use Illuminate\Contracts\Hashing\Hasher;

class StoreRoleAction
{
    public function __construct(private readonly Hasher $hasher)
    {
    }

    public function execute(RoleDto $roleDto): Role
    {
        return Role::create([
            'name' => $roleDto->getName(),
            'description' => $roleDto->getDescription(),
            'activity' => $roleDto->getActivity(),
        ]);
    }
}
