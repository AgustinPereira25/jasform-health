<?php

declare(strict_types=1);

namespace Domain\Activity_records\DataTransferObjects;

class Activity_recordDto
{
    public function __construct(
        private readonly string $date_time,
        private readonly string $status,
        private readonly string $ip_address,
        private readonly string $activity_performed,
        private readonly string $description,
        private readonly string $session_duration,
        private readonly string $activity_result,
        private readonly string $login_type,
        private readonly string $device_info,
        private readonly string $physical_location,
        private readonly string $user_id,
    ) {
    }

    public function getDateTime(): string
    {
        return $this->date_time;
    }

    public function getStatus(): string
    {
        return $this->status;
    }

    public function getIpAddress(): string
    {
        return $this->ip_address;
    }

    public function getActivityPerformed(): string
    {
        return $this->activity_performed;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function getSessionDuration(): string
    {
        return $this->session_duration;
    }

    public function getActivityResult(): string
    {
        return $this->activity_result;
    }

    public function getLoginType(): string
    {
        return $this->login_type;
    }

    public function getDeviceInfo(): string
    {
        return $this->device_info;
    }

    public function getPhysicalLocation(): string
    {
        return $this->physical_location;
    }

    public function getUserId(): string
    {
        return $this->user_id;
    }
}
