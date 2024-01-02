<?php

namespace Domain\Completer_users\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Domain\Completer_users\Models\Completer_user
 *
 * @property int $id
 * @property string $email
 * @property string $first_name
 * @property string $last_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Completer_user newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Completer_user newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Completer_user query()
 * @method static \Illuminate\Database\Eloquent\Builder|Completer_user whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Completer_user whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Completer_user whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Completer_user whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Completer_user whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Completer_user whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Completer_user extends Model
{
    use HasFactory;
}
