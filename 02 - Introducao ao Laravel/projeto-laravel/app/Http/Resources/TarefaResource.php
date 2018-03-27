<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class TarefaResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'codigo' => $this->id,
            'titulo' => 'T: ' . $this->titulo,
            'descricao' => 'D: ' . $this->descricao,
            'data' => new Carbon($this->data),
            'ativa' => $this->ativa === 1 ? true : false,
        ];
    }
}
