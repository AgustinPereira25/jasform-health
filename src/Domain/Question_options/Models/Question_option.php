<?php

namespace Domain\Question_options\Models;

use Domain\Form_questions\Models\Form_question;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Domain\Question_options\Models\Question_option
 *
 * @property int                             $id
 * @property int                             $order
 * @property string                          $name
 * @property string                          $description
 * @property int                             $next_question
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int                             $form_question_id
 * @method static \Illuminate\Database\Eloquent\Builder|Question_option newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Question_option newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Question_option query()
 * @method static \Illuminate\Database\Eloquent\Builder|Question_option whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Question_option whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Question_option whereFormQuestionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Question_option whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Question_option whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Question_option whereNextQuestion($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Question_option whereOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Question_option whereUpdatedAt($value)
 * @property-read Form_question $form_question
 * @property string $title
 * @method static \Illuminate\Database\Eloquent\Builder|Question_option whereTitle($value)
 * @mixin \Eloquent
 */
class Question_option extends Model
{
    protected $fillable = [
        'order',
        'title',
        'next_question',
        'form_question_id',
    ];

    public function form_question(): BelongsTo
    {
        return $this->belongsTo(Form_question::class);
    }
}
