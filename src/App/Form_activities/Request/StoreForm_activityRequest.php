<?php

declare(strict_types=1);

namespace App\Form_activities\Request;

use Domain\Form_activities\DataTransferObjects\Form_activityDto;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreForm_activityRequest extends FormRequest
{
    public const DATE_TIME = 'date_time';
    public const DESCRIPTION = 'description';
    public const COMPLETED = 'completed';
    public const COMPLETED_QUESTIONS = 'completed_questions';
    public const FORM_INSTANCE_ID = 'form_instance_id';

    public function rules(): array
    {
        return [
            self::DATE_TIME => ['required'],
            self::COMPLETED => ['required'],
            self::FORM_INSTANCE_ID => ['required'],
        ];
    }

    public function toDto(): Form_activityDto
    {
        return new Form_activityDto(
            date_time: $this->string(self::DATE_TIME)->toString(),
            description: $this->string(self::DESCRIPTION)->toString(),
            completed: $this->string(self::COMPLETED)->toString(),
            completed_questions: $this->string(self::COMPLETED_QUESTIONS)->toString(),
            form_instance_id: $this->string(self::FORM_INSTANCE_ID)->toString(),
        );
    }
}
