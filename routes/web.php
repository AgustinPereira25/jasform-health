<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/test', function(){
    return 'Hola mundo - 20240208 - 2:20pm';
});

Route::get('{unknown}', fn () => view('app  '))->where('unknown', '^(?!api).*$');
