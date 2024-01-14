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
            'name' => (string) $question_option->name,
            'description' => (string) $question_option->description,
            'next_question' => (int) $question_option->form_question->id,
            'form_question_id' => (int) $question_option->form_question->id,
        ];
    }
}
