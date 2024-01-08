<?php

declare(strict_types=1);

namespace Domain\Form_instances\DataTransferObjects;

class Form_instanceDto
{
    public function __construct(
        private readonly string $date_time,
        private readonly string $form_id,
        private readonly string $completer_user_id,
    ) {
    }

    public function getDateTime(): string
    {
        return $this->date_time;
    }

    public function getFormId(): string
    {
        return $this->form_id;
    }

    public function getCompleterUserId(): string
    {
        return $this->completer_user_id;
    }
}
