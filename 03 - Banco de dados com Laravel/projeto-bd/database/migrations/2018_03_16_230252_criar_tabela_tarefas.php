<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CriarTabelaTarefas extends Migration
{

    public function up()
    {
        Schema::create('tarefas', function (Blueprint $table) {
            $table->increments('id');
            $table->string('titulo', 50);
            $table->tinyInteger('ativa');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('tarefas');
    }
}
