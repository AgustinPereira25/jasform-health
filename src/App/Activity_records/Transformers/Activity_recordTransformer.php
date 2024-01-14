<?php

declare(strict_types=1);

namespace App\Activity_records\Transformers;

use Domain\Activity_records\Models\Activity_record;
use Flugg\Responder\Transformers\Transformer;
use Carbon\Carbon;

class Activity_recordTransformer extends Transformer
{
    public function transform(Activity_record $activity_record): array
    {
        return [
            'id' => (int) $activity_record->id,
            'date_time' => Carbon::parse($activity_record->date_time)->format('Y-m-d H:i:s'),
            'status' => (string) $activity_record->status,
            'ip_address' => (string) $activity_record->ip_address,
            'activity_performed' => (string) $activity_record->activity_performed,
            'description' => (string) $activity_record->description,
            'session_duration' => (string) $activity_record->session_duration,
            'activity_result' => (string) $activity_record->activity_result,
            'login_type' => (string) $activity_record->login_type,
            'device_info' => (string) $activity_record->device_info,
            'physical_location' => (string) $activity_record->physical_location,
            'user_id' => (int) $activity_record->user->id,
        ];
    }
}