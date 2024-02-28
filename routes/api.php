<?php

use App\Users\Controllers\DeleteUserController;
use App\Users\Controllers\GetUserController;
use App\Users\Controllers\GetUserDashboardController;
use App\Users\Controllers\ListUserController;
use App\Users\Controllers\StoreUserController;
use App\Users\Controllers\UpdateUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthLogOutController;
use App\Activity_records\Controllers\ListActivity_recordController;
use App\Activity_records\Controllers\GetActivity_recordController;
use App\Activity_records\Controllers\StoreActivity_recordController;
use App\Activity_records\Controllers\DeleteActivity_recordController;
use App\Completer_users\Controllers\ListCompleter_userController;
use App\Completer_users\Controllers\GetCompleter_userController;
use App\Completer_users\Controllers\StoreCompleter_userController;
use App\Completer_users\Controllers\DeleteCompleter_userController;
use App\Completed_questions\Controllers\ListCompleted_questionController;
use App\Completed_questions\Controllers\ListCompleted_question_byFormInstanceIdController;
use App\Completed_questions\Controllers\GetCompleted_questionController;
use App\Completed_questions\Controllers\StoreCompleted_questionController;
use App\Completed_questions\Controllers\DeleteCompleted_questionController;
use App\Form_instances\Controllers\ListForm_instanceController;
use App\Form_instances\Controllers\ListForm_instance_byFormIdController;
use App\Form_instances\Controllers\GetForm_instanceController;
use App\Form_instances\Controllers\StoreForm_instanceController;
use App\Form_instances\Controllers\DeleteForm_instanceController;
use App\Form_questions\Controllers\ListForm_questionController;
use App\Form_questions\Controllers\ListForm_question_byFormIdController;
use App\Form_questions\Controllers\GetForm_questionController;
use App\Form_questions\Controllers\StoreForm_questionController;
use App\Form_questions\Controllers\StoreMultipleForm_question_and_optionsController;
use App\Form_questions\Controllers\DeleteForm_questionController;
use App\Forms\Controllers\ListFormController;
use App\Forms\Controllers\ListForm_byUserIdController;
use App\Forms\Controllers\GetForm_byPublicCodeController;
use App\Forms\Controllers\GetFormController;
use App\Forms\Controllers\StoreFormController;
use App\Forms\Controllers\UpdateFormController;
use App\Forms\Controllers\DeleteFormController;
use App\Organizations\Controllers\ListOrganizationController;
use App\Organizations\Controllers\GetOrganizationController;
use App\Organizations\Controllers\StoreOrganizationController;
use App\Organizations\Controllers\DeleteOrganizationController;
use App\Question_options\Controllers\ListQuestion_optionController;
use App\Question_options\Controllers\ListQuestion_option_byQuestionIdController;
use App\Question_options\Controllers\GetQuestion_optionController;
use App\Question_options\Controllers\StoreQuestion_optionController;
use App\Question_options\Controllers\DeleteQuestion_optionController;
use App\Question_types\Controllers\ListQuestion_typeController;
use App\Question_types\Controllers\GetQuestion_typeController;
use App\Question_types\Controllers\StoreQuestion_typeController;
use App\Question_types\Controllers\DeleteQuestion_typeController;
use App\Roles\Controllers\ListRoleController;
use App\Roles\Controllers\GetRoleController;
use App\Roles\Controllers\StoreRoleController;
use App\Roles\Controllers\DeleteRoleController;
use Support\Controllers\MailController;

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
| Public Routes
|--------------------------------------------------------------------------
*/
Route::post('/login', [AuthController::class, 'login']);
Route::post('/recover', [AuthController::class, 'recover']);
Route::post('/register', [AuthController::class, 'register']);

Route::post('/logout', [AuthLogOutController::class, 'logout']);
// Route::middleware('auth:sanctum')->group(function () {
//     Route::post('/logout', [AuthLogOutController::class, 'logout']);
// });

Route::prefix('forms')
    ->middleware(['sanitize_input'])
    ->group(static function () {
        Route::get('/byPublicCode/{publicCode}', GetForm_byPublicCodeController::class);
    });
Route::prefix('form_instances')
    ->middleware(['sanitize_input'])
    ->group(static function () {
        Route::post('/', StoreForm_instanceController::class);
    });

/*
|--------------------------------------------------------------------------
| Private Routes
|--------------------------------------------------------------------------
*/


Route::prefix('users')
    ->middleware(['sanitize_input', 'auth:sanctum'])
    ->group(static function () {
        Route::get('/', ListUserController::class);
        Route::get('/{user}', GetUserController::class);
        Route::get('/getDashboard/{user}', GetUserDashboardController::class);
        Route::post('/', StoreUserController::class);
        Route::put('/', UpdateUserController::class);
        Route::delete('/{user}', DeleteUserController::class);
    });

