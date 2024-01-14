<?php

declare(strict_types=1);

namespace App\Form_instances\Transformers;

use Domain\Form_instances\Models\Form_instance;
use Flugg\Responder\Transformers\Transformer;
use Carbon\Carbon;

class Form_instanceTransformer extends Transformer
{
    public function transform(Form_instance $form_instance): array
    {
        return [
            'id' => (int) $form_instance->id,
            'date_time' => Carbon::parse($form_instance->date_time)->format('Y-m-d H:i:s'),
            'form_id' => (int) $form_instance->form_id,
            'completer_user_id' => (int) $form_instance->completer_user_id,
        ];
    }
}