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
            'final_text' => $formDto->getFinalText(),
            'description' => $formDto->getDescription(),
            'creation_date_time' => $formDto->getCreationDateTime(),
            'last_modified_date_time' => $formDto->getLastModifiedDateTime(),
            'logo' => $formDto->getLogo(),
            'primary_color' => $formDto->getPrimaryColor(),
            'secondary_color' => $formDto->getSecondaryColor(),
            'rounded_style' => $formDto->getRoundedStyle(),
            'api_url' => $formDto->getApiUrl(),
            'html_head' => $formDto->getHtmlHead(),
            'html_body' => $formDto->getHtmlBody(),
            'is_active' => $formDto->getIsActive(),
            'is_user_responses_linked' => $formDto->getIsUserResponsesLinked(),
            'is_initial_data_required' => $formDto->getIsInitialDataRequired(),
            'public_code' => $formDto->getPublicCode(),
            'user_id' => $formDto->getUserId(),
        ]);
    }
}
