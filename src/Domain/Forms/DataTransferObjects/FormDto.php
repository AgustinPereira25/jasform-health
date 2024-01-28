<?php

declare(strict_types=1);

namespace Domain\Forms\DataTransferObjects;

class FormDto
{
    public function __construct(
        private readonly string $name,
        private readonly string $welcome_text,
        private readonly string $description,
        private readonly string $creation_date_time,
        private readonly string $last_modified_date_time,
        private readonly string $logo,
        private readonly string $primary_color,
        private readonly string $secondary_color,
        private readonly string $rounded_style,
        private readonly string $api_url,
        private readonly string $is_active,
        private readonly string $is_anonymous_user_answers,
        private readonly string $is_request_mandatory_initial_data,
        private readonly string $public_code,
        private readonly string $user_id,
    ) {
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getWelcomeText(): string
    {
        return $this->welcome_text;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function getCreationDateTime(): string
    {
        return $this->creation_date_time;
    }

    public function getLastModifiedDateTime(): string
    {
        return $this->last_modified_date_time;
    }

    public function getLogo(): string
    {
        return $this->logo;
    }

    public function getPrimaryColor(): string
    {
        return $this->primary_color;
    }

    public function getSecondaryColor(): string
    {
        return $this->secondary_color;
    }

    public function getRoundedStyle(): string
    {
        return $this->rounded_style;
    }

    public function getApiUrl(): string
    {
        return $this->api_url;
    }

    public function getIsActive(): string
    {
        return $this->is_active;
    }
    
    public function getIsAnonymousUserAnswers(): string
    {
        return $this->is_anonymous_user_answers;
    }
    public function getIsRequestMandatoryInitialData(): string
    {
        return $this->is_request_mandatory_initial_data;
    }

    public function getPublicCode(): string
    {
        return $this->public_code;
    }

    public function getUserId(): string
    {
        return $this->user_id;
    }
}
