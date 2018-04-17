<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RelacionarUsuarioTarefas extends Migration
{

    public function up()
    {
        Schema::table('tarefas', function (Blueprint $table) {
            $table->string('usuario_email');
            $table->foreign('usuario_email')->references('email')->on('usuarios');
        });
    }

    public function down()
    {
        Schema::table('tarefas', function (Blueprint $table) {
            $table->dropForeign(['usuario_email']);
            $table->dropColumn('usuario_email');
        });
    }

}
