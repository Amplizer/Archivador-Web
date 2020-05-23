<?php
	//
	require "conexion.php";
	//Ejecuta este archivo una sola vez, para crear la estructura básica de la base de datos que usará la aplicación
	
	$insertar_categorias = true;
	
	$queries = [ 
		"CREATE DATABASE IF NOT EXISTS $db;",
		"CREATE TABLE IF NOT EXISTS $db.USUARIOS ( id INT PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE, usuario varchar(255) UNIQUE NOT NULL, nombre TEXT NOT NULL, apellidos TEXT NOT NULL, password TEXT NOT NULL, email VARCHAR(255) UNIQUE NOT NULL, fecha_creacion DATETIME, rango INT );",
		"CREATE TABLE IF NOT EXISTS $db.RANGOS (id INT AUTO_INCREMENT UNIQUE PRIMARY KEY NOT NULL, descripcion TEXT)",
		"ALTER TABLE $db.USUARIOS ADD FOREIGN KEY (rango) REFERENCES RANGOS(id);",
		"CREATE TABLE IF NOT EXISTS $db.CATEGORIAS_TIPOS ( id INT PRIMARY KEY UNIQUE NOT NULL AUTO_INCREMENT, tipo VARCHAR(100) )",
		"CREATE TABLE IF NOT EXISTS $db.CATEGORIAS ( id INT PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE, tipo_categoria INT, descripcion_categoria TEXT, fecha_creacion DATETIME, borrado TINYINT, id_usuario INT, categoria_padre INT DEFAULT 0, FOREIGN KEY (tipo_categoria) REFERENCES CATEGORIAS_TIPOS(id), FOREIGN KEY (id_usuario) REFERENCES USUARIOS(id) )",
		"CREATE TABLE IF NOT EXISTS $db.PRODUCTOS ( id INT PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT, id_categoria INT, nombre_producto TEXT, autor_producto VARCHAR(255), url_producto TEXT, otros campos TEXT, creado_por INT, fecha_creacion DATETIME, borrado TINYINT, FOREIGN KEY (id_categoria) REFERENCES CATEGORIAS(id), FOREIGN KEY (creado_por) REFERENCES USUARIOS(id) )",
		"CREATE TABLE IF NOT EXISTS $db.IMAGENES_PRODUCTOS ( id INT PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT, url TEXT, id_producto INT, FOREIGN KEY (id_producto) REFERENCES PRODUCTOS(id) )",
		"CREATE TABLE IF NOT EXISTS $db.CATEGORIAS_PERMISOS_USUARIOS ( id_categoria INT, id_usuario INT, FOREIGN KEY (id_categoria) REFERENCES CATEGORIAS(id), FOREIGN KEY (id_usuario) REFERENCES USUARIOS(id) ) ",
		"CREATE TABLE IF NOT EXISTS $db.PRODUCTOS_CATEGORIAS ( id INT PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT, id_categoria INT NOT NULL, id_producto INT NOT NULL, borrado INT DEFAULT 0, FOREIGN KEY (id_categoria) REFERENCES CATEGORIAS(id), FOREIGN KEY (id_producto) REFERENCES PRODUCTOS(id) )"
	];
	foreach($queries as $query){
		//echo $query . "<br/>";
		$pdoStatement = $conexion->prepare($query);
		$pdoStatement->execute();
	}
	$categorias = [ 
		"INSERT INTO $db.CATEGORIAS_TIPOS ( tipo ) VALUES ( 'Inicial' ) ",
		"INSERT INTO $db.CATEGORIAS_TIPOS ( tipo ) VALUES ( 'Subcategoría' ) ",
		"INSERT INTO $db.RANGOS ( descripcion ) VALUES ( 'Creador' ) ",
		"INSERT INTO $db.RANGOS ( descripcion ) VALUES ( 'Visualizador' ) "
	];
	
	if($insertar_categorias){
		foreach($categorias as $categoria){
			//echo $categoria . "<br/>";
			$pdoStatement = $conexion->prepare($categoria);
			$pdoStatement->execute();
		}
	}
	
?>