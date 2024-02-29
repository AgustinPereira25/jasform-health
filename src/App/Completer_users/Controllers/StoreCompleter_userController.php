<?php

namespace App\Completer_users\Controllers;

use App\Completer_users\Request\StoreCompleter_userRequest;
use App\Completer_users\Transformers\Completer_userTransformer;
use Domain\Completer_users\Actions\StoreCompleter_userAction;
use Illuminate\Http\JsonResponse;

class StoreCompleter_userController
{
    public function __invoke(
        StoreCompleter_userRequest $request,
        StoreCompleter_userAction $storeCompleter_userAction,
    ): JsonResponse {
        $completer_user = $storeCompleter_userAction->execute($request->toDto());

        return responder()
            ->success($completer_user, Completer_userTransformer::class)
            ->respond(JsonResponse::HTTP_CREATED);
    }
}
