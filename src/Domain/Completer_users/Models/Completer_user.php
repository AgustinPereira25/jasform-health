<?php

namespace Domain\Completer_users\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Domain\Form_instances\Models\Form_instance;

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
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Form_instance> $form_instances
 * @property-read int|null $form_instances_count
 * @property string $code
 * @method static \Illuminate\Database\Eloquent\Builder|Completer_user whereCode($value)
 * @property-read Form_instance|null $form_instance
 * @mixin \Eloquent
 */
class Completer_user extends Model
{
    protected $fillable = [
        'email',
        'first_name',
        'last_name',
        'code',
    ];

    public function form_instance(): HasOne
    {
        return $this->hasOne(Form_instance::class);
    }
}
