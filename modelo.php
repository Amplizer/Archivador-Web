<?php
	require_once "conexion.php";
	
	/* Este archivo contendrá una clase, que contendrá a su vez un método estático que será llamado para crear consultas y retornar valores. Será un sencillo método para unificar la metodología para llamar a la base de datos, y retornará valores en caso de haberlos. */
	
	class Realizar{
		public static function($consulta){ // Donde vayan los parámetros deberá haber un '?' y los parametros deberán estar en un array
			$statement = $conexion->prepare($consulta, $parametros);
			$statement->execute($parametros);
			return $statement->fetchAll(PDO::FETCH_NUM );
		}
	}
	
?>