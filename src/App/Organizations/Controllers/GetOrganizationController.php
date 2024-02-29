<?php

namespace App\Organizations\Controllers;

use App\Organizations\Transformers\OrganizationTransformer;
use Domain\Organizations\Models\Organization;
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
