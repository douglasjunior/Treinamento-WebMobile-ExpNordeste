<?php

namespace App\Http\Controllers;

use App\Rules\CPF;
use App\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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
            'nascimento' => 'required|date_format:Y-m-d',
            'senha' => 'required',
            'cpf' => ['required', new CPF('CPF')],
        ]);

        if ($validador->fails()) {
            return response()->json($validador->errors(), 412);
        }

        $usuario = new Usuario();
        $usuario->nome = $request->nome;
        $usuario->email = $request->email;
        $usuario->senha = Hash::make($request->senha);
        $usuario->nascimento = $request->nascimento;
        $usuario->cpf = $request->cpf;

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

        $usuario = Usuario::where('email', $request->email)->first();

        if (!Hash::check($request->senha, $usuario->senha)) {
            return response('Credenciais inválidas', 401);
        }

        $payload = [
            'usuario' => $usuario,
        ];

        $token = JWTAuth::fromUser($usuario, $payload);

        $resposta = [
            'token' => $token,
        ];

        return response()->json($resposta, 200);
    }

    public function user()
    {
        $usuario = auth()->user();
        return response()->json($usuario, 200);
    }

    public function logout()
    {
        JWTAuth::invalidate();
        return response(null, 204);
    }

}
