<?php

declare(strict_types=1);

namespace Domain\Form_activities\Actions;

use Domain\Form_activities\DataTransferObjects\Form_activityDto;
use Domain\Form_activities\Models\Form_activity;
use Illuminate\Contracts\Hashing\Hasher;

class StoreForm_activityAction
{
    public function __construct(private readonly Hasher $hasher)
    {
    }

    public function execute(Form_activityDto $form_activityDto): Form_activity
    {
        return Form_activity::create([
            'date_time' => $form_activityDto->getDateTime(),
            'description' => $form_activityDto->getDescription(),
            'completed' => $form_activityDto->getCompleted(),
            'completed_questions' => $form_activityDto->getCompletedQuestions(),
            'form_instance_id' => $form_activityDto->getFormInstanceId(),
        ]);
    }
}
