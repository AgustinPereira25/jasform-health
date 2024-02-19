<?php

declare(strict_types=1);

namespace App\Form_instances\Request;

use Domain\Form_instances\DataTransferObjects\Form_instanceDto;
use Illuminate\Foundation\Http\FormRequest;

class StoreForm_instanceRequest extends FormRequest
{
    public const INITIAL_DATE_TIME = 'initial_date_time';
    public const FINAL_DATE_TIME = 'final_date_time';
    public const FORM_ID = 'form_id';
    public const COMPLETER_USER_ID = 'completer_user_id';

    public function rules(): array
    {
        return [
            self::INITIAL_DATE_TIME => ['required'],
            self::FINAL_DATE_TIME => ['required'],
            self::FORM_ID => ['required'],
            self::COMPLETER_USER_ID => [],
        ];
    }

    public function toDto(): Form_instanceDto
    {
        return new Form_instanceDto(
            initial_date_time: $this->string(self::INITIAL_DATE_TIME)->toString(),
            final_date_time: $this->string(self::FINAL_DATE_TIME)->toString(),
            form_id: intval($this->input(self::FORM_ID)),
            completer_user_id: intval($this->input(self::COMPLETER_USER_ID)),
        );
    }
}
