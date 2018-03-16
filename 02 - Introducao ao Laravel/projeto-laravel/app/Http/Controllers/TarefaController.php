<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class TarefaController extends Controller
{

    private function getTarefas()
    {
        // lê o conteúdo do arquivo em formato string
        $jsonData = Storage::get('tarefas.json');
        // converte a String em um objeto do PHP
        $tarefas = json_decode($jsonData);

        if (is_array($tarefas)) {
            return $tarefas;
        }
        return [];
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tarefas = $this->getTarefas();
        return response()->json($tarefas, 200);
    }

    private function saveTarefas($tarefas)
    {
        $jsonData = json_encode($tarefas);
        Storage::put('tarefas.json', $jsonData);
    }

    private function validateTarefa(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'titulo' => 'required|max:50',
            'descricao' => 'required',
            'data' => 'required',
        ], [
            'titulo.required' => 'O título é obrigatório',
            'titulo.max' => 'O título deve ter no máximo 50 caracteres',
            'descricao.required' => 'A descrição é obrigatória.',
            'data.required' => 'A data é obrigatório.',
        ]);
        return $validator;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = $this->validateTarefa($request);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 412);
        }

        $tarefas = $this->getTarefas();

        $proximoId = 1;
        if (count($tarefas) > 0) {
            $proximoId = end($tarefas)->id + 1;
        }

        $tarefa = [
            'id' => $proximoId,
            'titulo' => $request->titulo,
            'descricao' => $request->descricao,
            'data' => $request->data,
        ];

        $tarefas[] = $tarefa;
        $this->saveTarefas($tarefas);

        return response()->json($tarefa, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $tarefas = $this->getTarefas();

        foreach ($tarefas as &$tarefa) {
            if ($tarefa->id === intval($id)) {
                return response()->json($tarefa, 200);
            }
        }

        return response('Tarefa não encontrada', 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = $this->validateTarefa($request);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 412);
        }

        $tarefas = $this->getTarefas();

        foreach ($tarefas as &$tarefa) {
            if ($tarefa->id === intval($id)) {

                $tarefa->titulo = $request->titulo;
                $tarefa->descricao = $request->descricao;
                $tarefa->data = $request->data;

                $this->saveTarefas($tarefas);

                return response()->json($tarefa, 200);
            }
        }

        return response('Tarefa não encontrada', 404);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $tarefas = $this->getTarefas();

        for ($i = 0; $i < count($tarefas); $i++) {
            $tarefa = $tarefas[$i];

            if ($tarefa->id === intval($id)) {

                array_splice($tarefas, $i, 1);

                $this->saveTarefas($tarefas);

                return response(null, 204);
            }
        }

        return response('Tarefa não encontrada', 404);
    }
}
