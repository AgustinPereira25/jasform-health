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
            'title' => (string) $form_question->first_name,
            'text' => (string) $form_question->last_name,
            'order' => (string) $form_question->photo,
            'obligatory' => (string) $form_question->phone,
            'form_id' => (string) $form_question->form->id,
            'question_type_id' => (string) $form_question->question_type->id,
        ];
    }
}
