<?php

namespace App;

use App\Tarefa;
use Illuminate\Foundation\Auth\User;
use Illuminate\Notifications\Notifiable;

class Usuario extends User
{
    use Notifiable;

    protected $table = 'usuarios';

    protected $primaryKey = 'email';
    protected $keyType = 'string';
    public $incrementing = false;
    public $timestamps = true;

    protected $fillable = [
        'nome', 'email', 'senha',
    ];

    protected $hidden = [
        'senha',
    ];

    public function getAuthPassword()
    {
        return $this->senha;
    }

    public function tarefas()
    {
        return $this->hasMany(Tarefa::class, 'usuario_email')->where('ativa', 1);
    }

}
