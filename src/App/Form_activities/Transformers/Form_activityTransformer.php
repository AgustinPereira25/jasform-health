<?php

declare(strict_types=1);

namespace App\Form_activities\Transformers;

use Domain\Form_activities\Models\Form_activity;
use Flugg\Responder\Transformers\Transformer;
use Carbon\Carbon;

class Form_activityTransformer extends Transformer
{
    public function transform(Form_activity $form_activity): array
    {
        return [
            'id' => (int) $form_activity->id,
            'date_time' => Carbon::parse($form_activity->date_time)->format('Y-m-d H:i:s'),
            'description' => (string) $form_activity->description,
            'completed' => (string) $form_activity->completed,
            'completed_questions' => (string) $form_activity->completed_questions,
            'form_instance_id' => (int) $form_activity->form_instance_id,
        ];
    }
}
