<?php

declare(strict_types=1);

namespace App\Form_instances\Request;

use Domain\Form_instances\DataTransferObjects\Form_instanceDto;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreForm_instanceRequest extends FormRequest
{
    public const DATE_TIME = 'date_time';
    public const FORM_ID = 'form_id';
    public const COMPLETER_USER_ID = 'completer_user_id';

    public function rules(): array
    {
        return [
            self::DATE_TIME => ['required'],
            self::FORM_ID => ['required'],
            self::COMPLETER_USER_ID => ['required'],
        ];
    }

    public function toDto(): Form_instanceDto
    {
        return new Form_instanceDto(
            date_time: $this->string(self::DATE_TIME)->toString(),
            form_id: $this->string(self::FORM_ID)->toString(),
            completer_user_id: $this->string(self::COMPLETER_USER_ID)->toString(),
        );
    }
}
