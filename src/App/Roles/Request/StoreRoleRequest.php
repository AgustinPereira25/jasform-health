<?php

declare(strict_types=1);

namespace App\Roles\Request;

use Domain\Roles\DataTransferObjects\RoleDto;
use Illuminate\Foundation\Http\FormRequest;

class StoreRoleRequest extends FormRequest
{
    public const NAME = 'name';
    public const DESCRIPTION = 'description';

    public function rules(): array
    {
        return [
            self::NAME => ['required'],
        ];
    }

    public function toDto(): RoleDto
    {
        return new RoleDto(
            name: $this->string(self::NAME)->toString(),
            description: $this->string(self::DESCRIPTION)->toString(),
        );
    }
}
