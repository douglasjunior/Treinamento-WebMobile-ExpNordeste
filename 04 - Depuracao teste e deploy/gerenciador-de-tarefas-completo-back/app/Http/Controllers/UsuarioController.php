<?php

namespace App\Http\Controllers;

use App\Admin;
use App\Rules\CPF;
use App\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Config;
use App\Http\Middleware\ConfigAutenticacao;
use JWTAuth;

class UsuarioController extends Controller
{

    private function cpfOuCnpj($valor)
    {
        $regex = '/^(\d{11}|\d{14})$/';

        preg_match($regex, $valor, $matches, PREG_OFFSET_CAPTURE, 0);

        return $matches;
    }

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
        // $validador = Validator::make($request->all(), [
        //     'email' => 'required|email',
        //     'senha' => 'required',
        // ]);
        $validador = Validator::make($request->all(), [
            'usuario' => 'required',
            'senha' => 'required',
        ]);

        if ($validador->fails()) {
            return response()->json($validador->errors(), 412);
        }

        if ($this->cpfOuCnpj($request->usuario)) {
            $tipoUsuario = 'admin';
            ConfigAutenticacao::configurar($tipoUsuario);
            $usuario = Admin::where('pfj', $request->usuario)->first();
            if (!$usuario || !Hash::check($request->senha, $usuario->password)) {
                return response('Credenciais admin inválidas', 401);
            }
        } else {
            $tipoUsuario = 'usuario';
            ConfigAutenticacao::configurar($tipoUsuario);
            $usuario = Usuario::where('email', $request->usuario)->first();
            if (!$usuario || !Hash::check($request->senha, $usuario->senha)) {
                return response('Credenciais usuário inválidas', 401);
            }
        }

        $payload = [
            'usuario' => $usuario,
            'tipo' => $tipoUsuario,
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
