<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

// Route::get('/bemvindo', function () {
//     return response('Bem-vindo ao Lavarel!', 200);
// });

// Route::redirect('/welcome', '/bemvindo');

// Route::middleware('checar.idade')->group(function () {
//     // Route::view('/bemvindo', 'bemvindo', ['nome' => 'Douglas']);

// });

Route::get('/bemvindo/{nome?}', 'BemVindoController@saudacao');

// Route::view('/bemvindo', 'bemvindo', ['nome' => 'Douglas'])->middleware('checar.idade');

// Route::get('/usuario/{id}', function ($id) {
//     return 'Buscou o usuário ' . $id;
// });

// Route::resource('/produto', 'ProdutoController');
