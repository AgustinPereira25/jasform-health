<?php

declare(strict_types=1);

namespace App\Users\Transformers;

use Domain\Users\Models\User;

class UserDetailTransformer extends UserListTransformer
{
    public function transform(User $user): array
    {
        $userArray = parent::transform($user);

        $extraAttributes = [
            'photo' => (string) $user->photo,
        ];

        return array_merge($userArray, $extraAttributes);
    }
}
