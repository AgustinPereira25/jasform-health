<?php

declare(strict_types=1);

namespace App\Users\Controllers;

use Illuminate\Pagination\Paginator;
use App\Users\Transformers\UserListTransformer;
use Domain\Users\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class ListUserController
{
    public function __invoke(Request $request): JsonResponse
    {
        $perPage = $request->get('perPage', 10);
        $currentPage = $request->get('currentPage', 1);
        $isActive = $request->get('isActive', "false");
        $isAdmin = $request->get('isAdmin', "false");
        $nameOrEmail = $request->get('nameOrEmail', "");
        $positionOrOrganization = $request->get('positionOrOrganization', "");

        Paginator::currentPageResolver(function () use ($currentPage) {
            return $currentPage;
        });

        $users = QueryBuilder::for(User::class)
            ->with(['organization', 'roles']);

        if ($isActive == "true") {
            $users->where('is_active', true);
        }

        if ($isAdmin == "true") {
            $users->whereHas('roles', function ($query) {
                $query->where('name', 'Admin');
            });
        }

        $users->where(function ($query) use ($nameOrEmail, $positionOrOrganization) {
            if (!empty($nameOrEmail)) {
                $query->where(function ($query) use ($nameOrEmail) {
                    $query->where('first_name', 'like', '%' . $nameOrEmail . '%')
                        ->orWhere('last_name', 'like', '%' . $nameOrEmail . '%')
                        ->orWhere('email', 'like', '%' . $nameOrEmail . '%');
                });
            }
            if (!empty($positionOrOrganization)) {
                $query->where(function ($query) use ($positionOrOrganization) {
                    $query->where('position_in_organization', 'like', '%' . $positionOrOrganization . '%')
                        ->orWhereHas('organization', function ($query) use ($positionOrOrganization) {
                            $query->where('name', 'like', '%' . $positionOrOrganization . '%');
                        });
                });
            }
        });

        // if (!empty($nameOrEmail)) {
        //     $users->where(function ($query) use ($nameOrEmail) {
        //         $query->where('first_name', 'like', '%' . $nameOrEmail . '%')
        //             ->orWhere('last_name', 'like', '%' . $nameOrEmail . '%')
        //             ->orWhere('email', 'like', '%' . $nameOrEmail . '%');
        //     });
        // }

        // if (!empty($positionOrOrganization)) {
        //     $users->where('position_in_organization', 'like', '%' . $positionOrOrganization . '%')
        //         ->orWhereHas('organization', function ($query) use ($positionOrOrganization) {
        //             $query->where('name', 'like', '%' . $positionOrOrganization . '%');
        //         });
        // }


        $users = $users->paginate($perPage);

        return responder()
            ->success($users, UserListTransformer::class)
            ->respond();
    }
}
