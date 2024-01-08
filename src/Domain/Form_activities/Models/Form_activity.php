<?php

namespace Domain\Form_activities\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Domain\Form_instances\Models\Form_instance;

/**
 * Domain\Form_activities\Models\Form_activity
 *
 * @property int $id
 * @property string $date_time
 * @property string $description
 * @property int $completed
 * @property string $completed_questions
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $form_instance_id
 * @method static \Illuminate\Database\Eloquent\Builder|Form_activity newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Form_activity newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Form_activity query()
 * @method static \Illuminate\Database\Eloquent\Builder|Form_activity whereCompleted($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form_activity whereCompletedQuestions($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form_activity whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form_activity whereDateTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form_activity whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form_activity whereFormInstanceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form_activity whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form_activity whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Form_activity extends Model
{

    protected $fillable = [
        'date_time',
        'description',
        'completed',
        'completed_question',
        'form_instance_id',
    ];

    public function form_instance(): BelongsTo
    {
        return $this->belongsTo(Form_instance::class);
    }
}
