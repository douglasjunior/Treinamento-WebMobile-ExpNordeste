<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class CPF implements Rule
{
    private $tipo;

    public function __construct($tipo = 'CPF')
    {
        $this->tipo = $tipo;
    }

    public function passes($attribute, $value)
    {
        if (is_string($value)) {
            if ($this->tipo === 'CPF' && strlen($value) === 11) {
                return true;
            }
            if ($this->tipo === 'CNPJ' && strlen($value) === 14) {
                return true;
            }
        }
        return false;
    }

    public function message()
    {
        if ($this->tipo === 'CPF') {
            return 'O :attribute deve conter 11 dígitos.';
        }
        return 'O :attribute deve conter 14 dígitos.';
    }
}
