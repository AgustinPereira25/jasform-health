<?php

declare(strict_types=1);

namespace Domain\Completer_users\Actions;

use Domain\Completer_users\DataTransferObjects\Completer_userDto;
use Domain\Completer_users\Models\Completer_user;
use Illuminate\Contracts\Hashing\Hasher;

class StoreCompleter_userAction
{
    public function __construct(private readonly Hasher $hasher)
    {
    }

    public function execute(Completer_userDto $completer_userDto): Completer_user
    {
        return Completer_user::create([
            'email' => $completer_userDto->getEmail(),
            'first_name' => $completer_userDto->getFirstName(),
            'last_name' => $completer_userDto->getLastName(),
        ]);
    }
}
