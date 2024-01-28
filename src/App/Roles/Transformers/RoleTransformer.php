<?php

namespace App\Roles\Transformers;

use Domain\Roles\Models\Role;
use Flugg\Responder\Transformers\Transformer;

class RoleTransformer extends Transformer
{
    public function transform(Role $role): array
    {
        return [
            'id' => (int) $role->id,
            'name' => (string) $role->name,
            'description' => (string) $role->description,
        ];
    }
}
