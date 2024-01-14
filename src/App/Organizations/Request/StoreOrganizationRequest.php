<?php

declare(strict_types=1);

namespace App\Organizations\Request;

use Domain\Organizations\DataTransferObjects\OrganizationDto;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreOrganizationRequest extends FormRequest
{
    public const NAME = 'name';
    public const DESCRIPTION = 'description';
    public const LOGO = 'logo';

    public function rules(): array
    {
        return [
            self::NAME => ['required'],
        ];
    }

    public function toDto(): OrganizationDto
    {
        return new OrganizationDto(
            name: $this->string(self::NAME)->toString(),
            description: $this->string(self::DESCRIPTION)->toString(),
            logo: $this->string(self::LOGO)->toString(),
        );
    }
}
