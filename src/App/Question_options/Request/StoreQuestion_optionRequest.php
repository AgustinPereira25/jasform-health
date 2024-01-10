<?php

declare(strict_types=1);

namespace App\Question_options\Request;

use Domain\Question_options\DataTransferObjects\Question_optionDto;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreQuestion_optionRequest extends FormRequest
{
    public const ORDER = 'order';
    public const NAME = 'name';
    public const DESCRIPTION = 'description';
    public const NEXT_QUESTION = 'next_question';
    public const FORM_QUESTION_ID = 'form_question_id';

    public function rules(): array
    {
        return [
            self::ORDER => ['required'],
            self::NAME => ['required'],
            self::FORM_QUESTION_ID => ['required'],
        ];
    }

    public function toDto(): Question_optionDto
    {
        return new Question_optionDto(
            order: $this->string(self::ORDER)->toString(),
            name: $this->string(self::NAME)->toString(),
            description: $this->string(self::DESCRIPTION)->toString(),
            next_question: $this->string(self::NEXT_QUESTION)->toString(),
            form_question_id: $this->string(self::FORM_QUESTION_ID)->toString(),
        );
    }
}
