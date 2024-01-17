<?php

namespace App\Organizations\Controllers;

use Domain\Organizations\Models\Organization;
use App\Organizations\Transformers\OrganizationTransformer;
use Illuminate\Http\JsonResponse;

class GetOrganizationController
{
    public function __invoke(Organization $organization): JsonResponse
    {
        return responder()
            ->success($organization, OrganizationTransformer::class)
            ->respond();
    }
}
