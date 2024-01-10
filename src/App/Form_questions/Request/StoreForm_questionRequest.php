<?php

declare(strict_types=1);

namespace App\Form_questions\Request;

use Domain\Form_questions\DataTransferObjects\Form_questionDto;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreForm_questionRequest extends FormRequest
{
    public const TITLE = 'title';
    public const TEXT = 'text';
    public const ORDER = 'order';
    public const OBLIGATORY = 'obligatory';
    public const FORM_ID = 'form_id';
    public const QUESTION_TYPE_ID = 'question_type_id';

    public function rules(): array
    {
        return [
            self::TITLE => ['required'],
            self::TEXT => ['required'],
            self::ORDER => ['required'],
            self::OBLIGATORY => ['required'],
            self::FORM_ID => ['required'],
            self::QUESTION_TYPE_ID => ['required'],
        ];
    }

    public function toDto(): Form_questionDto
    {
        return new Form_questionDto(
            title: $this->string(self::TITLE)->toString(),
            text: $this->string(self::TEXT)->toString(),
            order: $this->string(self::ORDER)->toString(),
            obligatory: $this->string(self::OBLIGATORY)->toString(),
            form_id: $this->string(self::FORM_ID)->toString(),
            question_type_id: $this->string(self::QUESTION_TYPE_ID)->toString(),
        );
    }
}
