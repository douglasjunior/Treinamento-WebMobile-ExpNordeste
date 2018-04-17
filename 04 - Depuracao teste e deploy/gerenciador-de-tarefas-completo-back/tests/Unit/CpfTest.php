<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Rules\CPF;

class CpfTest extends TestCase
{

    public function testCPFValido()
    {
        $cpfRule = new CPF('CPF');

        $cpfValido = $cpfRule->passes(null, '38340691830');

        $this->assertTrue($cpfValido);
    }

    public function testCPFInvalido()
    {
        $cpfRule = new CPF('CPF');

        $cpfValido = $cpfRule->passes(null, '38340691830189789789');

        $this->assertFalse($cpfValido);
    }
}
