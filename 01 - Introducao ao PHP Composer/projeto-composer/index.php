<?php

require __DIR__ . '/vendor/autoload.php';

$log = new Monolog\Logger('meu-projeto');
$log->pushHandler(new Monolog\Handler\StreamHandler('app.log', Monolog\Logger::WARNING));

$log->addWarning('Usuário 5 excluiu a pessoa 13');

echo 'Funcionou!';

echo '<br />';

$pessoa = new ExpNordeste\Models\Pessoa();
$pessoa->nome = 'Douglas';

var_dump($pessoa);
