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

Route::group(['middleware' => 'jwt.auth'], function () {
    Route::put('/tarefas/{tarefa}/ativa', 'TarefaController@ativar');
    Route::delete('/tarefas/{tarefa}/ativa', 'TarefaController@desativar');
    Route::get('/tarefas/count', 'TarefaController@count');
    Route::apiResource('/tarefas', 'TarefaController');
});

Route::group(['prefix' => 'usuarios'], function () {

    Route::post('/', 'UsuarioController@store');
    Route::post('/login', 'UsuarioController@login');

    Route::group(['middleware' => 'jwt.auth'], function () {
        Route::get('/', 'UsuarioController@user');
        Route::post('/logout', 'UsuarioController@logout');
    });
});
