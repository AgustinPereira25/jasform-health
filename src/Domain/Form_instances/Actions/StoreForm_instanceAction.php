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
            'date_time' => $userDto->getDateTime(),
            'form_id' => $userDto->getFormId(),
            'completer_user_id' => $userDto->getCompleterUserId(),
        ]);
    }
}
