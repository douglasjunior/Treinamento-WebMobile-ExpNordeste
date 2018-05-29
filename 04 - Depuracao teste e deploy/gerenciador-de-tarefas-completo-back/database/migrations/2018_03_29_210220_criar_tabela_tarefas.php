<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CriarTabelaTarefas extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tarefas', function (Blueprint $table) {
            $table->increments('id');
            $table->string('titulo', 50);
            $table->text('descricao')->nullable();
            $table->boolean('ativa')->default(true);
            $table->date('data');
            $table->string('usuario_email');
            $table->foreign('usuario_email')->references('email')->on('usuarios');
            // $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('tarefas');
    }
}
