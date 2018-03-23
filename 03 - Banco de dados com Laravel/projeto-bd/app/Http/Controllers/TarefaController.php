<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class TarefaController extends Controller
{

    public function index()
    {
        $tarefas = DB::select('select * from tarefas where ativa = ?', [1]);

        return view('tarefas', ['tarefas' => $tarefas]);
    }
}
