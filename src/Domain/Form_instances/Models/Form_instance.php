<?php

namespace Domain\Form_instances\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Domain\Form_instances\Models\Form_instance
 *
 * @property int $id
 * @property string $date_time
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $form_id
 * @property int $completer_user_id
 * @method static \Illuminate\Database\Eloquent\Builder|Form_instance newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Form_instance newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Form_instance query()
 * @method static \Illuminate\Database\Eloquent\Builder|Form_instance whereCompleterUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form_instance whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form_instance whereDateTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form_instance whereFormId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form_instance whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form_instance whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Form_instance extends Model
{
    use HasFactory;
}
