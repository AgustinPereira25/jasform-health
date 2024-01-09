<?php

declare(strict_types=1);

namespace App\Activity_records\Request;

use Domain\Activity_records\DataTransferObjects\Activity_recordDto;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreActivity_recordRequest extends FormRequest
{
    public const DATE_TIME = 'date_time';
    public const STATUS = 'status';
    public const IP_ADDRESS = 'ip_address';
    public const ACTIVITY_PERFORMED = 'activity_performed';
    public const DESCRIPTION = 'description';
    public const SESSION_DURATION = 'session_duration';
    public const ACTIVITY_RESULT = 'activity_result';
    public const LOGIN_TYPE = 'login_type'; 
    public const DEVICE_INFO = 'device_info';
    public const PHYSICAL_LOCATION = 'physical_location';
    public const USER_ID = 'user_id';

    public function rules(): array
    {
        return [
            self::DATE_TIME => ['required'],
            self::STATUS => ['required'],
            self::IP_ADDRESS => ['required'],
            self::ACTIVITY_PERFORMED => ['required'],
            self::SESSION_DURATION => ['required'],
            self::ACTIVITY_RESULT => ['required'],
            self::LOGIN_TYPE => ['required'],
            self::USER_ID => ['required'],
        ];
    }

    public function toDto(): Activity_recordDto
    {
        return new Activity_recordDto(
            date_time: $this->string(self::DATE_TIME)->toString(),
            status: $this->string(self::STATUS)->toString(),
            ip_address: $this->string(self::IP_ADDRESS)->toString(),
            activity_performed: $this->string(self::ACTIVITY_PERFORMED)->toString(),
            description: $this->string(self::DESCRIPTION)->toString(),
            session_duration: $this->string(self::SESSION_DURATION)->toString(),
            activity_result: $this->string(self::ACTIVITY_RESULT)->toString(),
            login_type: $this->string(self::LOGIN_TYPE)->toString(),
            device_info: $this->string(self::DEVICE_INFO)->toString(),
            physical_location: $this->string(self::PHYSICAL_LOCATION)->toString(),
            user_id: $this->string(self::USER_ID)->toString(),
        );
    }
}
