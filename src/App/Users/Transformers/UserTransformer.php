<?php

declare(strict_types=1);

namespace App\Users\Transformers;

use Domain\Users\Models\User;
use Flugg\Responder\Transformers\Transformer;

class UserTransformer extends Transformer
{
    public function transform(User $user): array
    {
        return [
            'id' => (int) $user->id,
            'first_name' => (string) $user->first_name,
            'last_name' => (string) $user->last_name,
            'photo' => (string) $user->photo,
            'position_in_org' => (string) $user->position_in_org,
            'is_active' => (bool) $user->is_active,
            'is_2fa_email_active' => (bool) $user->is_two_factor_email_active,
            'email' => (string) $user->email,
            'organization_id' => (int) $user->organization_id,
            'organization_name' => $user->organization->name,
            'organization_description' => $user->organization->description,
            'role_id' => (int) $user->role_id,
            'role_name' => $user->role->name,
            'role_description' => $user->role->description,
        ];
    }
}
