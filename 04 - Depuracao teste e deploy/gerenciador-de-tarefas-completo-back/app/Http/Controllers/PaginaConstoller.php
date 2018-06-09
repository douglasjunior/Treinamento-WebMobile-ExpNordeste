<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\File;

class PaginaController extends Controller
{

    public function index()
    {
        return File::get(storage_path('app/index.html'));
    }
}
