<?php

namespace App\Http\Resources;

use App\Http\Resources\TarefaResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class TarefaCollection extends ResourceCollection
{

    public function toArray($request)
    {
        return TarefaResource::collection($this->collection);
    }
}
