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
        private readonly string $logo,
        private readonly string $primary_color,
        private readonly string $secondary_color,
        private readonly string $rounded_style,
        private readonly string $api_url,
        private readonly string $status,
        private readonly string $public_code,
        private readonly string $user_creator_id,
        private readonly string $user_auxiliary_editor_id,
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

    public function getStatus(): string
    {
        return $this->status;
    }
    
    public function getPublicCode(): string
    {
        return $this->public_code;
    }

    public function getUserCreatorId(): string
    {
        return $this->user_creator_id;
    }

    public function getAuxiliaryEditorId(): string
    {
        return $this->user_auxiliary_editor_id;
    }
}
