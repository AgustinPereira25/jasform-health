<?php

declare(strict_types=1);

namespace Domain\Users\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Domain\Activity_records\Models\Activity_record;
use Domain\Forms\Models\Form;
use Domain\Organizations\Models\Organization;
use Domain\Roles\Models\Role;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * Domain\Users\Models\User
 *
 * @property int                             $id
 * @property string                          $name
 * @property string                          $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property mixed                           $password
 * @property string|null                     $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Laravel\Sanctum\PersonalAccessToken> $tokens
 * @property-read int|null $tokens_count
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 * @property string $first_name
 * @property string $last_name
 * @property mixed  $photo
 * @property string $position_in_org
 * @property string $status
 * @property int    $organization_id
 * @property int    $role_id
 * @method static \Illuminate\Database\Eloquent\Builder|User whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereOrganizationId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRoleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePhoto($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePositionInOrganization($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereStatus($value)
 * @property-read Organization $organization
 * @property-read Role $role
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Activity_record> $activity_records
 * @property-read int|null $activity_records_count
 * @property int $is_active
 * @method static \Illuminate\Database\Eloquent\Builder|User whereIsActive($value)
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Form> $forms
 * @property-read int|null $forms_count
 * @property string|null $phone
 * @property int $is_two_factor_email_active
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRoleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePositionInOrg($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereIsTwoFactorEmailActive($value)
 * @mixin \Eloquent
 */
class User extends Authenticatable
{
    use HasApiTokens;
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'photo',
        'position_in_org',
        'is_active',
        'email',
        'password',
        'organization_id',
        'role_id',
        'is_two_factor_email_active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        // 'is_two_factor_email_active' => 'boolean',
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    public function forms()
    {
        return $this->hasMany(Form::class, 'user_id');
    }

    public function activity_records(): HasMany
    {
        return $this->hasMany(Activity_record::class);
    }

    // public function assignRole(int $roleId)
    // {
    //     $this->role_id = $roleId;
    //     $this->save();
    // }

    // public function removeRole()
    // {
    //     $this->role_id = null;
    //     $this->save();
    // }

    // public function assignOrganization(int $organizationId)
    // {
    //     $this->organization_id = $organizationId;
    //     $this->save();
    // }

    // public function removeOrganization()
    // {
    //     $this->organization_id = null;
    //     $this->save();
    // }
}
