<?php

namespace App\Providers;

use App\Observers\TarefaObserver;
use App\Tarefa;
use Illuminate\Http\Resources\Json\Resource;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Resource::withoutWrapping();

        Tarefa::observe(TarefaObserver::class);

        Schema::defaultStringLength(191);

        Route::resourceVerbs([
            'create' => 'cadastrar',
            'edit' => 'editar',
        ]);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