Route::prefix('forms')
    ->middleware(['sanitize_input', 'auth:sanctum'])
    ->group(static function () {
        Route::get('/', ListFormController::class);
        Route::get('/byUserId/{user}', ListForm_byUserIdController::class);
        Route::get('/{form}', GetFormController::class);
        Route::post('/', StoreFormController::class);
        Route::put('/', UpdateFormController::class);
        Route::delete('/{form}', DeleteFormController::class);
    });

Route::prefix('activity_records')
    ->middleware(['sanitize_input', 'auth:sanctum'])
    ->group(static function () {
        Route::get('/', ListActivity_recordController::class);
        Route::get('/{activity_record}', GetActivity_recordController::class);
        Route::post('/', StoreActivity_recordController::class);
        Route::delete('/{activity_record}', DeleteActivity_recordController::class);
    });

Route::prefix('completer_users')
    ->middleware(['sanitize_input', 'auth:sanctum'])
    ->group(static function () {
        Route::get('/', ListCompleter_userController::class);
        Route::get('/{completer_user}', GetCompleter_userController::class);
        Route::post('/', StoreCompleter_userController::class);
        Route::delete('/{completer_user}', DeleteCompleter_userController::class);
    });

Route::prefix('completed_questions')
    ->middleware(['sanitize_input', 'auth:sanctum'])
    ->group(static function () {
        Route::get('/', ListCompleted_questionController::class);
        Route::get('/byFormInstanceId/{formInstance}', ListCompleted_question_byFormInstanceIdController::class);
        Route::get('/{completed_question}', GetCompleted_questionController::class);
        Route::post('/', StoreCompleted_questionController::class);
        Route::delete('/{completed_question}', DeleteCompleted_questionController::class);
    });

Route::prefix('form_instances')
    ->middleware(['sanitize_input', 'auth:sanctum'])
    ->group(static function () {
        Route::get('/', ListForm_instanceController::class);
        Route::get('/byFormId/{form}', ListForm_instance_byFormIdController::class);
        Route::get('/{form_instance}', GetForm_instanceController::class);
        Route::delete('/{form_instance}', DeleteForm_instanceController::class);
    });



Route::prefix('form_questions')
    ->middleware(['sanitize_input', 'auth:sanctum'])
    ->group(static function () {
        Route::get('/', ListForm_questionController::class);
        Route::get('/byFormId/{form}', ListForm_question_byFormIdController::class);
        Route::get('/{form_question}', GetForm_questionController::class);
        Route::post('/', StoreForm_questionController::class);
        Route::post('/store_multiple_questions_with_options/', StoreMultipleForm_question_and_optionsController::class);
        Route::delete('/{form_question}', DeleteForm_questionController::class);
    });

Route::prefix('organizations')
    ->middleware(['sanitize_input', 'auth:sanctum'])
    ->group(static function () {
        Route::get('/', ListOrganizationController::class);
        Route::get('/{organization}', GetOrganizationController::class);
        Route::post('/', StoreOrganizationController::class);
        Route::delete('/{organization}', DeleteOrganizationController::class);
    });

Route::prefix('question_options')
    ->middleware(['sanitize_input', 'auth:sanctum'])
    ->group(static function () {
        Route::get('/', ListQuestion_optionController::class);
        Route::get('/byQuestionId/{form_question}', ListQuestion_option_byQuestionIdController::class);
        Route::get('/{question_option}', GetQuestion_optionController::class);
        Route::post('/', StoreQuestion_optionController::class);
        Route::delete('/{question_option}', DeleteQuestion_optionController::class);
    });

Route::prefix('question_types')
    ->middleware(['sanitize_input', 'auth:sanctum'])
    ->group(static function () {
        Route::get('/', ListQuestion_typeController::class);
        Route::get('/{question_type}', GetQuestion_typeController::class);
        Route::post('/', StoreQuestion_typeController::class);
        Route::delete('/{question_type}', DeleteQuestion_typeController::class);
    });

Route::prefix('roles')
    ->middleware(['sanitize_input', 'auth:sanctum'])
    ->group(static function () {
        Route::get('/', ListRoleController::class);
        Route::get('/{role}', GetRoleController::class);
        Route::post('/', StoreRoleController::class);
        Route::delete('/{role}', DeleteRoleController::class);
    });

Route::prefix('send_email')
    ->middleware(['sanitize_input'])
    ->group(static function () {
        Route::get('/', MailController::class);
});
