<?php

declare(strict_types=1);

namespace App\Users\Controllers;

use App\Users\Transformers\UserListTransformer;
use Domain\Users\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Spatie\QueryBuilder\QueryBuilder;

class ListUserController
{
    public function __invoke(Request $request): JsonResponse
    {
        $loggedUser = $request->user();
        if (!$loggedUser) {
            return responder()->error('Unauthenticated')->respond(500);
        }
        $loggedRoleName = $loggedUser->role->name;
        if ($loggedRoleName !== 'Admin') {
            return responder()->error('You do not have permission for this request')->respond(500);
        }

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
            ->with(['organization', 'role']);

        if ($isActive == "true") {
            $users->where('is_active', true);
        }

        if ($isAdmin == "true") {
            $users->whereHas('role', function ($query) {
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
                    $query->where('position_in_org', 'like', '%' . $positionOrOrganization . '%')
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
        //     $users->where('position_in_org', 'like', '%' . $positionOrOrganization . '%')
        //         ->orWhereHas('organization', function ($query) use ($positionOrOrganization) {
        //             $query->where('name', 'like', '%' . $positionOrOrganization . '%');
        //         });
        // }

        $sort = $request->get('sort', 'name');

        switch ($sort) {
            case 'name':
                $users->orderBy('first_name');
                break;
            case '-name':
                $users->orderByDesc('first_name');
                break;
            case 'email':
                $users->orderBy('email');
                break;
            case '-email':
                $users->orderByDesc('email');
                break;
            case 'position':
                $users->orderBy('position_in_org');
                break;
            case '-position':
                $users->orderByDesc('position_in_org');
                break;
            case 'organization':
                $users->join('organizations', 'users.organization_id', '=', 'organizations.id')
                    ->select('users.*', 'organizations.name as organization_name')
                    ->orderBy('organization_name');
                break;
            case '-organization':
                $users->join('organizations', 'users.organization_id', '=', 'organizations.id')
                    ->select('users.*', 'organizations.name as organization_name')
                    ->orderByDesc('organization_name');
                break;
            default:
                $users->orderBy('first_name');
                break;
        }

        $users = $users->paginate($perPage);

        return responder()
            ->success($users, UserListTransformer::class)
            ->respond();
    }
}
