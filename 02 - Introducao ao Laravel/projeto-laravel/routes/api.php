<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::match(['get', 'post'], '/ola', function () {
//     $teste->ola();
//     return 'Olá Laravel';
// });

// Route::group(['prefix' => 'usuario'], function () {
//     Route::get('/{id?}', function ($id) {
//         return 'Get usuário ' . $id;
//     });
//     Route::post('/', function () {
//         return 'Post usuário';
//     });
//     Route::put('/{id}', function ($id) {
//         return 'Put usuário ' . $id;
//     });
//     Route::delete('/{id}', function ($id) {
//         return 'Delete usuário ' . $id;
//     });
// });

// Route::apiResource('tarefas', 'TarefaController');

// Route::apiResource('/produto', 'ProdutoController');

Route::get('/tarefas/count', 'TarefaController@count');
Route::apiResource('/tarefas', 'TarefaController');
