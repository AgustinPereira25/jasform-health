<?php

declare(strict_types=1);

namespace App\Question_types\Request;

use Domain\Question_types\DataTransferObjects\Question_typeDto;
use Illuminate\Foundation\Http\FormRequest;

class StoreQuestion_typeRequest extends FormRequest
{
    public const NAME = 'name';
    public const DESCRIPTION = 'description';

    public function rules(): array
    {
        return [
            self::NAME => ['required'],
        ];
    }

    public function toDto(): Question_typeDto
    {
        return new Question_typeDto(
            name: $this->string(self::NAME)->toString(),
            description: $this->string(self::DESCRIPTION)->toString(),
        );
    }
}
