<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tarefa extends Model
{
    protected $table = 'tarefas';

    protected $dateFormat = 'Y-m-d H:i:s.u';
    protected $primaryKey = 'id';
    protected $keyType = 'integer';
    public $incrementing = true;

    public $timestamps = false;

}
