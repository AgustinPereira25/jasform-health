<?php

namespace Domain\Form_activities\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
    use HasFactory;
}
