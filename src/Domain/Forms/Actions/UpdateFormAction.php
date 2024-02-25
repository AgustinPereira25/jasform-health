<?php

declare(strict_types=1);

namespace Domain\Forms\Actions;

use Domain\Forms\DataTransferObjects\FormDtoUpdate;
use Domain\Forms\Models\Form;
use Illuminate\Contracts\Hashing\Hasher;
use Illuminate\Support\Carbon;

class UpdateFormAction
{
    public function __construct(private readonly Hasher $hasher)
    {
    }

    public function execute(FormDtoUpdate $formDtoUpdate, Form $form): Form
    {
        $formDtoUpdate = $formDtoUpdate->withLastModifiedDateTime(Carbon::now()->toDateTimeString());

        $form->update($formDtoUpdate->toArray());

        return $form;
    }
}
