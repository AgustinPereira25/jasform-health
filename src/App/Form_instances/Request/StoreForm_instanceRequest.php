<?php

declare(strict_types=1);

namespace App\Form_instances\Request;

use Domain\Form_instances\DataTransferObjects\Form_instanceDto;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreForm_instanceRequest extends FormRequest
{
    public const INITIAL_DATE_TIME = 'initial_date_time';
    public const IS_COMPLETED = 'is_completed';
    public const COMPLETED_QUESTIONS = 'completed_questions';
    public const FINAL_DATE_TIME = 'final_date_time';
    public const FORM_ID = 'form_id';
    public const COMPLETER_USER_ID = 'completer_user_id';

    public function rules(): array
    {
        return [
            self::INITIAL_DATE_TIME => ['required'],
            self::IS_COMPLETED => ['required'],
            self::FINAL_DATE_TIME => ['required'],
            self::FORM_ID => ['required'],
            self::COMPLETER_USER_ID => ['required'],
        ];
    }

    public function toDto(): Form_instanceDto
    {
        return new Form_instanceDto(
            initial_date_time: $this->string(self::INITIAL_DATE_TIME)->toString(),
            is_completed: $this->string(self::IS_COMPLETED)->toString(),
            completed_questions: $this->string(self::COMPLETED_QUESTIONS)->toString(),
            final_date_time: $this->string(self::FINAL_DATE_TIME)->toString(),
            form_id: $this->string(self::FORM_ID)->toString(),
            completer_user_id: $this->string(self::COMPLETER_USER_ID)->toString(),
        );
    }
}
