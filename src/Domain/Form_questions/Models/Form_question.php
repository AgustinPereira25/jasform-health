<?php

namespace Domain\Form_questions\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Domain\Forms\Models\Form;
use Domain\Question_types\Models\Question_type;
use Domain\Question_options\Models\Question_option;

/**
 * Domain\Form_questions\Models\Form_question
 *
 * @property int $id
 * @property string $title
 * @property string $text
 * @property int $order
 * @property string $next_question
 * @property int $obligatory
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $form_id
 * @property int $question_type_id
 * @method static \Illuminate\Database\Eloquent\Builder|Form_question newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Form_question newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Form_question query()
 * @method static \Illuminate\Database\Eloquent\Builder|Form_question whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form_question whereFormId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form_question whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form_question whereNextQuestion($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form_question whereObligatory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form_question whereOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form_question whereQuestionTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form_question whereText($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form_question whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form_question whereUpdatedAt($value)
 * @property-read Form $form
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Question_option> $question_options
 * @property-read int|null $question_options_count
 * @property-read Question_type $question_type
 * @property int $is_obligatory
 * @method static \Illuminate\Database\Eloquent\Builder|Form_question whereIsObligatory($value)
 * @property int $is_mandatory
 * @method static \Illuminate\Database\Eloquent\Builder|Form_question whereIsMandatory($value)
 * @mixin \Eloquent
 */
class Form_question extends Model
{

    protected $fillable = [
        'title',
        'text',
        'order',
        'is_obligatory',
        'form_id',
        'question_type_id',
    ];

    public function form(): BelongsTo
    {
        return $this->belongsTo(Form::class);
    }

    public function question_type(): BelongsTo
    {
        return $this->belongsTo(Question_type::class);
    }

    public function question_options(): HasMany
    {
        return $this->hasMany(Question_option::class);
    }

    // TODO
    // public function next_questions(): HasMany
    // {
    //     return $this->hasMany(Question_option::class);
    // }

}
