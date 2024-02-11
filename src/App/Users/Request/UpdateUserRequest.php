<?php

declare(strict_types=1);

namespace App\Users\Request;

use Domain\Users\DataTransferObjects\UserDtoUpdate;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
{
    public const ID = 'id';
    public const FIRST_NAME = 'first_name';
    public const LAST_NAME = 'last_name';
    public const PHOTO = 'photo';
    public const POSITION = 'position_in_organization';
    public const IS_ACTIVE = 'is_active';
    public const EMAIL = 'email';
    public const PASSWORD = 'password';
    public const ORGANIZATION_ID = 'organization_id';
    public const ORGANIZATION_NAME = 'organization_name';
    public const ROLE_ID = 'role_id';
    public const ROLE_NAME = 'role_name';

    public function rules(): array
    {
        return [
            self::ID => ['required', 'exists:users,id'],
            self::FIRST_NAME => ['required'],
            self::LAST_NAME => ['required'],
            self::EMAIL => ['required', 'email:strict', 'exists:users,email'],
            self::ORGANIZATION_NAME => ['required', 'string'],
            self::ROLE_NAME => ['required', 'string'],
        ];
    }

    public function toDtoUpdate(): UserDtoUpdate
    {
        return new UserDtoUpdate(
            id: (string)$this[self::ID],
            first_name: $this[self::FIRST_NAME],
            last_name: $this[self::LAST_NAME],
            photo: $this[self::PHOTO] ? $this[self::PHOTO] : '',
            position_in_organization: $this[self::POSITION] ? $this[self::POSITION] : '',
            is_active: $this[self::IS_ACTIVE],
            email: $this[self::EMAIL],
            password: $this[self::PASSWORD],
            organization_id: (string) $this[self::ORGANIZATION_ID],
            role_id: (string) $this[self::ROLE_ID],
        );
    }

    public function execute(User $user, array $validatedData): User
    {
        $user->update($validatedData);

        return $user;
    }

    public function getIdAttribute($value)
    {
        return (string)$value;
    }
}
