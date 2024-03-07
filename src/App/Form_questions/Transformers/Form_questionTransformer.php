<?php

declare(strict_types=1);

namespace App\Form_questions\Transformers;

use Domain\Form_questions\Models\Form_question;
use Flugg\Responder\Transformers\Transformer;

class Form_questionTransformer extends Transformer
{
    public function transform(Form_question $form_question): array
    {
        return [
            'id' => (int) $form_question->id,
            'title' => (string) $form_question->title,
            'text' => (string) $form_question->text,
            'order' => (int) $form_question->order,
            'is_mandatory' => (bool) $form_question->is_mandatory,
            'mapping_key' => (string) $form_question->mapping_key,
            'form_id' => (int) $form_question->form_id,
            'question_type_id' => (int) $form_question->question_type_id,
            'question_type_name' => $form_question->question_type->name,
        ];
    }
}
