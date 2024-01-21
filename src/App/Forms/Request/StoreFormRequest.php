<?php

declare(strict_types=1);

namespace App\Forms\Request;

use Domain\Forms\DataTransferObjects\FormDto;
use Illuminate\Foundation\Http\FormRequest;

class StoreFormRequest extends FormRequest
{
    public const NAME = 'name';
    public const WELCOME_TEXT = 'welcome_text';
    public const DESCRIPTION = 'description';
    public const CREATION_DATE_TIME = 'creation_date_time';
    public const LAST_MODIFIED_DATE_TIME = 'last_modified_date_time';
    public const LOGO = 'logo';
    public const PRIMARY_COLOR = 'primary_color';
    public const SECONDARY_COLOR = 'secondary_color';
    public const ROUNDED_STYLE = 'rounded_style'; 
    public const API_URL = 'api_url';
    public const IS_ACTIVE = 'is_active';
    public const IS_ANONYMOUS_USER_ANSWERS = 'is_anonymous_user_answers';
    public const IS_REQUEST_MANDATORY_INITIAL_DATA = 'is_request_mandatory_initial_data';
    public const PUBLIC_CODE = 'public_code';
    public const USER_ID = 'user_id';

    public function rules(): array
    {
        return [
            self::NAME => ['required'],
            self::WELCOME_TEXT => ['required'],
            self::CREATION_DATE_TIME => ['required'],
            self::IS_ACTIVE => ['required'],
            self::IS_ANONYMOUS_USER_ANSWERS => ['required'],
            self::IS_REQUEST_MANDATORY_INITIAL_DATA => ['required'],
            self::PUBLIC_CODE => ['required'],
            self::USER_ID => ['required'],
        ];
    }

    public function toDto(): FormDto
    {
        return new FormDto(
            name: $this->string(self::NAME)->toString(),
            welcome_text: $this->string(self::WELCOME_TEXT)->toString(),
            description: $this->string(self::DESCRIPTION)->toString(),
            creation_date_time: $this->string(self::CREATION_DATE_TIME)->toString(),
            last_modified_date_time: $this->string(self::LAST_MODIFIED_DATE_TIME)->toString(),
            logo: $this->string(self::LOGO)->toString(),
            primary_color: $this->string(self::PRIMARY_COLOR)->toString(),
            secondary_color: $this->string(self::SECONDARY_COLOR)->toString(),
            rounded_style: $this->string(self::ROUNDED_STYLE)->toString(),
            api_url: $this->string(self::API_URL)->toString(),
            is_active: $this->string(self::IS_ACTIVE)->toString(),
            is_anonymous_user_answers: $this->string(self::IS_ANONYMOUS_USER_ANSWERS)->toString(),
            is_request_mandatory_initial_data: $this->string(self::IS_REQUEST_MANDATORY_INITIAL_DATA)->toString(),
            public_code: $this->string(self::PUBLIC_CODE)->toString(),
            user_id: $this->string(self::USER_ID)->toString(),
        );
    }
}
