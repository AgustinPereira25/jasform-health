<?php

declare(strict_types=1);

namespace App\Users\Request;

use Domain\Users\DataTransferObjects\UserDtoUpdatePassword;
use Domain\Users\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserPasswordRequest extends FormRequest
{
    public const ID = 'id';
    public const EMAIL = 'email';
    public const CURRENT_PASSWORD = 'current_password';
    public const NEW_PASSWORD = 'new_password';
    public const CONFIRMATION_PASSWORD = 'confirmation_password';

    public function rules(): array
    {
        return [
            self::ID => ['required', 'exists:users,id'],
            self::EMAIL => ['required', 'email:strict', 'exists:users,email'],
            self::CURRENT_PASSWORD => ['required', 'string'],
            self::NEW_PASSWORD => ['required', 'string', 'different:current_password'],
            self::CONFIRMATION_PASSWORD => ['required', 'string', 'same:new_password'],
        ];
    }

    public function toDtoUpdatePassword(): UserDtoUpdatePassword
    {
        return new UserDtoUpdatePassword(
            id: (string) $this[self::ID],
            email: $this[self::EMAIL],
            password: $this[self::NEW_PASSWORD],
        );
    }

    public function execute(User $user, array $validatedData): User
    {
        $user->update($validatedData);

        return $user;
    }

    public function getIdAttribute($value)
    {
        return (string) $value;
    }
}
