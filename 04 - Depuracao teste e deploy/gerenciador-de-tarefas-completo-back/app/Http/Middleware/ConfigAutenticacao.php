<?php

namespace App\Http\Middleware;

use Closure;
use JWTAuth;
use Illuminate\Support\Facades\Config;

class ConfigAutenticacao
{

    public static function configurar($tipoUsuario)
    {
        if ($tipoUsuario === 'usuario') {
            Config::set('jwt.user', '\App\Usuario');
            Config::set('jwt.identifier', 'email');
            Config::set('auth.providers.users.model', \App\Usuario::class);
        } else if ($tipoUsuario === 'admin') {
            Config::set('jwt.user', '\App\Admin');
            Config::set('jwt.identifier', 'id');
            Config::set('auth.providers.users.model', \App\Admin::class);
        }
    }

    private function possuiToken($authorization)
    {
        $regex = '/^bearer [A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/i';

        preg_match($regex, $authorization, $matches, PREG_OFFSET_CAPTURE, 0);

        // Print the entire match result
        return $matches;
    }

    public function handle($request, Closure $next)
    {
        try {
            if ($this->possuiToken($request->headers->get('authorization'))) {
                $payload = JWTAuth::parseToken()->getPayload();
                $tipoUsuario = $payload->get('tipo');

                ConfigAutenticacao::configurar($tipoUsuario);
            }
        } catch (JWTException $e) {
            // apenas ignora caso não haja token
        }
        return $next($request);
    }
}
