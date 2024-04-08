<?php

declare(strict_types=1);

namespace Domain\Users\Actions;

use Domain\Users\DataTransferObjects\UserDtoUpdatePassword;
use Domain\Users\Models\User;
use Illuminate\Support\Facades\Hash;

class UpdatePasswordUserAction
{
    public function execute(UserDtoUpdatePassword $userDtoUpdatePassword, User $user): User
    {
        $user->password = Hash::make($userDtoUpdatePassword->getPassword());
        $user->save();
        return $user;
    }
}
