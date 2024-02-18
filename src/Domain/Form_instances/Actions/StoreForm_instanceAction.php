<?php

declare(strict_types=1);

namespace Domain\Form_instances\Actions;

use Domain\Form_instances\DataTransferObjects\Form_instanceDto;
use Domain\Form_instances\Models\Form_instance;
use Illuminate\Contracts\Hashing\Hasher;

class StoreForm_instanceAction
{
    public function __construct(private readonly Hasher $hasher)
    {
    }

    public function execute(Form_instanceDto $form_instanceDto): Form_instance
    {
        return Form_instance::create([
            'initial_date_time' => $form_instanceDto->getInitialDateTime(),
            'final_date_time' => $form_instanceDto->getFinalDateTime(),
            'form_id' => $form_instanceDto->getFormId(),
            'completer_user_id' => $form_instanceDto->getCompleterUserId(),
        ]);
    }
}
