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

Route::middleware('auth:api')->group(function () {
    // our routes to be protected will go in here
    Route::post('/my-applications/new', [\App\Http\Controllers\ApplicationController::class,"store"]);
    Route::put('/application/{applicationid}', [\App\Http\Controllers\ApplicationController::class,"update"])->middleware("adminOnly");
    Route::get('/my-applications/', [\App\Http\Controllers\ApplicationController::class,"show"]);
});
