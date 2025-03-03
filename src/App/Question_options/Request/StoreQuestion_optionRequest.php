<?php

declare(strict_types=1);

namespace App\Question_options\Request;

use Domain\Question_options\DataTransferObjects\Question_optionDto;
use Illuminate\Foundation\Http\FormRequest;

class StoreQuestion_optionRequest extends FormRequest
{
    public const ORDER = 'order';
    public const TITLE = 'title';
    public const NEXT_QUESTION = 'next_question';
    public const FORM_QUESTION_ID = 'form_question_id';

    public function rules(): array
    {
        return [
            self::ORDER => ['required'],
            self::TITLE => ['required'],
            self::FORM_QUESTION_ID => ['required'],
        ];
    }

    public function toDto(): Question_optionDto
    {
        return new Question_optionDto(
            order: $this->string(self::ORDER)->toString(),
            title: $this->string(self::TITLE)->toString(),
            next_question: $this->string(self::NEXT_QUESTION)->toString(),
            form_question_id: $this->string(self::FORM_QUESTION_ID)->toString(),
        );
    }
}
