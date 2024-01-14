<?php

use App\Users\Controllers\DeleteUserController;
use App\Users\Controllers\GetUserController;
use App\Users\Controllers\ListUserController;
use App\Users\Controllers\StoreUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Activity_records\Controllers\Activity_recordsController;
use App\Completer_users\Controllers\Completer_usersController;
use App\Form_activities\Controllers\Form_activitiesController;
use App\Form_instances\Controllers\Form_instancesController;
use App\Form_questions\Controllers\Form_questionsController;
use App\Forms\Controllers\FormsController;
use App\Organizations\Controllers\OrganizationsController;
use App\Question_options\Controllers\Question_optionsController;
use App\Question_types\Controllers\Question_typesController;
use App\Roles\Controllers\RolesController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/*
|--------------------------------------------------------------------------
| Users Routes
|--------------------------------------------------------------------------
*/
Route::prefix('users')
    ->middleware([])
    ->group(static function () {
        Route::get('/', ListUserController::class);
        Route::get('/{user}', GetUserController::class);
        Route::post('/', StoreUserController::class);
        Route::delete('/{user}', DeleteUserController::class);
    });

Route::prefix('forms')
    ->middleware([])
    ->group(static function () {
        Route::get('/', FormsController::class);
        // Route::get('/{user}', GetUserController::class);
        // Route::post('/', StoreUserController::class);
        // Route::delete('/{user}', DeleteUserController::class);
    });

Route::prefix('activity_records')
    ->middleware([])
    ->group(static function () {
        Route::get('/', Activity_recordsController::class);
        // Route::get('/{user}', GetUserController::class);
        // Route::post('/', StoreUserController::class);
        // Route::delete('/{user}', DeleteUserController::class);
    });

Route::prefix('completer_users')
    ->middleware([])
    ->group(static function () {
        Route::get('/', Completer_usersController::class);
        // Route::get('/{user}', GetUserController::class);
        // Route::post('/', StoreUserController::class);
        // Route::delete('/{user}', DeleteUserController::class);
    });

Route::prefix('form_activities')
    ->middleware([])
    ->group(static function () {
        Route::get('/', Form_activitiesController::class);
        // Route::get('/{user}', GetUserController::class);
        // Route::post('/', StoreUserController::class);
        // Route::delete('/{user}', DeleteUserController::class);
    });

Route::prefix('form_instances')
    ->middleware([])
    ->group(static function () {
        Route::get('/', Form_instancesController::class);
        // Route::get('/{user}', GetUserController::class);
        // Route::post('/', StoreUserController::class);
        // Route::delete('/{user}', DeleteUserController::class);
    });

Route::prefix('form_questions')
    ->middleware([])
    ->group(static function () {
        Route::get('/', Form_questionsController::class);
        // Route::get('/{user}', GetUserController::class);
        // Route::post('/', StoreUserController::class);
        // Route::delete('/{user}', DeleteUserController::class);
    });

Route::prefix('organizations')
    ->middleware([])
    ->group(static function () {
        Route::get('/', OrganizationsController::class);
        // Route::get('/{user}', GetUserController::class);
        // Route::post('/', StoreUserController::class);
        // Route::delete('/{user}', DeleteUserController::class);
    });

Route::prefix('question_options')
    ->middleware([])
    ->group(static function () {
        Route::get('/', Question_optionsController::class);
        // Route::get('/{user}', GetUserController::class);
        // Route::post('/', StoreUserController::class);
        // Route::delete('/{user}', DeleteUserController::class);
    });

Route::prefix('question_types')
    ->middleware([])
    ->group(static function () {
        Route::get('/', Question_typesController::class);
        // Route::get('/{user}', GetUserController::class);
        // Route::post('/', StoreUserController::class);
        // Route::delete('/{user}', DeleteUserController::class);
    });

Route::prefix('roles')
    ->middleware([])
    ->group(static function () {
        Route::get('/', RolesController::class);
        // Route::get('/{user}', GetUserController::class);
        // Route::post('/', StoreUserController::class);
        // Route::delete('/{user}', DeleteUserController::class);
    });
