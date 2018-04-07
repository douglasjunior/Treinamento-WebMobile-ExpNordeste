<?php

namespace App\Http\Controllers;

use App\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use JWTAuth;

class UsuarioController extends Controller
{

    public function store(Request $request)
    {
        // nome, email, senha
        $validador = Validator::make($request->all(), [
            'nome' => 'required',
            'email' => 'required|email|unique:usuarios,email',
            'senha' => 'required',
        ]);

        if ($validador->fails()) {
            return response()->json($validador->errors(), 412);
        }

        $usuario = new Usuario();
        $usuario->nome = $request->nome;
        $usuario->email = $request->email;
        $usuario->senha = bcrypt($request->senha);

        $usuario->save();

        return response()->json($usuario->fresh(), 201);
    }

    public function login(Request $request)
    {
        $validador = Validator::make($request->all(), [
            'email' => 'required|email',
            'senha' => 'required',
        ]);

        if ($validador->fails()) {
            return response()->json($validador->errors(), 412);
        }

        $credenciais = [
            'email' => $request->email,
            'password' => $request->senha,
        ];

        if (!$token = JWTAuth::attempt($credenciais)) {
            return response('Credenciais inválidas', 401);
        }

        $resposta = [
            'token' => $token,
        ];

        return response()->json($resposta, 200);
    }

    public function user() {
        $usuario = auth()->user();
        return response()->json($usuario, 200);
    }

    public function logout() {
        JWTAuth::invalidate();
        return response(null, 204);
    }

}
