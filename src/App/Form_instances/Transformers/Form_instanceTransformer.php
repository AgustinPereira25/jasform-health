<?php

declare(strict_types=1);

namespace App\Form_instances\Transformers;

use Domain\Form_instances\Models\Form_instance;
use Flugg\Responder\Transformers\Transformer;
use App\Completed_questions\Transformers\Completed_questionTransformer;
use Carbon\Carbon;

class Form_instanceTransformer extends Transformer
{
    protected $completedQuestionTransformer;

    public function __construct(Completed_questionTransformer $completedQuestionTransformer)
    {
        $this->completedQuestionTransformer = $completedQuestionTransformer;
    }

    public function transform(Form_instance $form_instance): array
    {
        $completedQuestions = $form_instance->completed_questions->map(function ($question) {
            return $this->completedQuestionTransformer->transform($question);
        });

        return [
            'id' => (int) $form_instance->id,
            'initial_date_time' => Carbon::parse($form_instance->initial_date_time)->format('Y-m-d H:i:s'),
            'final_date_time' => Carbon::parse($form_instance->final_date_time)->format('Y-m-d H:i:s'),
            'form_id' => (int) $form_instance->form_id,
            'completer_user_id' => $form_instance->completer_user ? $form_instance->completer_user->id : null,
            'completer_user_first_name' => $form_instance->completer_user ? $form_instance->completer_user->first_name : null,
            'completer_user_last_name' => $form_instance->completer_user ? $form_instance->completer_user->last_name : null,
            'completer_user_email' => $form_instance->completer_user ? $form_instance->completer_user->email : null,
            'completer_user_code' => $form_instance->completer_user ? $form_instance->completer_user->code : null, 'completed_questions_count' => (int) $form_instance->completed_questions_count,
            'completed_questions' => $completedQuestions,
        ];
    }
}
