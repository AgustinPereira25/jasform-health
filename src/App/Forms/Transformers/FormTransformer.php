<?php

declare(strict_types=1);

namespace App\Forms\Transformers;

use App\Form_questions\Transformers\Form_questionTransformer;
use App\Question_options\Transformers\Question_optionTransformer;
use Carbon\Carbon;
use Domain\Forms\Models\Form;
use Flugg\Responder\Transformers\Transformer;

class FormTransformer extends Transformer
{
    public function transform(Form $form): array
    {
        $formQuestionTransformer = new Form_questionTransformer();
        $questionOptionTransformer = new Question_optionTransformer();

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
            'html_head' => (string) $form->html_head,
            'html_body' => (string) $form->html_body,
            'is_active' => (bool) $form->is_active,
            'is_user_responses_linked' => (bool) $form->is_user_responses_linked,
            'is_initial_data_required' => (bool) $form->is_initial_data_required,
            'public_code' => (string) $form->public_code,
            'user_id' => (int) $form->user_id,
            'user_name' => $form->user ? (string) ($form->user->first_name . " " . $form->user->last_name) : null,
            'user_email' => $form->user ? (string) $form->user->email : null,
            'form_instances_count' => $form->form_instances()->count(),
            'form_questions_count' => $form->form_questions()->count(),
            'form_questions' => $form->form_questions->transform(
                function ($formQuestion) use ($formQuestionTransformer, $questionOptionTransformer) {
                    $formQuestionData = $formQuestionTransformer->transform($formQuestion);
                    $formQuestionData['question_options'] = $formQuestion->question_options->transform(
                        function ($questionOption) use ($questionOptionTransformer) {
                            return $questionOptionTransformer->transform($questionOption);
                        }
                    );

                    return $formQuestionData;
                }
            ),
        ];
    }
}
