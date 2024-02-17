<?php

declare(strict_types=1);

namespace App\Completed_questions\Transformers;

use Domain\Completed_questions\Models\Completed_question;
use Flugg\Responder\Transformers\Transformer;

class Completed_questionTransformer extends Transformer
{
    public function transform(Completed_question $completed_question): array
    {
        return [
            'id' => (int) $completed_question->id,
            'title' => (string) $completed_question->title,
            'answer' => (string) $completed_question->answer,
            'form_instance_id' => (int) $completed_question->form_instance_id,
            'question_type_id' => (int) $completed_question->question_type_id,
            'question_type_name' => $completed_question->question_type->name,
        ];
    }
}
