<?php

namespace App\Http\Middleware;

use Closure;

class ChecarIdade
{
    public function handle($request, Closure $next)
    {
        $idade = $request->query('idade');
        if ($idade > 200) {
            return response('A idade não pode ser superior a 200.', 400);
        }
        return $next($request);
    }
}
