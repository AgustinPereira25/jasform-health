<?php

declare(strict_types=1);

namespace Domain\Forms\DataTransferObjects;

class FormDtoUpdate
{
    public function __construct(
        private readonly string $id,
        private readonly string $name,
        private readonly string $welcome_text,
        private readonly string $final_text,
        private readonly string $description,
        private string $creation_date_time,
        private string $last_modified_date_time,
        private readonly string $logo,
        private readonly string $primary_color,
        private readonly string $secondary_color,
        private readonly string $rounded_style,
        private readonly string $api_url,
        private readonly string $is_active,
        private readonly string $is_user_responses_linked,
        private readonly string $is_initial_data_required,
        private string $public_code,
        private readonly string $user_id,
    ) {
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->getName(),
            'welcome_text' => $this->getWelcomeText(),
            'final_text' => $this->getFinalText(),
            'description' => $this->getDescription(),
            'creation_date_time' => $this->getCreationDateTime(),
            'last_modified_date_time' => $this->getLastModifiedDateTime(),
            'logo' => $this->getLogo(),
            'primary_color' => $this->getPrimaryColor(),
            'secondary_color' => $this->getSecondaryColor(),
            'rounded_style' => $this->getRoundedStyle(),
            'api_url' => $this->getApiUrl(),
            'is_active' => $this->getIsActive(),
            'is_user_responses_linked' => $this->getIsUserResponsesLinked(),
            'is_initial_data_required' => $this->getIsInitialDataRequired(),
            // 'public_code' => $this->getPublicCode(),
            // 'user_id' => $this->getUserId(),
        ];
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getWelcomeText(): string
    {
        return $this->welcome_text;
    }

    public function getFinalText(): string
    {
        return $this->final_text;
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

    public function getIsUserResponsesLinked(): string
    {
        return $this->is_user_responses_linked;
    }

    public function getIsInitialDataRequired(): string
    {
        return $this->is_initial_data_required;
    }

    public function getPublicCode(): string
    {
        return $this->public_code;
    }

    public function getUserId(): string
    {
        return $this->user_id;
    }

    public function withPublicCode(string $publicCode): self
    {
        $clone = clone $this;
        $clone->public_code = $publicCode;
        return $clone;
    }

    public function withCreationDateTime(string $creationDateTime): self
    {
        $clone = clone $this;
        $clone->creation_date_time = $creationDateTime;
        return $clone;
    }

    public function withLastModifiedDateTime(string $lastModifiedDateTime): self
    {
        $clone = clone $this;
        $clone->last_modified_date_time = $lastModifiedDateTime;
        return $clone;
    }
}
