<?php

namespace App\Observers;

use App\Tarefa;

class TarefaObserver
{

    public function saved(Tarefa $tarefa)
    {
        // var_dump($tarefa);
    }

}
