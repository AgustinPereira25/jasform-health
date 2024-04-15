<?php

declare(strict_types=1);

namespace App\Users\Transformers;

use Domain\Users\Models\User;
use Illuminate\Support\Facades\Log;

class UserDetailTransformer extends UserListTransformer
{
    public function transform(User $user): array
    {
        $userArray = parent::transform($user);

        $extraAttributes = [
            'photo' => (string) $user->photo,
            'is_2fa_email_active' => boolval($user->is_two_factor_email_active),
        ];

        return array_merge($userArray, $extraAttributes);
    }
}
