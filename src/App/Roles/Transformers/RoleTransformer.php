<?php

namespace App\Roles\Transformers;

use Domain\Roles\Models\Role;
use Flugg\Responder\Transformers\Transformer;

class RoleTransformer extends Transformer
{
    public function transform(Role $role): array
    {
        return [
            'id' => $role->id,
            'name' => $role->name,
        ];
    }
}
