<?php

namespace Domain\Completed_questions\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Domain\Form_instances\Models\Form_instance;
use Domain\Question_types\Models\Question_type;

/**
 * Domain\Completed_questions\Models\Completed_question
 *
 * @property int $id
 * @property string $title
 * @property string $answer
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $form_instance_id
 * @property int $question_type_id
 * @method static \Illuminate\Database\Eloquent\Builder|Completed_question newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Completed_question newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Completed_question query()
 * @method static \Illuminate\Database\Eloquent\Builder|Completed_question whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Completed_question whereFormInstanceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Completed_question whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Completed_question whereQuestionTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Completed_question whereAnswer($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Completed_question whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Completed_question whereUpdatedAt($value)
 * @property-read Form_instance $form_instance
 * @property-read Question_type $question_type
 * @mixin \Eloquent
 */

class Completed_question extends Model
{
    protected $fillable = [
        'title',
        'answer',
        'form_instance_id',
        'question_type_id',
    ];

    public function form_instance(): BelongsTo
    {
        return $this->belongsTo(Form_instance::class);
    }

    public function question_type(): BelongsTo
    {
        return $this->belongsTo(Question_type::class);
    }
}
