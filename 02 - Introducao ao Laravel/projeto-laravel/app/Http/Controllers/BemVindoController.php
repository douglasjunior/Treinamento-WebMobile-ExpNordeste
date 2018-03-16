<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BemVindoController extends Controller
{

    public function __construct()
    {
        $this->middleware('checar.idade');
    }

    public function saudacao(Request $request, $nome = '')
    {
        echo $request->url();
        echo '<br />';
        var_dump($request->headers);

        // 1 - executar consulta no banco de dados
        // 2 - obter os dados do usuário
        return view('bemvindo', ['nome' => $nome]);
    }

}
