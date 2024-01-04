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
            'phone' => (string) $user->phone,
            'position_in_organization' => (string) $user->position_in_organization,
            'status' => (string) $user->status,
            'email' => (string) $user->email,
            'organization_id' => (string) $user->organization_id
        ];
    }
}
