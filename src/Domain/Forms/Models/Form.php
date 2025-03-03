<?php

namespace Domain\Forms\Models;

use Domain\Form_instances\Models\Form_instance;
use Domain\Form_questions\Models\Form_question;
use Domain\Users\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Domain\Forms\Models\Form
 *
 * @property int                             $id
 * @property string                          $name
 * @property string                          $welcome_text
 * @property string                          $final_text
 * @property string                          $description
 * @property string                          $creation_date_time
 * @property mixed                           $logo
 * @property string                          $primary_color
 * @property string                          $secondary_color
 * @property string                          $rounded_style
 * @property string                          $api_url
 * @property string                          $status
 * @property string                          $public_code
 * @property string                          $html_head
 * @property string                          $html_body
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int                             $user_creator_id
 * @property int                             $user_auxiliary_editor_id
 * @method static \Illuminate\Database\Eloquent\Builder|Form newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Form newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Form query()
 * @method static \Illuminate\Database\Eloquent\Builder|Form whereApiUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form whereCreationDateTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form whereLogo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form wherePrimaryColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form wherePublicCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form whereRoundedStyle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form whereSecondaryColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form whereUserAuxiliaryEditorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form whereUserCreatorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form whereWelcomeText($value)
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Form_instance> $form_instances
 * @property-read int|null $form_instances_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Form_question> $form_questions
 * @property-read int|null $form_questions_count
 * @property int $user_id
 * @method static \Illuminate\Database\Eloquent\Builder|Form whereUserId($value)
 * @property string $last_modified_date_time
 * @property int    $is_active
 * @property int    $is_user_responses_linked
 * @property int    $is_initial_data_required
 * @method static \Illuminate\Database\Eloquent\Builder|Form whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form whereIsUserResponsesLinked($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form whereIsRequestMandatoryInitialData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form whereLastModifiedDateTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form whereFinalText($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form whereIsInitialDataRequired($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form whereHtmlBody($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form whereHtmlHead($value)
 * @property-read User $user
 * @mixin \Eloquent
 */
class Form extends Model
{
    protected $fillable = [
        'name',
        'welcome_text',
        'final_text',
        'description',
        'creation_date_time',
        'last_modified_date_time',
        'logo',
        'primary_color',
        'secondary_color',
        'rounded_style',
        'api_url',
        'html_head',
        'html_body',
        'is_active',
        'is_user_responses_linked',
        'is_initial_data_required',
        'public_code',
        'user_id',
    ];

    public function form_instances(): HasMany
    {
        return $this->hasMany(Form_instance::class);
    }

    public function form_questions(): HasMany
    {
        return $this->hasMany(Form_question::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
