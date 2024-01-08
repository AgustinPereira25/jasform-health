<?php

namespace Domain\Question_types\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Domain\Form_questions\Models\Form_question;

/**
 * Domain\Question_types\Models\Question_type
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Question_type newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Question_type newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Question_type query()
 * @method static \Illuminate\Database\Eloquent\Builder|Question_type whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Question_type whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Question_type whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Question_type whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Question_type whereUpdatedAt($value)
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Form_question> $form_questions
 * @property-read int|null $form_questions_count
 * @mixin \Eloquent
 */
class Question_type extends Model
{
    protected $fillable = [
        'name',
        'description',
    ];

    public function form_questions(): HasMany
    {
        return $this->hasMany(Form_question::class);
    }
}
