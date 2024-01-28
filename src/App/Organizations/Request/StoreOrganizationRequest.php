<?php

declare(strict_types=1);

namespace App\Organizations\Request;

use Domain\Organizations\DataTransferObjects\OrganizationDto;
use Illuminate\Foundation\Http\FormRequest;

class StoreOrganizationRequest extends FormRequest
{
    public const NAME = 'name';
    public const DESCRIPTION = 'description';

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
        );
    }
}
