<?php

namespace App\Http\Resources;

use App\Http\Resources\TarefaResource;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\ResourceCollection;

class TarefaCollection extends ResourceCollection
{

    public function toArray($request)
    {
        return [
            'resultado' => TarefaResource::collection($this->collection),
            'metatados' => [
                'data_local' => new Carbon(),
                'quantidade' => $this->collection->count(),
            ],
        ];
    }
}
