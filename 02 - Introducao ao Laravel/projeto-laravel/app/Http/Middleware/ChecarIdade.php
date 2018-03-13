<?php

namespace App\Http\Middleware;

use Closure;

class ChecarIdade
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->query('idade') > 200) {
            return response('A idade deve ser menor que 200.', 400);
        }
        return $next($request);
    }
}
