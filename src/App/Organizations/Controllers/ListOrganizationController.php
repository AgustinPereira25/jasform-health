<?php

// namespace App\Http\Controllers;
namespace App\Organizations\Controllers;

use App\Organizations\Transformers\OrganizationTransformer;
use Domain\Organizations\Models\Organization;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Pagination\Paginator;

class ListOrganizationController
{
    public function __invoke(Request $request): JsonResponse
    {
        $perPage = $request->get('perPage', 10);
        $currentPage = $request->get('currentPage', 1);

        Paginator::currentPageResolver(function () use ($currentPage) {
            return $currentPage;
        });

        $organizations = QueryBuilder::for(Organization::class)
            ->paginate($perPage);

        return responder()
            ->success($organizations, OrganizationTransformer::class)
            ->respond();
    }
}
