<?php

declare(strict_types=1);

namespace App\Users\Transformers;

use Domain\Users\Models\User;
use Flugg\Responder\Transformers\Transformer;
use App\Roles\Transformers\RoleTransformer;

class UserTransformer extends Transformer
{
    protected $load = [
        'roles' => RoleTransformer::class,
    ];

    public function transform(User $user): array
    {
        return [
            'id' => (int) $user->id,
            'first_name' => (string) $user->first_name,
            'last_name' => (string) $user->last_name,
            'photo' => (string) $user->photo,
            'position_in_organization' => (string) $user->position_in_organization,
            'is_active' => (bool) $user->is_active,
            'email' => (string) $user->email,
            'organization_id' => (int) $user->organization_id,
            'organization_name' => $user->organization->name,
            'organization_description' => $user->organization->description,
        ];
    }
}
