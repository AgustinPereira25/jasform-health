<?php

namespace App\Organizations\Controllers;

use Domain\Organizations\Models\Organization;
use Illuminate\Http\JsonResponse;

class DeleteOrganizationController
{
    public function __invoke(Organization $organization): JsonResponse
    {
        $organization->delete();

        return responder()
            ->success()
            ->respond();
    }
}
