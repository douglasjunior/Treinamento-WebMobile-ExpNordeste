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
        $idade = $request->query('idade');
        if ($idade > 200) {
            return response('A idade não pode ser superior a 200.', 400);
        }
        return $next($request);
    }
}
