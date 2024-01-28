<?php

declare(strict_types=1);

namespace Domain\Organizations\Actions;

use Domain\Organizations\DataTransferObjects\OrganizationDto;
use Domain\Organizations\Models\Organization;
use Illuminate\Contracts\Hashing\Hasher;

class StoreOrganizationAction
{
    public function __construct(private readonly Hasher $hasher)
    {
    }

    public function execute(OrganizationDto $organizationDto): Organization
    {
        return Organization::create([
            'name' => $organizationDto->getName(),
            'description' => $organizationDto->getDescription(),
        ]);
    }
}
