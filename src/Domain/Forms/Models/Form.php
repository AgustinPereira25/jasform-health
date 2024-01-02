<?php

namespace Domain\Forms\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Domain\Forms\Models\Form
 *
 * @property int $id
 * @property string $name
 * @property string $welcome_text
 * @property string $description
 * @property string $creation_date_time
 * @property mixed $logo
 * @property string $primary_color
 * @property string $secondary_color
 * @property string $rounded_style
 * @property string $api_url
 * @property string $status
 * @property string $public_code
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $user_creator_id
 * @property int $user_auxiliary_editor_id
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
 * @mixin \Eloquent
 */
class Form extends Model
{
    use HasFactory;
}
