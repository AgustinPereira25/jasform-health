<?php

namespace Domain\Question_types\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
 * @mixin \Eloquent
 */
class Question_type extends Model
{
    use HasFactory;
}
