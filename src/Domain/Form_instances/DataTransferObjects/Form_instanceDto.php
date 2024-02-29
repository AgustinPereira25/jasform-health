<?php

declare(strict_types=1);

namespace Domain\Form_instances\DataTransferObjects;

class Form_instanceDto
{
    public function __construct(
        private readonly string $initial_date_time,
        private readonly string $final_date_time,
        private readonly string $api_response,
        private readonly int $form_id,
        private readonly int|null $completer_user_id,
    ) {
    }

    public function getInitialDateTime(): string
    {
        return $this->initial_date_time;
    }

    public function getFinalDateTime(): string
    {
        return $this->final_date_time;
    }

    public function getApiResponse(): string
    {
        return $this->api_response;
    }

    public function getFormId(): int
    {
        return $this->form_id;
    }

    public function getCompleterUserId(): int|null
    {
        return $this->completer_user_id;
    }
}
