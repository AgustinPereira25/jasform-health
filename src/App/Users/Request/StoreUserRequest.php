<?php

declare(strict_types=1);

namespace App\Users\Request;

use Domain\Users\DataTransferObjects\UserDto;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
{
    public const FIRST_NAME = 'first_name';
    public const LAST_NAME = 'last_name';
    public const PHOTO = 'photo';
    public const PHONE = 'phone';
    public const POSITION = 'position_in_organization';
    public const IS_ACTIVE = 'is_active';
    public const EMAIL = 'email';
    public const PASSWORD = 'password'; 
    public const ORGANIZATION = 'organization_id';

    public function rules(): array
    {
        return [
            self::FIRST_NAME => ['required'],
            self::LAST_NAME => ['required'],
            self::EMAIL => ['required', 'email:strict'],
            self::PASSWORD => ['required', 'confirmed', Password::min(8)->letters()->numbers()],
        ];
    }

    public function toDto(): UserDto
    {
        return new UserDto(
            first_name: $this->string(self::FIRST_NAME)->toString(),
            last_name: $this->string(self::LAST_NAME)->toString(),
            photo: $this->string(self::PHOTO)->toString(),
            phone: $this->string(self::PHONE)->toString(),
            position_in_organization: $this->string(self::POSITION)->toString(),
            is_active: $this->string(self::IS_ACTIVE)->toString(),
            email: $this->string(self::EMAIL)->toString(),
            password: $this->string(self::PASSWORD)->toString(),
            organization_id: $this->string(self::ORGANIZATION)->toString(),
        );
    }
}
