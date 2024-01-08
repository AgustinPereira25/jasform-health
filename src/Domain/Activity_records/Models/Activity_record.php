<?php

namespace Domain\Activity_records\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Domain\Users\Models\User;

/**
 * Domain\Activity_records\Models\Activity_record
 *
 * @property int $id
 * @property string $date_time
 * @property string $status
 * @property string $ip_address
 * @property string $activity_performed
 * @property string $description
 * @property int $session_duration
 * @property string $activity_result
 * @property string $login_type
 * @property string $device_info
 * @property string $physical_location
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $user_id
 * @method static \Illuminate\Database\Eloquent\Builder|Activity_record newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Activity_record newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Activity_record query()
 * @method static \Illuminate\Database\Eloquent\Builder|Activity_record whereActivityPerformed($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Activity_record whereActivityResult($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Activity_record whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Activity_record whereDateTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Activity_record whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Activity_record whereDeviceInfo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Activity_record whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Activity_record whereIpAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Activity_record whereLoginType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Activity_record wherePhysicalLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Activity_record whereSessionDuration($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Activity_record whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Activity_record whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Activity_record whereUserId($value)
 * @property-read User $user
 * @mixin \Eloquent
 */
class Activity_record extends Model
{

    protected $fillable = [
        'date_time',
        'status',
        'ip_address',
        'activity_performed',
        'description',
        'session_duration',
        'activity_result',
        'login_type',
        'device_info',
        'physical_location',
        'user_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
