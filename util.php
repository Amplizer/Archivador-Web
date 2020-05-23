<?php
	class SetSession{

		const SESSION_GET = 1; // Acciones sobre sesiones de obtención
		const SESSION_CREATE = 2; // Acción sobre sesiones de creación
		const SESSION_DROP = 3; // Acciones sobre sesiones de eliminación

		private static function whatToDo( $vars, $whatToDo = 1 ){ // Dependiendo del parámetro pasado, añadirá, borrará o devolverá
			switch($whatToDo){
				case 2: // Crea
					foreach( array_keys($vars) as $actualVarKey ){
						 $_SESSION[$actualVarKey] = $vars[$actualVarKey];
					}
				break;
				case 3: // Elimina
					foreach( $vars as $actualVar ){
						unset($_SESSION[$actualVar]);
					}
				break;
				default: // Devuelve
					$varsReturn = [];
					foreach( $vars as $actualVar ){
						array_push($varsReturn, $_SESSION[$actualVar]);
					}
					return $varsReturn;
				break;
			}
		}

		/*public static function startSession(){ // Inicializa una sesión
			session_start();
		}*/

		private static function startSession(){ // Inicializa una sesión
			session_start();
		}

		public static function setVarsSession( $vars ){ // Pasar un array asociativo como parámetro y establecer
			$objectSession = new SetSession();
			$objectSession::startSession();
			$objectSession::whatToDo( $vars, $objectSession::SESSION_CREATE );
		}

		public static function getVarsSession( $vars ){ // Devuelve variables de sesión en un array ( si no existe, devolverá null )
			$objectSession = new SetSession();
			$objectSession::startSession();
			$objectSession::whatToDo( $vars, $objectSession::SESSION_GET );
		}

		public static function dropVarsSession( $vars ){ // Elimina variables de sesión
			$objectSession = new SetSession();
			$objectSession::startSession();
			$objectSession::whatToDo( $vars, $objectSession::SESSION_DROP );
		}
	}

	class UtilModel{ // Funcionalidad PDO de la base de datos
		
		// --------------------------------------

		// Solamente se utilizará para consultas sobre datos, no actualizaciones de tablas ni bases de datos

		const UTIL_MODEL_RETURN_TYPE_ASSOC = 1; // Devuelve los datos con su correspondiente alias establecido en la consulta
		const UTIL_MODEL_RETURN_TYPE_NUM = 2; // Devuelve los datos 'fetchados' en un array

		const UTIL_MODEL_QUERY_SELECT = 1; // Realiza una consulta de seleccion
		const UTIL_MODEL_QUERY_INSERT = 2; // Realiza una consulta de inserción
		const UTIL_MODEL_QUERY_UPDATE = 3; // Realiza una consulta de actualización
		const UTIL_MODEL_QUERY_DELETE = 4; // Realiza una consulta eliminando datos
		
		// --------------------------------------
		
		private $conexion = null;
		public function __construct( $conexion ){ /* Conexión creada desde un inicio */
			$this->conexion = $conexion;
		}

		public function query( $query, $vars, $queryType = 1, $returnType = 2, $returnFirstRow = true/* Devuelve la primera línea cuando solo hay un registro */ ){ // Por defecto, si se elige cualquier número diferente a las constantes declaradas, se elegirá la consulta de tipo 'select'( caso 1 )
			// ---------------------------
			
			// Si la función solamente devuelve un registro en un select, devolverá el primer valor del primer array bidimensional

			// ---------------------------
			$conexion = $this->conexion;
			$conexion->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
			try{
				$statement = $conexion->prepare( $query );
				$statement->execute( $vars );
				switch($queryType){
					case 2:
						return $conexion->lastInsertId();
					break;
					case 3:
					case 4:
						return $statement->rowCount();
					break;
					default:
						switch($returnType){
							case 1:
								if($statement->rowCount() == 1 && $returnFirstRow){
									return $statement->fetchAll( PDO::FETCH_ASSOC )[0];
								}else{
									return $statement->fetchAll( PDO::FETCH_ASSOC );
								}
							break;
							default:
								if($statement->rowCount() == 1 && $returnFirstRow){
									return $statement->fetchAll( PDO::FETCH_NUM )[0];
								}else{
									return $statement->fetchAll( PDO::FETCH_NUM );
								}
							break;
						}
					break;
				}
			}catch(PDOException $exception){
				echo " Mensaje de error: " . $exception->getMessage() . " Línea de error: " . $exception->getLine();
			}
		}
	}

?>