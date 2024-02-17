<?php

declare(strict_types=1);

namespace App\Completed_questions\Request;

use Domain\Completed_questions\DataTransferObjects\Completed_questionDto;
use Illuminate\Foundation\Http\FormRequest;

class StoreCompleted_questionRequest extends FormRequest
{
    public const TITLE = 'title';
    public const ANSWER = 'answer';
    public const FORM_INSTANCE_ID = 'form_instance_id';
    public const QUESTION_TYPE_ID = 'question_type_id';

    public function rules(): array
    {
        return [
            self::TITLE => ['required'],
            self::ANSWER => ['required'],
            self::FORM_INSTANCE_ID => ['required'],
            self::QUESTION_TYPE_ID => ['required'],
        ];
    }

    public function toDto(): Completed_questionDto
    {
        return new Completed_questionDto(
            title: $this->string(self::TITLE)->toString(),
            answer: $this->string(self::ANSWER)->toString(),
            form_instance_id: $this->string(self::FORM_INSTANCE_ID)->toString(),
            question_type_id: $this->string(self::QUESTION_TYPE_ID)->toString(),
        );
    }
}
