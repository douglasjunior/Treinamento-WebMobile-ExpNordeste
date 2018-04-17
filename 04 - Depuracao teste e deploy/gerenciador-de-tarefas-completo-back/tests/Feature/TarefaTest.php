<?php

namespace Tests\Feature;

use Tests\TestCase;

class TarefaTest extends TestCase
{

    public function setUp()
    {
        parent::setUp();

        $response = $this
            ->withHeaders([
                'Content-Type' => 'application/json',
            ])
            ->json('POST', '/api/usuarios/login', [
                'email' => 'douglas@mail.com',
                'senha' => 'senha123',
            ]);

        $response->assertStatus(200);
        $response->assertJsonStructure(['token']);

        $this->loginBody = json_decode($response->getContent());
    }

    public function testIndex()
    {
        $token = "Bearer {$this->loginBody->token}";

        $response = $this
            ->withHeaders([
                'Authorization' => $token,
            ])
            ->get('/api/tarefas');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                'resultado',
                'metadados' => [
                    'data_local', 
                    'quantidade',
                ],
            ],
        ]);

    }
}
