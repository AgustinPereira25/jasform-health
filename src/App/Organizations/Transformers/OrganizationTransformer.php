<?php

declare(strict_types=1);

namespace App\Organizations\Transformers;

use Domain\Organizations\Models\Organization;
use Flugg\Responder\Transformers\Transformer;

class OrganizationTransformer extends Transformer
{
    public function transform(Organization $organization): array
    {
        return [
            'id' => (int) $organization->id,
            'name' => (string) $organization->name,
            'description' => (string) $organization->description,
        ];
    }
}
