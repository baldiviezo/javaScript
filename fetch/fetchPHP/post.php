<?php
$usuario = $_POST['usuario'];
$pass = $_POST['pass'];
//usario es un string vacio se ejecuta esta condicion
if ($usuario === ''|| $pass ==='' ){
	//tranformado en formato JSON
	echo json_encode('Llena todos los capos');
}else{
	echo json_encode('Correcto: <br>Usuario: '.$usuario.'<br>Pass:'.$pass);
}

?>
