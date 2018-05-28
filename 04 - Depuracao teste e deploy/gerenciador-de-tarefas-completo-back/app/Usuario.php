<?php

namespace App;

use App\Tarefa;
use Illuminate\Foundation\Auth\User;
use Illuminate\Notifications\Notifiable;

class Usuario extends User
{
    use Notifiable;

    protected $table = 'usuarios';

    protected $dateFormat = 'Y-m-d H:i:s.u';
    protected $primaryKey = 'email';
    protected $keyType = 'string';
    public $incrementing = false;
    public $timestamps = true;

    protected $fillable = [
        'nome', 'email', 'senha', 'nascimento'
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
        return $this->hasMany(Tarefa::class, 'usuario_email');
    }

}
