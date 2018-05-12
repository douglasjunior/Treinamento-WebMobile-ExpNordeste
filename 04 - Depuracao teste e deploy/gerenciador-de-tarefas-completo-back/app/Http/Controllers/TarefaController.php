<?php

namespace App\Http\Controllers;

use App\Http\Resources\TarefaCollection;
use App\Http\Resources\TarefaResource;
use App\Tarefa;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TarefaController extends Controller
{

    public function index(Request $request)
    {
        $titulo = $request->query('titulo');

        $query = auth()->user()->tarefas()->select(['id', 'titulo', 'data', 'ativa']);

        if ($titulo) {
            $query = $query->where('titulo', 'like', "%$titulo%");
        }

        $limite = $request->query('limite');

        $tarefas = $query->paginate($limite);

        return new TarefaCollection($tarefas);
    }

    private function validateTarefa(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'titulo' => 'required|max:50',
            'descricao' => 'required',
        ], [
            'titulo.required' => 'O título é obrigatório',
            'titulo.max' => 'O título deve ter no máximo 50 caracteres',
            'descricao.required' => 'A descrição é obrigatória.',
        ]);
        return $validator;
    }

    public function store(Request $request)
    {
        $validator = $this->validateTarefa($request);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 412);
        }

        $tarefa = new Tarefa;
        $tarefa->titulo = $request->titulo;
        $tarefa->descricao = $request->descricao;
        $tarefa->data = new Carbon();
        $tarefa->usuario_email = auth()->user()->email;

        $tarefa->save();

        $tarefa = $tarefa->fresh();

        return response()->json($tarefa, 201);
    }

    public function show($id)
    {

        $tarefa = Tarefa::where('usuario_email', auth()->user()->email)
            ->findOrFail($id);

        return new TarefaResource($tarefa);
    }

    public function update(Request $request, $id)
    {
        $validator = $this->validateTarefa($request);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 412);
        }

        $tarefa = Tarefa::where('usuario_email', auth()->user()->email)
            ->findOrFail($id);
        $tarefa->titulo = $request->titulo;
        $tarefa->descricao = $request->descricao;
        $tarefa->ativa = $request->ativa;
        $tarefa->data = $request->data;

        $tarefa->save();

        return response()->json($tarefa, 200);
    }

    public function destroy($id)
    {
        $deletadas = Tarefa::where('usuario_email', auth()->user()->email)
            ->where('id', $id)
            ->delete();

        if ($deletadas > 0) {
            return response(null, 204);
        }

        return response('Tarefa não encontrada', 404);
    }

    public function count()
    {
        $query = Tarefa::where('usuario_email', auth()->user()->email);

        $ativas = $query->where('ativa', 1)->count();
        $inativas = $query->where('ativa', 0)->count();

        $json = ['ativas' => $ativas, 'inativas' => $inativas];

        return response()->json($json, 200);
    }

    public function ativar($id)
    {
        $tarefa = Tarefa::where('usuario_email', auth()->user()->email)
            ->findOrFail($id);
        $tarefa->ativa = true;

        $tarefa->save();

        return response()->json($tarefa, 200);
    }

    public function desativar($id)
    {
        $tarefa = Tarefa::where('usuario_email', auth()->user()->email)
            ->findOrFail($id);
        $tarefa->ativa = false;

        $tarefa->save();

        return response()->json($tarefa, 200);
    }
}
