<?php

declare(strict_types=1);

namespace App\Question_types\Transformers;

use Domain\Question_types\Models\Question_type;
use Flugg\Responder\Transformers\Transformer;

class Question_typeTransformer extends Transformer
{
    public function transform(Question_type $question_type): array
    {
        return [
            'id' => (int) $question_type->id,
            'name' => (string) $question_type->name,
            'description' => (string) $question_type->description,
        ];
    }
}
