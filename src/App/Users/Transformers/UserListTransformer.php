<?php

declare(strict_types=1);

namespace App\Users\Transformers;

use Domain\Users\Models\User;
use Flugg\Responder\Transformers\Transformer;

class UserListTransformer extends Transformer
{
    public function transform(User $user): array
    {
        $totalForms = $user->forms->count();
        $activeForms = $user->forms->where('is_active', true)->count();
        $inactiveForms = $user->forms->where('is_active', false)->count();

        return [
            'id' => (int) $user->id,
            'first_name' => (string) $user->first_name,
            'last_name' => (string) $user->last_name,
            'photo' => (string) $user->photo,
            'position_in_org' => (string) $user->position_in_org,
            'is_active' => (bool) $user->is_active,
            'is_2fa_email_active' => (bool) $user->is_two_factor_email_active,
            // 'is_2fa_email_active' => boolval($user->is_two_factor_email_active),
            'email' => (string) $user->email,
            'organization_name' => $user->organization->name,
            'role_name' => $user->role->name,
            'total_forms' => $totalForms,
            'active_forms' => $activeForms,
            'inactive_forms' => $inactiveForms,
        ];
    }
}
