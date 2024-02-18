<?php

declare(strict_types=1);

namespace App\Forms\Transformers;

use Domain\Forms\Models\Form;
use Flugg\Responder\Transformers\Transformer;
use Carbon\Carbon;

class FormTransformer extends Transformer
{
    public function transform(Form $form): array
    {
        return [
            'id' => (int) $form->id,
            'name' => (string) $form->name,
            'welcome_text' => (string) $form->welcome_text,
            'final_text' => (string) $form->final_text,
            'description' => (string) $form->description,
            'creation_date_time' => Carbon::parse($form->creation_date_time)->format('Y-m-d H:i:s'),
            'last_modified_date_time' => Carbon::parse($form->last_modified_date_time)->format('Y-m-d H:i:s'),
            'logo' => (string) $form->logo,
            'primary_color' => (string) $form->primary_color,
            'secondary_color' => (string) $form->secondary_color,
            'rounded_style' => (string) $form->rounded_style,
            'api_url' => (string) $form->api_url,
            'is_active' => (bool) $form->is_active,
            'is_anonymous_user_answers' => (bool) $form->is_anonymous_user_answers,
            'is_request_mandatory_initial_data' => (bool) $form->is_request_mandatory_initial_data,
            'public_code' => (string) $form->public_code,
            'user_id' => (int) $form->user_id,
            'form_instances_count' => (int) $form->form_instances_count,
            'form_questions_count' => (int) $form->form_questions_count,
        ];
    }
}
