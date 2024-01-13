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
            'description' => (string) $form->description,
            'creation_date' => Carbon::parse($form->creation_date)->format('Y-m-d H:i:s'),
            'logo' => (string) $form->logo,
            'primary_color' => (string) $form->primary_color,
            'secondary_color' => (string) $form->secondary_color,
            'rounded_style' => (string) $form->rounded_style,
            'api_url' => (string) $form->api_url,
            'status' => (string) $form->status,
            'public_code' => (string) $form->public_code,
            'user_id' => (int) $form->user_id,
        ];
    }
}