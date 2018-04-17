<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TarefaResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'titulo' => $this->titulo,
            'descricao' => $this->descricao,
            'data' => $this->data,
            'ativa' => $this->ativa === 1 ? true : false,
        ];
    }
}
