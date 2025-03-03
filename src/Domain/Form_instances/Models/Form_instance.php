<?php

namespace Domain\Form_instances\Models;

use Domain\Completed_questions\Models\Completed_question;
use Domain\Completer_users\Models\Completer_user;
use Domain\Forms\Models\Form;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Domain\Form_instances\Models\Form_instance
 *
 * @property int                             $id
 * @property string                          $date_time
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int                             $form_id
 * @property int                             $completer_user_id
 * @property string                          $api_response
 * @method static \Illuminate\Database\Eloquent\Builder|Form_instance newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Form_instance newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Form_instance query()
 * @method static \Illuminate\Database\Eloquent\Builder|Form_instance whereCompleterUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form_instance whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form_instance whereDateTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form_instance whereFormId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form_instance whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form_instance whereUpdatedAt($value)
 * @property-read Completer_user $completer_user
 * @property-read Form $form
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Completed_question> $completed_questions
 * @property-read int|null $completed_questions_count
 * @property string $initial_date_time
 * @property string $final_date_time
 * @method static \Illuminate\Database\Eloquent\Builder|Form_instance whereCompletedQuestions($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form_instance whereFinalDateTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form_instance whereInitialDateTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form_instance whereIsCompleted($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form_instance whereApiResponse($value)
 * @mixin \Eloquent
 */
class Form_instance extends Model
{
    protected $fillable = [
        'initial_date_time',
        'final_date_time',
        'form_id',
        'completer_user_id',
        'api_response',
    ];

    public function form(): BelongsTo
    {
        return $this->belongsTo(Form::class);
    }

    public function completer_user(): BelongsTo
    {
        return $this->belongsTo(Completer_user::class);
    }

    public function completed_questions(): HasMany
    {
        return $this->hasMany(Completed_question::class);
    }
}
