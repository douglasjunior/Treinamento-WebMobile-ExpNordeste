<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ModificaTabelaTarefas extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tarefas', function (Blueprint $table) {
            $table->text('descricao')->nullable()->change();
            $table->boolean('ativa')->default(true)->change();
        });

        DB::statement('ALTER TABLE tarefas CHANGE data data DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tarefas', function (Blueprint $table) {
            $table->text('descricao')->nullable(false)->change();
            $table->dateTime('data')->default(null)->change();
            $table->boolean('ativa')->default(null)->change();
        });
    }
}
