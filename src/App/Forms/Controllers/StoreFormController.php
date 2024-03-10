<?php

namespace App\Forms\Controllers;

use App\Forms\Request\StoreFormRequest;
use App\Forms\Transformers\FormTransformer;
use Domain\Forms\Actions\StoreFormAction;
use Domain\Users\Models\User;
use Domain\Forms\Models\Form;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
// use Faker\Factory as Faker;

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

        // $faker = Faker::create();
        // do {
        //     $publicCode = implode($faker->randomElements(array_merge(range('A', 'Z')), 6));
        // } while (Form::where('public_code', $publicCode)->exists());

        do {
            $publicCode = $this->randomString(6);
        } while (Form::where('public_code', $publicCode)->exists());


        $now = Carbon::now()->toDateTimeString();

        $formDto = $request->toDto()
            ->withPublicCode($publicCode)
            ->withCreationDateTime($now)
            ->withLastModifiedDateTime($now);
        $form = $storeFormAction->execute($formDto);

        return responder()
            ->success($form, FormTransformer::class)
            ->respond(JsonResponse::HTTP_CREATED);
    }

    private function randomString($length)
    {
        $result = '';
        for ($i = 0; $i < $length; $i++) {
            $result .= chr(rand(65, 90));
        }
        return $result;
    }
}
