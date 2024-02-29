<?php

declare(strict_types=1);

namespace App\Forms\Request;

use Domain\Forms\DataTransferObjects\FormDtoUpdate;
use Domain\Forms\Models\Form;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateFormRequest extends FormRequest
{
    public const ID = 'id';
    public const NAME = 'name';
    public const WELCOME_TEXT = 'welcome_text';
    public const FINAL_TEXT = 'final_text';
    public const DESCRIPTION = 'description';
    public const CREATION_DATE_TIME = 'creation_date_time';
    public const LAST_MODIFIED_DATE_TIME = 'last_modified_date_time';
    public const LOGO = 'logo';
    public const PRIMARY_COLOR = 'primary_color';
    public const SECONDARY_COLOR = 'secondary_color';
    public const ROUNDED_STYLE = 'rounded_style';
    public const API_URL = 'api_url';
    public const IS_ACTIVE = 'is_active';
    public const IS_USER_RESPONSES_LINKED = 'is_user_responses_linked';
    public const IS_INITIAL_DATA_REQUIRED = 'is_initial_data_required';
    public const PUBLIC_CODE = 'public_code';
    public const USER_ID = 'user_id';

    public function rules(): array
    {
        return [
            self::NAME => ['required'],
            self::WELCOME_TEXT => ['required'],
            self::FINAL_TEXT,
            self::CREATION_DATE_TIME,
            self::IS_ACTIVE => ['required'],
            self::IS_USER_RESPONSES_LINKED => ['required'],
            self::IS_INITIAL_DATA_REQUIRED => ['required'],
            self::PUBLIC_CODE => ['required', Rule::unique('forms', 'public_code')->ignore($this->id)],
            self::USER_ID => ['required'],
        ];
    }

    public function toDtoUpdate(): FormDtoUpdate
    {
        return new FormDtoUpdate(
            id: $this->string(self::ID)->toString(),
            name: $this->string(self::NAME)->toString(),
            welcome_text: $this->string(self::WELCOME_TEXT)->toString(),
            final_text: $this->string(self::FINAL_TEXT)->toString(),
            description: $this->string(self::DESCRIPTION)->toString(),
            creation_date_time: $this->string(self::CREATION_DATE_TIME)->toString(),
            last_modified_date_time: $this->string(self::LAST_MODIFIED_DATE_TIME)->toString(),
            logo: $this->string(self::LOGO)->toString(),
            primary_color: $this->string(self::PRIMARY_COLOR)->toString(),
            secondary_color: $this->string(self::SECONDARY_COLOR)->toString(),
            rounded_style: $this->string(self::ROUNDED_STYLE)->toString(),
            api_url: $this->string(self::API_URL)->toString(),
            is_active: $this->string(self::IS_ACTIVE)->toString(),
            is_user_responses_linked: $this->string(self::IS_USER_RESPONSES_LINKED)->toString(),
            is_initial_data_required: $this->string(self::IS_INITIAL_DATA_REQUIRED)->toString(),
            public_code: $this->string(self::PUBLIC_CODE)->toString(),
            user_id: $this->string(self::USER_ID)->toString(),
        );
    }

    public function execute(Form $form, array $validatedData): Form
    {
        $form->update($validatedData);

        return $form;
    }

    public function getIdAttribute($value)
    {
        return (string) $value;
    }
}
