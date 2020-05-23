<?php
	require "../conexion.php";
	
	$consultas = [
		"CREATE TABLE `RANGOS` ( `id` INT(11) NOT NULL AUTO_INCREMENT, `descripcion` TEXT NULL, PRIMARY KEY (`id`), UNIQUE INDEX `id` (`id`) ) COLLATE='latin1_swedish_ci' ENGINE=InnoDB AUTO_INCREMENT=1;",
		"CREATE TABLE `USUARIOS` ( `id` INT(11) NOT NULL AUTO_INCREMENT, `usuario` VARCHAR(255) NOT NULL,`nombre` TEXT NOT NULL, `apellidos` TEXT NOT NULL, `password` TEXT NOT NULL, `email` VARCHAR(255) NOT NULL,`fecha_creacion` DATETIME NULL DEFAULT NULL,`rango` INT(11) NULL DEFAULT NULL, PRIMARY KEY (`id`), UNIQUE INDEX `id` (`id`), UNIQUE INDEX `usuario` (`usuario`), UNIQUE INDEX `email` (`email`), INDEX `rango` (`rango`), CONSTRAINT `USUARIOS_ibfk_1` FOREIGN KEY (`rango`) REFERENCES `RANGOS` (`id`), CONSTRAINT `USUARIOS_ibfk_2` FOREIGN KEY (`rango`) REFERENCES `RANGOS` (`id`) ) COLLATE='latin1_swedish_ci' ENGINE=InnoDB AUTO_INCREMENT=1;",
		"CREATE TABLE `CATEGORIAS_TIPOS` ( `id` INT(11) NOT NULL AUTO_INCREMENT, `tipo` VARCHAR(100) NULL DEFAULT NULL, PRIMARY KEY (`id`), UNIQUE INDEX `id` (`id`) ) COLLATE='latin1_swedish_ci' ENGINE=InnoDB AUTO_INCREMENT=1;",
		"CREATE TABLE `CATEGORIAS` ( `id` INT(11) NOT NULL AUTO_INCREMENT, `tipo_categoria` INT(11) NULL DEFAULT NULL, `descripcion_categoria` TEXT NULL, `fecha_creacion` DATETIME NULL DEFAULT NULL, `borrado` TINYINT(4) NULL DEFAULT NULL, `id_usuario` INT(11) NULL DEFAULT NULL, `categoria_padre` INT(11) NULL DEFAULT '0', PRIMARY KEY (`id`), UNIQUE INDEX `id` (`id`), INDEX `tipo_categoria` (`tipo_categoria`), INDEX `id_usuario` (`id_usuario`), CONSTRAINT `CATEGORIAS_ibfk_1` FOREIGN KEY (`tipo_categoria`) REFERENCES `CATEGORIAS_TIPOS` (`id`), CONSTRAINT `CATEGORIAS_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `USUARIOS` (`id`) ) COLLATE='latin1_swedish_ci' ENGINE=InnoDB AUTO_INCREMENT=1;",
		"CREATE TABLE `CATEGORIAS_PERMISOS_USUARIOS` ( `id_categoria` INT(11) NULL DEFAULT NULL, `id_usuario` INT(11) NULL DEFAULT NULL,	INDEX `id_categoria` (`id_categoria`), 	INDEX `id_usuario` (`id_usuario`), 	CONSTRAINT `CATEGORIAS_PERMISOS_USUARIOS_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `CATEGORIAS` (`id`), 	CONSTRAINT `CATEGORIAS_PERMISOS_USUARIOS_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `USUARIOS` (`id`) ) COLLATE='latin1_swedish_ci' ENGINE=InnoDB;",
		"CREATE TABLE `PRODUCTOS` ( `id` INT(11) NOT NULL AUTO_INCREMENT, `id_categoria` INT(11) NULL DEFAULT NULL, `nombre_producto` TEXT NULL, `repetido` TINYINT(4) NULL DEFAULT NULL, `autor_producto` VARCHAR(255) NULL DEFAULT NULL, `creado_por` INT(11) NULL DEFAULT NULL, `fecha_creacion` DATETIME NULL DEFAULT NULL, `borrado` TINYINT(4) NULL DEFAULT NULL, PRIMARY KEY (`id`), UNIQUE INDEX `id` (`id`), INDEX `id_categoria` (`id_categoria`), INDEX `creado_por` (`creado_por`), CONSTRAINT `PRODUCTOS_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `CATEGORIAS` (`id`), CONSTRAINT `PRODUCTOS_ibfk_2` FOREIGN KEY (`creado_por`) REFERENCES `USUARIOS` (`id`) ) COLLATE='latin1_swedish_ci' ENGINE=InnoDB;",
		"CREATE TABLE `PRODUCTOS_CATEGORIAS` ( `id` INT(11) NOT NULL AUTO_INCREMENT, `id_categoria` INT(11) NOT NULL, `id_producto` INT(11) NOT NULL, `borrado` INT(11) NULL DEFAULT '0', PRIMARY KEY (`id`), UNIQUE INDEX `id` (`id`), INDEX `id_categoria` (`id_categoria`), INDEX `id_producto` (`id_producto`), CONSTRAINT `PRODUCTOS_CATEGORIAS_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `CATEGORIAS` (`id`), CONSTRAINT `PRODUCTOS_CATEGORIAS_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `PRODUCTOS` (`id`) ) COLLATE='latin1_swedish_ci' ENGINE=InnoDB;",
		"CREATE TABLE `IMAGENES_PRODUCTOS` (	`id` INT(11) NOT NULL AUTO_INCREMENT, `url` TEXT NULL, `id_producto` INT(11) NULL DEFAULT NULL, PRIMARY KEY (`id`),	UNIQUE INDEX `id` (`id`), 	INDEX `id_producto` (`id_producto`), CONSTRAINT `IMAGENES_PRODUCTOS_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `PRODUCTOS` (`id`) ) COLLATE='latin1_swedish_ci' ENGINE=InnoDB;",
	];
	
	$registros = [
		"INSERT INTO $db.CATEGORIAS_TIPOS ( tipo ) VALUES ( 'Inicial' ) ",
		"INSERT INTO $db.CATEGORIAS_TIPOS ( tipo ) VALUES ( 'Subcategoría' ) ",
		"INSERT INTO $db.RANGOS ( descripcion ) VALUES ( 'Creador' ) ",
		"INSERT INTO $db.RANGOS ( descripcion ) VALUES ( 'Visualizador' ) "
	];
	
	$crear_base_datos = "CREATE DATABASE '$db';";
	$result_base_datos = $conexion->query( $crear_base_datos, [] );
	
	foreach($consultas as $consulta_actual){
		$conexion->query( $consulta_actual, [] );
	}
	
	foreach($registros as $registro_actual){
		$conexion->query( $registro_actual, [] );
	}
	
	mkdir( "recursos", 0777, true );
	mkdir( "recursos_perfiles", 0777, true );
	mkdir( "recursos_subcategorias", 0777, true );
	
?>