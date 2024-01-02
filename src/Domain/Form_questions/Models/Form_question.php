<?php

namespace Domain\Form_questions\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
 * @mixin \Eloquent
 */
class Form_question extends Model
{
    use HasFactory;
}
