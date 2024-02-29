<?php

declare(strict_types=1);

namespace App\Completer_users\Request;

use Domain\Completer_users\DataTransferObjects\Completer_userDto;
use Illuminate\Foundation\Http\FormRequest;

class StoreCompleter_userRequest extends FormRequest
{
    public const FIRST_NAME = 'first_name';
    public const LAST_NAME = 'last_name';
    public const EMAIL = 'email';
    public const CODE = 'code';

    public function rules(): array
    {
        return [
            self::FIRST_NAME => ['required'],
            self::LAST_NAME => ['required'],
            self::EMAIL => ['required', 'email:strict'],
            self::CODE => [],
        ];
    }

    public function toDto(): Completer_userDto
    {
        return new Completer_userDto(
            email: $this->string(self::EMAIL)->toString(),
            first_name: $this->string(self::FIRST_NAME)->toString(),
            last_name: $this->string(self::LAST_NAME)->toString(),
            code: $this->string(self::CODE)->toString(),
        );
    }
}
