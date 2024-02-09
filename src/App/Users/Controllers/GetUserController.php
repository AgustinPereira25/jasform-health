<?php

declare(strict_types=1);

namespace App\Users\Controllers;

use App\Users\Transformers\UserDetailTransformer;
use Domain\Users\Models\User;
use Illuminate\Http\JsonResponse;

class GetUserController
{
    public function __invoke(User $user): JsonResponse
    {
        sleep(1);
        return responder()
            ->success($user, UserDetailTransformer::class)
            ->respond();
    }
}
