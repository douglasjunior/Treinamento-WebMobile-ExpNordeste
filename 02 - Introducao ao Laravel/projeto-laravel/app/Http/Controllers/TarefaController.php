<?php

namespace App\Http\Controllers;

use App\Http\Resources\TarefaCollection;
use App\Http\Resources\TarefaResource;
use App\Tarefa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TarefaController extends Controller
{

    // private function getTarefas()
    // {
    //     // lê o conteúdo do arquivo em formato string
    //     $jsonData = Storage::get('tarefas.json');
    //     // converte a String em um objeto do PHP
    //     $tarefas = json_decode($jsonData);

    //     if (is_array($tarefas)) {
    //         return $tarefas;
    //     }
    //     return [];
    // }

    // private function saveTarefas($tarefas)
    // {
    //     $jsonData = json_encode($tarefas);
    //     Storage::put('tarefas.json', $jsonData);
    // }

    public function index()
    {
        // $tarefas = DB::select('SELECT * FROM tarefas WHERE ativa = ?', [1]);
        // $tarefas = DB::table('tarefas')->where('ativa', 1)->get();

        // $tarefas = Tarefa::where('ativa', 1)->paginate(5);

        // return response()->json($tarefas, 200);

        $tarefas = auth()->user()->tarefas()->paginate(5);

        return new TarefaCollection($tarefas);
    }

    private function validateTarefa(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'titulo' => 'required|max:50',
            'descricao' => 'required',
            'data' => 'required|date_format:Y-m-d',
            // 'cpf' => ['required', new CPF('CPF')],
        ], [
            'titulo.required' => 'O título é obrigatório',
            'titulo.max' => 'O título deve ter no máximo 50 caracteres',
            'descricao.required' => 'A descrição é obrigatória.',
            'data.required' => 'A data é obrigatório.',
            'data.date_format' => 'A data deve estar no formato AAAA-MM-DD.',
            // 'cpf.required' => 'O CPF é obrigatório.',
        ]);
        return $validator;
    }

    public function store(Request $request)
    {
        $validator = $this->validateTarefa($request);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 412);
        }

        // $tarefas = $this->getTarefas();

        // $proximoId = 1;
        // if (count($tarefas) > 0) {
        //     $proximoId = end($tarefas)->id + 1;
        // }

        // $tarefa = [
        //     // 'id' => $proximoId,
        //     'titulo' => $request->titulo,
        //     'descricao' => $request->descricao,
        //     'data' => $request->data,
        // ];

        // $tarefas[] = $tarefa;
        // $this->saveTarefas($tarefas);

        // DB::insert('INSERT INTO tarefas (titulo, descricao, data) VALUES (:titulo, :descricao, :data)', $tarefa);

        // $id = DB::table('tarefas')->insertGetId(
        //     [
        //         'titulo' => $request->titulo,
        //         'descricao' => $request->descricao,
        //         'data' => $request->data,
        //     ]
        // );

        // $tarefa = DB::table('tarefas')->where('id', $id)->first();

        $tarefa = new Tarefa;
        $tarefa->titulo = $request->titulo;
        $tarefa->descricao = $request->descricao;
        $tarefa->data = $request->data;
        $tarefa->usuario_email = auth()->user()->email;

        $tarefa->save();

        $tarefa = $tarefa->fresh();

        return response()->json($tarefa, 201);
    }

    public function show($id)
    {
        // $tarefas = $this->getTarefas();

        // foreach ($tarefas as &$tarefa) {
        //     if ($tarefa->id === intval($id)) {
        //         return response()->json($tarefa, 200);
        //     }
        // }

        // return response('Tarefa não encontrada', 404);

        // $tarefas = DB::select('SELECT * FROM tarefas WHERE id = ? AND ativa = ?', [$id, 1]);

        // if (count($tarefas) > 0) {
        //     return response()->json($tarefas[0], 200);
        // }

        // $tarefa = DB::table('tarefas')->where('id', $id)->where('ativa', 1)->first();

        $tarefa = Tarefa::where('ativa', 1)
            ->where('usuario_email', auth()->user()->email)
            ->findOrFail($id);

        // return response()->json($tarefa, 200);

        return new TarefaResource($tarefa);
    }

    public function update(Request $request, $id)
    {
        $validator = $this->validateTarefa($request);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 412);
        }

        // $tarefas = $this->getTarefas();

        // foreach ($tarefas as &$tarefa) {
        //     if ($tarefa->id === intval($id)) {

        //         $tarefa->titulo = $request->titulo;
        //         $tarefa->descricao = $request->descricao;
        //         $tarefa->data = $request->data;

        //         $this->saveTarefas($tarefas);

        //         return response()->json($tarefa, 200);
        //     }
        // }

        // $tarefa = [
        //     'id' => $id,
        //     'titulo' => $request->titulo,
        //     'descricao' => $request->descricao,
        //     'ativa' => $request->ativa,
        // ];

        // $sql = 'UPDATE tarefas ' .
        //     'SET titulo = :titulo, descricao = :descricao, ativa = :ativa ' .
        //     'WHERE id = :id';

        // $atualizados = DB::update($sql, $tarefa);

        // if ($atualizados > 0) {
        //     $tarefas = DB::select('SELECT * FROM tarefas WHERE id = ?', [$id]);
        //     return response()->json($tarefas[0], 200);
        // }

        // $queryTarefa = DB::table('tarefas')->where('id', $id);

        // if ($queryTarefa->doesntExist()) {
        //     return response('Tarefa não encontrada', 404);
        // }

        // DB::table('tarefas')->where('id', $id)->update([
        //     'titulo' => $request->titulo,
        //     'descricao' => $request->descricao,
        //     'ativa' => $request->ativa,
        // ]);

        // return response()->json($queryTarefa->first(), 200);

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
        // $tarefas = $this->getTarefas();

        // for ($i = 0; $i < count($tarefas); $i++) {
        //     $tarefa = $tarefas[$i];

        //     if ($tarefa->id === intval($id)) {

        //         array_splice($tarefas, $i, 1);

        //         $this->saveTarefas($tarefas);

        //         return response(null, 204);
        //     }
        // }

        // $deletadas = DB::delete('DELETE FROM tarefas WHERE id = ?', [$id]);

        // $deletadas = DB::table('tarefas')->where('id', $id)->delete();

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
}
