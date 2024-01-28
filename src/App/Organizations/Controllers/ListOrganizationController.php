<?php

// namespace App\Http\Controllers;
namespace App\Organizations\Controllers;

use Illuminate\Http\Request;
use Domain\Organizations\Models\Organization;
use App\Organizations\Transformers\OrganizationTransformer;
use Illuminate\Http\JsonResponse;
use Spatie\QueryBuilder\QueryBuilder;

class ListOrganizationController
{
    public function __invoke(Request $request): JsonResponse
    {
        $organizations = QueryBuilder::for(Organization::class)
            ->get();

        return responder()
            ->success($organizations, OrganizationTransformer::class)
            ->respond();
    }
}
