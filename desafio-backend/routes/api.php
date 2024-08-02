<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Passport\Passport;
use App\Http\Controllers\Article\ArticleController;
use App\Http\Controllers\Comments\CommentsController;
use App\Http\Controllers\Category\CategoryController;
use App\Http\Controllers\Tag\TagController;

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
Route::get('/', function () {
    return response()->json(['message' => 'Hello, world!']);
});


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('register', [App\Http\Controllers\Auth\AuthController::class, 'register']);
Route::post('login', [App\Http\Controllers\Auth\AuthController::class, 'login'])->name('login');
Route::post('/comments', [CommentsController::class, 'store']);
Route::get('/articles/list/{slug}', [ArticleController::class, 'show']);
Route::get('/article/comments/{id}', [CommentsController::class, 'show']);
Route::get('articles/index', [ArticleController::class, 'index']);   

Route::middleware('auth:api')->group(function () {
    Route::apiResource('articles', ArticleController::class);   
    Route::get('/articles/edit/{id}', [ArticleController::class, 'edit']);
    Route::post('/articles/edit/{id}', [ArticleController::class, 'update']);
    
    Route::delete('/comments/{id}', [CommentsController::class, 'destroy']);


    Route::post('articles/{article}/categories', [ArticleController::class, 'addCategory']);
    Route::post('articles/{article}/tags', [ArticleController::class, 'addTag']);

    Route::get('/category/show/', [CategoryController::class, 'show']);
    Route::get('/category/list/', [CategoryController::class, 'index']);
    Route::get('/category/edit/{id}', [CategoryController::class, 'edit']);
    Route::post('/category/update/{id}', [CategoryController::class, 'update']);
    Route::post('/category/create/', [CategoryController::class, 'store']);
    Route::delete('/category/delete/{id}', [CategoryController::class, 'destroy']);

    Route::get('/tag/show/', [TagController::class, 'show']);
    Route::get('/tag/list/', [TagController::class, 'index']);
    Route::get('/tag/edit/{id}', [TagController::class, 'edit']);
    Route::post('/tag/update/{id}', [TagController::class, 'update']);
    Route::post('/tag/create/', [TagController::class, 'store']);
    Route::delete('/tag/delete/{id}', [TagController::class, 'destroy']);

});



