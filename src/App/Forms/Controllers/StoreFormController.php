<?php

namespace App\Forms\Controllers;

use App\Forms\Request\StoreFormRequest;
use App\Forms\Transformers\FormTransformer;
use Domain\Forms\Actions\StoreFormAction;
use Domain\Users\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class StoreFormController
{
    public function __invoke(StoreFormRequest $request, StoreFormAction $storeFormAction): JsonResponse
    {
        $loggedUser = $request->user();
        if (!$loggedUser) {
            return responder()->error('Unauthenticated')->respond(500);
        }
        $loggedRoleName = $loggedUser->role->name;
        if ($loggedRoleName !== 'Admin') {
            $userId = $request->user_id;
            if ($loggedUser->id != $userId) {
                return responder()->error('You do not have permission for this request')->respond(500);
            }
        }

        $userId = $request->user_id;
        try {
            User::findOrFail($userId);
        } catch (ModelNotFoundException $e) {
            return responder()
                ->error("The user with id {$userId} does not exist.")
                ->respond(JsonResponse::HTTP_NOT_FOUND);
        }

        $publicCode = Str::random(20);
        $now = Carbon::now()->toDateTimeString();

        $formDto = $request->toDto()
            ->withPublicCode($publicCode)
            ->withCreationDateTime($now)
            ->withLastModifiedDateTime($now);
        $form = $storeFormAction->execute($formDto);

        $formId = $form->id;
        $firstPartPublicCode = substr($publicCode, 0, 10);
        $secondPartPublicCode = substr($publicCode, 10);
        $newPublicCode = $firstPartPublicCode . $formId . $secondPartPublicCode;
        $form->public_code = $newPublicCode;
        $form->save();

        return responder()
            ->success($form, FormTransformer::class)
            ->respond(JsonResponse::HTTP_CREATED);
    }
}
