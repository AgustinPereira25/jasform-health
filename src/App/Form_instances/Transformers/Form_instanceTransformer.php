<?php

declare(strict_types=1);

namespace App\Form_instances\Transformers;

use Domain\Form_instances\Models\Form_instance;
use Flugg\Responder\Transformers\Transformer;

class Form_instanceTransformer extends Transformer
{
    public function transform(Form_instance $form_instance): array
    {
        return [
            'id' => (int) $form_instance->id,
            'date_time' => (string) $form_instance->date_time,
            'last_name' => (string) $form_instance->form_id,
            'photo' => (string) $form_instance->completer_user_id,
        ];
    }
}
