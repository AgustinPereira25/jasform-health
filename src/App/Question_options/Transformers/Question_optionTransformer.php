<?php

declare(strict_types=1);

namespace App\Question_options\Transformers;

use Domain\Question_options\Models\Question_option;
use Flugg\Responder\Transformers\Transformer;

class Question_optionTransformer extends Transformer
{
    public function transform(Question_option $question_option): array
    {
        return [
            'id' => (int) $question_option->id,
            'order' => (int) $question_option->order,
            'title' => (string) $question_option->title,
            'next_question' => $question_option->next_question !== null ? (int) $question_option->next_question : null,
            'form_question_id' => (int) $question_option->form_question_id,
        ];
    }
}
