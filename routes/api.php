<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::post('/login', [App\Http\Controllers\Auth\ApiAuthController::class,"login"]);
Route::post('/register', [\App\Http\Controllers\Auth\ApiAuthController::class,"register"]);
Route::post('/logout', [\App\Http\Controllers\Auth\ApiAuthController::class,"logout"]);
Route::get('/test', [\App\Http\Controllers\Auth\ApiAuthController::class,"test"]);

Route::get('/email/{applicationid}/{outcome}', [\App\Http\Controllers\ApplicationController::class,"email_link"]);


Route::middleware('auth:api')->group(function () {
    // our routes to be protected will go in here
    Route::post('/my-applications/new', [\App\Http\Controllers\ApplicationController::class,"store"]);
    Route::put('/application/{applicationid}', [\App\Http\Controllers\ApplicationController::class,"update"])->middleware("adminOnly");
    Route::get('/my-applications/', [\App\Http\Controllers\ApplicationController::class,"show"]);
    Route::get('/all-applications/', [\App\Http\Controllers\ApplicationController::class,"showall"]);

    Route::get('/users', [\App\Http\Controllers\UsersController::class,"index"])->middleware("adminOnly");
    Route::get('/user/{user_id}', [\App\Http\Controllers\UsersController::class,"show"])->middleware("adminOnly");
    Route::put('/user/{user_id}', [\App\Http\Controllers\UsersController::class,"update"])->middleware("adminOnly");
    //to secure register uncomment
    //Route::post('/register', [\App\Http\Controllers\Auth\ApiAuthController::class,"register"]);



});
