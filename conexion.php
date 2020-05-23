<?php
	require "util.php";

	ini_set("display_errors", "Off");
	session_start();
	$username = "root"; //Set ur bd user
	$password = ""; //Set ur user bd password
	$db = "ARCHIVADOR_WEB";
	$host = "localhost";

	$tamano_recursos_permitido = 10000000; // En  Bytes ( 10 MBs )
	$recursos_permitidos = [ "image/png", "image/jpg", "image/jpeg" ];
	
	// ----------------------------
	
	$conexion_settings = "mysql:host=$host;";
	$_conexion = new PDO($conexion_settings, $username, $password);
	$_conexion->exec("SET CHARSET UTF8");

	$conexion = new UtilModel( $_conexion );

	?>