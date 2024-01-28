<?php

declare(strict_types=1);

namespace App\Completer_users\Transformers;

use Domain\Completer_users\Models\Completer_user;
use Flugg\Responder\Transformers\Transformer;

class Completer_userTransformer extends Transformer
{
    public function transform(Completer_user $completer_user): array
    {
        return [
            'id' => (int) $completer_user->id,
            'email' => (string) $completer_user->email,
            'first_name' => (string) $completer_user->first_name,
            'last_name' => (string) $completer_user->last_name,
            'code' => (string) $completer_user->code,
        ];
    }
}
