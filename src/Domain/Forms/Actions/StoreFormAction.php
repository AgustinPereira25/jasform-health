<?php

declare(strict_types=1);

namespace Domain\Forms\Actions;

use Domain\Forms\DataTransferObjects\FormDto;
use Domain\Forms\Models\Form;
use Illuminate\Contracts\Hashing\Hasher;

class StoreFormAction
{
    public function __construct(private readonly Hasher $hasher)
    {
    }

    public function execute(FormDto $formDto): Form
    {
        return Form::create([
            'name' => $formDto->getName(),
            'welcome_text' => $formDto->getWelcomeText(),
            'description' => $formDto->getDescription(),
            'creation_date_time' => $formDto->getCreationDateTime(),
            'logo' => $formDto->getLogo(),
            'primary_color' => $formDto->getPrimaryColor(),
            'secondary_color' => $formDto->getSecondaryColor(),
            'rounded_style' => $formDto->getRoundedStyle(),
            'api_url' => $formDto->getApiUrl(),
            'status' => $formDto->getStatus(),
            'public_code' => $formDto->getPublicCode(),
            'user_id' => $formDto->getUserId(),
        ]);
    }
}
