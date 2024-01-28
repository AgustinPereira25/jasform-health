<?php

namespace App\Organizations\Controllers;

use App\Organizations\Request\StoreOrganizationRequest;
use App\Organizations\Transformers\OrganizationTransformer;
use Domain\Organizations\Actions\StoreOrganizationAction;
use Illuminate\Http\JsonResponse;

class StoreOrganizationController
{
    public function __invoke(StoreOrganizationRequest $request, StoreOrganizationAction $storeOrganizationAction): JsonResponse
    {
        $organization = $storeOrganizationAction->execute($request->toDto());

        return responder()
            ->success($organization, OrganizationTransformer::class)
            ->respond(JsonResponse::HTTP_CREATED);
    }
}

