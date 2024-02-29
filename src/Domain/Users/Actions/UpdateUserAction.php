<?php

declare(strict_types=1);

namespace Domain\Users\Actions;

use Domain\Users\DataTransferObjects\UserDtoUpdate;
use Domain\Users\Models\User;

class UpdateUserAction
{
    public function execute(UserDtoUpdate $userDtoUpdate, User $user): User
    {
        $user->update($userDtoUpdate->toArray());

        return $user;
    }
}


// class UpdateUserAction
// {
//     public function execute(UserDtoUpdate $userDtoUpdate): User
//     {
//         // Encuentra el usuario existente
//         $user = User::find($userDtoUpdate->getId());

//         // Actualiza los campos necesarios
//         $user->email = $userDtoUpdate->getEmail();
//         // Similar para otros campos que desees actualizar...

//         // Guarda los cambios en la base de datos
//         $user->save();

//         return $user;
//     }
// }
