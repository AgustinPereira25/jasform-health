<?php

declare(strict_types=1);

namespace Domain\Activity_records\Actions;

use Illuminate\Contracts\Hashing\Hasher;
use Domain\Activity_records\DataTransferObjects\Activity_recordDto;
use Domain\Activity_records\Models\Activity_record;

class StoreActivity_recordAction
{
    public function __construct(private readonly Hasher $hasher)
    {
    }

    public function execute(Activity_recordDto $activity_recordDto): Activity_record
    {
        return Activity_record::create([
            'date_time' => $activity_recordDto->getDateTime(),
            'ip_address' => $activity_recordDto->getIpAddress(),
            'activity_performed' => $activity_recordDto->getActivityPerformed(),
            'session_duration' => $activity_recordDto->getSessionDuration(),
            'activity_result' => $activity_recordDto->getActivityResult(),
            'login_type' => $activity_recordDto->getLoginType(),
            'device_info' => $activity_recordDto->getDeviceInfo(),
            'user_id' => $activity_recordDto->getUserId(),
        ]);
    }
}
