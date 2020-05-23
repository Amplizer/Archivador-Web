<?php

	require "conexion.php";
	
	if(count($_POST) > 0){
		
		$accion = (int) $_POST[accion];
	
		switch($accion){
			case 1: // Registrarse en el sistemav2333
				if(isset($_POST[cfsrtoken])){
					$cfsrtoken = $_POST[cfsrtoken];
					if(strcmp($cfsrtoken, $_SESSION[cfsrtoken]) == 0){
						$usuario = $_POST[registro_usuario]; $password = $_POST[registro_password]; $password_repeat = $_POST[registro_repeat_password]; $nombre = $_POST[registro_nombre]; $apellidos = $_POST[registro_apellidos]; $email = $_POST[registro_email];
						if(strcmp($password, $password_repeat) == 0 && strlen($usuario) > 6 && strlen($usuario) < 255 && strcmp($usuario, "") != 0 && strcmp($password, "") != 0 && strcmp($nombre, "") != 0 && strcmp($apellidos, "") != 0 && strcmp($email, "") != 0 ){
							$url_perfil_usuario = $url_profile_save . "/" . hash("sha256", rand(0, 100000000) . microtime(true));
							mkdir($url_perfil_usuario, 0777, true);
							$password_encrypt = password_hash($password, PASSWORD_DEFAULT);
							$rango_usuario = 1;
							$id_usuario = $conexion->query( "INSERT INTO $db.usuarios (usuario, nombre, apellidos, password, email, rango, fecha_creacion, url_perfil_usuario, url_imagen_perfil_usuario) VALUES ( ?, ?, ?, ?, ?, ?, now(), ?, NULL)", [ $usuario, $nombre, $apellidos, $password_encrypt, $email, $rango_usuario, $url_perfil_usuario  ], UtilModel::UTIL_MODEL_QUERY_INSERT );
							SetSession::setVarsSession( [ "u_id" => $id_usuario, "u_usuario" => $usuario, "u_email" => $email, "u_rango" => $rango_usuario, "u_nombre" => $nombre, "u_apellidos" => $apellidos, "sesion_iniciada" => 1, "fecha_inicio_sesion" => time() ], SetSession::SESSION_CREATE );
							unset($_SESSION[cfsrtoken]);
							header("Location: index.php");
							die();
						}
					}
				}
				unset($_SESSION[cfsrtoken]);
				header("Location: register.php");
				die();
			break;
			case 2: // Iniciar sesion
				if(isset($_POST[login_cfsrtoken])){
					$login_cfsrtoken = $_POST[login_cfsrtoken];
					if(strcmp($login_cfsrtoken, $_SESSION["login_cfsrtoken"]) == 0){
						$usuario_o_email = $_POST[usuario_o_email]; $password_inicio_sesion = $_POST[password];
						$datos = $conexion->query( "SELECT usuario, nombre, apellidos, email, rango, password, id FROM $db.usuarios WHERE EMAIL = ? || USUARIO = ?", [ $usuario_o_email, $usuario_o_email ] );
						if(count($datos) > 0){
							$usuario = $datos[0]; $nombre = $datos[1]; $apellidos = $datos[2]; $email = $datos[3]; $rango = $datos[4]; $password = $datos[5]; $id_usuario = $datos[6]; $rango_usuario = 1;
							if(password_verify($password_inicio_sesion, $password)){
								SetSession::setVarsSession( [ "u_id" => $id_usuario, "u_usuario" => $usuario, "u_email" => $email, "u_rango" => $rango_usuario, "u_nombre" => $nombre, "u_apellidos" => $apellidos, "sesion_iniciada" => 1, "fecha_inicio_sesion" => time() . "000",  ], SetSession::SESSION_CREATE );
								SetSession::dropVarsSession( [ "login_cfsrtoken" ], SetSession::SESSION_DROP );
								header("Location: index.php");
								die();
							}
						}
					}
				}
				SetSession::dropVarsSession( [ "login_cfsrtoken" ], SetSession::SESSION_DROP  );			
				header("Location: index.php");
				die();
			break;
			case 3: // Obtiene las galerías creadas por el usuario
				$id_usuario = $_SESSION[u_id];
				echo json_encode($conexion->query( "SELECT descripcion_categoria, id  FROM $db.categorias WHERE id_usuario = ? AND borrado != '1' AND tipo_categoria = '1' AND categoria_padre = 0;", [ $id_usuario ], UtilModel::UTIL_MODEL_QUERY_SELECT, UtilModel::UTIL_MODEL_RETURN_TYPE_ASSOC, false ));
				die();
			break;
			case 4: // Crea una galería inicial ( no una subcategoría) 
				if(isset($_SESSION[u_id]) && strlen($_SESSION[u_id]) > 0){
					$nombre_galeria = $_POST[nombre_galeria]; $id_usuario = $_SESSION[u_id];
					$conexion->query( "INSERT INTO $db.categorias ( tipo_categoria, descripcion_categoria, fecha_creacion, borrado, id_usuario, categoria_padre ) VALUES ( '1', ?, now(), '0', ?, '0');", [ $nombre_galeria, $id_usuario ], UtilModel::UTIL_MODEL_QUERY_INSERT );
					header("Location: archivar.php");
					die();
				}
			break;
			case 5: // Elimina una galería
				if(isset($_SESSION[u_id]) && strlen($_SESSION[u_id]) > 0){
					$id_usuario = $_SESSION[u_id];
					$id_galeria = $_POST[id_categoria];
					$conexion->query( "UPDATE $db.categorias SET BORRADO = '1' WHERE id = ? AND id_usuario = ?;", [ $id_galeria, $id_usuario ], UtilModel::UTIL_MODEL_QUERY_UPDATE );
					die();
				}
			break;
			case 6: // Modifica una galería
				die();
			break;
			case 7:
				if(isset($_SESSION[u_id]) && strlen($_SESSION[u_id]) > 0){
					$id_categoria = $_POST[id_categoria]; $id_usuario = $_SESSION[u_id];
					echo json_encode($conexion->query( "SELECT DISTINCT descripcion_categoria AS descripcion_subcategoria, id, CASE WHEN url_portada IS NULL OR url_portada = '' THEN './assets/imgs/categoria_vacia.png' ELSE url_portada END AS url_portada  FROM $db.categorias WHERE categoria_padre = ? AND id_usuario = ? AND tipo_categoria = '2' AND borrado != '1';", [ $id_categoria, $id_usuario ], UtilModel::UTIL_MODEL_QUERY_SELECT, UtilModel::UTIL_MODEL_RETURN_TYPE_ASSOC, false ));
					die();
				}
			break;
			case 8: // Devuelve el nombre de una categoría pasándole por parámetro el id de la categoría
				if(isset($_SESSION[u_id]) && strlen($_SESSION[u_id]) > 0){
					$id_categoria = $_POST[id_categoria]; $id_usuario = $_SESSION[u_id];
					echo json_encode($conexion->query( "SELECT descripcion_categoria FROM $db.categorias WHERE id = ? AND id_usuario = ?;", [ $id_categoria, $id_usuario ], UtilModel::UTIL_MODEL_QUERY_SELECT, UtilModel::UTIL_MODEL_RETURN_TYPE_ASSOC, false ));
					die();
				}
			break;
			case 9: // Crea una subcategoría
				if(isset($_SESSION[u_id]) && strlen($_SESSION[u_id]) > 0){
					$id_categoria_padre = $_POST[id_categoria_padre]; $nombre_subcategoria = $_POST[nombre_subcategoria]; $id_usuario = $_SESSION[u_id];
					$conexion->query( "INSERT INTO $db.categorias ( tipo_categoria, descripcion_categoria, fecha_creacion, borrado, id_usuario, categoria_padre ) VALUES ( '2', ?, now(), '0', ?, ?);", [ $nombre_subcategoria, $id_usuario, $id_categoria_padre ], UtilModel::UTIL_MODEL_QUERY_INSERT );
					header("Location: editar_galeria.php?id_categoria=" . $id_categoria_padre);
					die();
				}
			break;
			case 10: // Eliminar subcategoría
				if(isset($_SESSION[u_id]) && strlen($_SESSION[u_id]) > 0){
					$id_subcategoria = $_POST[id_subcategoria]; $id_usuario = $_SESSION[u_id];
					$conexion->query( "UPDATE $db.categorias SET borrado = '1' WHERE id = ? AND id_usuario = ?;", [ $id_subcategoria, $id_usuario ], UtilModel::UTIL_MODEL_QUERY_UPDATE );
					die();
				}
			break;
			case 11: // Modificar nombre de una categoría
				die();
			break;
			case 12: // Carga los elementos asociados a una categoría
				
			break;
			case 13: // Devuelve el nombre de una sub categoría
				if(isset($_SESSION[u_id]) && strlen($_SESSION[u_id]) > 0){
					$id_subcategoria = $_POST[id_subcategoria]; $id_usuario = $_SESSION[u_id];
					echo json_encode($conexion->query( "SELECT descripcion_categoria AS titulo FROM $db.categorias WHERE id = ? AND id_usuario = ? AND tipo_categoria = '2';", [ $id_subcategoria, $id_usuario ], UtilModel::UTIL_MODEL_QUERY_SELECT, UtilModel::UTIL_MODEL_RETURN_TYPE_ASSOC, false ));
					die();
				}
			break;
			case 14: // Obtiene los elementos de una subcategoría
				if(isset($_SESSION[u_id]) && strlen($_SESSION[u_id]) > 0){
					$id_subcategoria = $_POST[id_subcategoria];	$id_usuario = $_SESSION[u_id];
					echo json_encode($conexion->query( "SELECT DISTINCT $db.productos.id, $db.productos.nombre_producto, $db.productos.url_producto, $db.productos.otros_campos AS properties, portada AS backgroundImage, 'image/png' AS elementType FROM $db.productos WHERE id IN ( SELECT DISTINCT $db.productos_categorias.id_producto FROM $db.productos_categorias WHERE id_categoria = ? ) AND borrado != '1' AND creado_por = ? AND portada IS NOT NULL UNION 
					SELECT DISTINCT $db.productos.id, $db.productos.nombre_producto, $db.productos.url_producto, $db.productos.otros_campos AS properties, '' AS notBackgroundImage, 'image/png' AS elementType FROM $db.productos WHERE id IN ( SELECT DISTINCT $db.productos_categorias.id_producto FROM $db.productos_categorias WHERE id_categoria = ? ) AND borrado != '1' AND creado_por = ? AND portada IS NULl;", [ $id_subcategoria, $id_usuario, $id_subcategoria, $id_usuario ], UtilModel::UTIL_MODEL_QUERY_SELECT, UtilModel::UTIL_MODEL_RETURN_TYPE_ASSOC, false ));
					die();
				}
			break;
			case 15: // Carga subcategorías que tengan un nombre parecido al pasado como parámetro y sean creados por el usuario que busca ( o compartidos en un futuro )
				if(isset($_SESSION[u_id]) && strlen($_SESSION[u_id]) > 0){
					$id_usuario = $_SESSION[u_id]; $id_categoria = $_POST[id_categoria]; $nombre_elemento = "%" . $_POST[nombre_elemento] . "%";
					echo json_encode($conexion->query( "SELECT DISTINCT $db.productos.id, $db.productos.nombre_producto FROM $db.productos WHERE nombre_producto LIKE ? AND borrado != '1' AND creado_por = ? AND $db.productos.id NOT IN ( SELECT $db.productos_categorias.id_producto FROM $db.productos_categorias WHERE id_categoria = ? );", [ $nombre_elemento, $id_usuario, $id_categoria ], UtilModel::UTIL_MODEL_QUERY_SELECT, UtilModel::UTIL_MODEL_RETURN_TYPE_ASSOC, false ));
					die();
				}
			break;
			case 16: // Crea un nuevo producto
				if(isset($_SESSION[u_id]) && strlen($_SESSION[u_id]) > 0){
					$id_usuario = $_SESSION[u_id]; $id_subcategoria = $_POST[id_subcategoria]; $nombre_elemento = $_POST[nombre_elemento]; $otros_campos =	$_POST[otros_campos]; $url_productos = $url_file_save;
					$id_producto_insertado = $conexion->query( "INSERT INTO $db.productos ( id_categoria, nombre_producto, creado_por, fecha_creacion, borrado, url_producto, otros_campos ) VALUES ( ?, ?, ?, now(), '0', '', ? );", [ $id_subcategoria, $nombre_elemento, $id_usuario, $otros_campos ], UtilModel::UTIL_MODEL_QUERY_INSERT );
					if($id_producto_insertado != 0){
						$generar_ruta_recursos = opendir($url_productos);
						$ruta_recursos_productos = $url_productos . "/" . $id_producto_insertado;
						if(mkdir($ruta_recursos_productos, 0777, true) && count($_FILES["file"]["name"]) > 0){
							$aux = 0;
							foreach($_FILES["file"]["name"] as $nombre_recurso_producto_actual){
								$ruta_recurso_temporal_actual = $_FILES["file"]["tmp_name"][$aux];
								$tipo_recurso_actual = $_FILES["file"]["type"][$aux];
								$tamano_recurso_actual = $_FILES["file"]["size"][$aux];
									foreach($recursos_permitidos as $recurso_permitido_actual){
										if(strcmp($tipo_recurso_actual, $recurso_permitido_actual) == 0 && $tamano_recurso_actual < $tamano_recursos_permitido){
											move_uploaded_file($ruta_recurso_temporal_actual, $ruta_recursos_productos . "/" . $nombre_recurso_producto_actual);
										}else{
											// El recurso no se ha insertado
										}
									}
								$aux++;
							}
						}
						$conexion->query( "UPDATE $db.productos SET url_producto = '$ruta_recursos_productos' WHERE ID = ?;", [ $id_producto_insertado ], UtilModel::UTIL_MODEL_QUERY_UPDATE );
						echo $id_producto_insertado;
					}else{
						echo 0;
					}
					
					$conexion->query( "INSERT INTO $db.productos_categorias ( id_categoria, id_producto, borrado ) VALUES ( ?, ?, '0' );", [ $id_subcategoria, $id_producto_insertado ], UtilModel::UTIL_MODEL_QUERY_INSERT );
					die();
				}
			break;
			case 17: // Inserta la portada de un producto
				$id_producto = $_POST[id_subcategoria]; $url_productos = $url_file_save; $ruta_recursos_productos_portada = $url_productos . "/" . $id_producto . "/portada";
				if(!file_exists($ruta_recursos_productos_portada) && !is_dir($ruta_recursos_productos_portada)) mkdir($ruta_recursos_productos_portada, 0777, true);
				$aux = 0;
				foreach($_FILES["file"]["name"] as $nombre_recurso_producto_actual){
					$ruta_recurso_temporal_actual = $_FILES["file"]["tmp_name"][$aux];
					$tipo_recurso_actual = $_FILES["file"]["type"][$aux];
					$tamano_recurso_actual = $_FILES["file"]["size"][$aux];
						foreach($recursos_permitidos as $recurso_permitido_actual){
							if(strcmp($tipo_recurso_actual, $recurso_permitido_actual) == 0 && $tamano_recurso_actual < $tamano_recursos_permitido){
								move_uploaded_file($ruta_recurso_temporal_actual, $ruta_recursos_productos_portada . "/" . $nombre_recurso_producto_actual);
								
							}else{
								// El recurso no se ha insertado
							}
						}
					$aux++;
					$conexion->query( "UPDATE $db.productos SET portada = ? WHERE ID = ?;", [ $nombre_recurso_producto_actual, $id_producto ], UtilModel::UTIL_MODEL_QUERY_UPDATE );
				}
				die();
			break;
			case 18: // Elimina un producto de una subcategoría
				$id_usuario = $_SESSION[u_id]; $id_categoria = $_POST[id_categoria]; $id_producto = $_POST[id_producto];
				$conexion->query( "DELETE FROM $db.productos_categorias WHERE id_producto = :id_producto AND id_categoria  IN ( SELECT id FROM $db.categorias WHERE id = :id_categoria AND id_usuario = :id_usuario ) ;", [ ":id_producto" => $id_producto, ":id_categoria" => $id_categoria, ":id_usuario" => $id_usuario ], UtilModel::UTIL_MODEL_QUERY_DELETE );
				die();
			break;
			case 19: // Carga los datos de un producto añadido ( y añade ) a una categoría a través de la 'búsqueda rápida'
				$id_usuario = $_SESSION[u_id];
				$id_producto = $_POST[id_producto];
				$id_categoria = $_POST[id_categoria];
				echo json_encode($conexion->query( "SELECT DISTINCT $db.productos.id, $db.productos.nombre_producto, $db.productos.url_producto, $db.productos.otros_campos AS properties, '' AS backgroundImage, 'image/png' AS elementType FROM $db.productos WHERE id IN ( SELECT DISTINCT $db.productos_categorias.id_producto FROM $db.productos_categorias WHERE $db.productos_categorias.id_categoria = ? && $db.productos_categorias.id_producto = ? ) AND borrado != '1' AND creado_por = ?;", [ $id_categoria, $id_producto, $id_usuario ], UtilModel::UTIL_MODEL_QUERY_SELECT, UtilModel::UTIL_MODEL_RETURN_TYPE_ASSOC ));
				die();
			break;
			case 20: // Obtiene los datos de un producto seleccionado, perteneciente a una categoría
				$id_usuario = $_SESSION[u_id]; $id_producto = $_POST[id_producto]; $id_categoria = $_POST[id_categoria]; $datos_mostrar =  []; $datos_recursos = [];
				//$datos_producto = $conexion->query( "SELECT $db.productos.ID AS id_producto, nombre_producto, fecha_creacion, url_producto, otros_campos, CASE portada WHEN portada = '' OR portada IS NULL THEN 'Sin portada' ELSE CONCAT('./recursos/', $db.productos.id, '/portada/', portada) END AS portada FROM $db.productos WHERE id IN ( SELECT id_producto FROM $db.productos_categorias WHERE id_categoria = ? AND id_producto = ? AND borrado != '1' ) AND creado_por = ? AND borrado != '1';", [ $id_categoria, $id_producto, $id_usuario ], UtilModel::UTIL_MODEL_QUERY_SELECT, UtilModel::UTIL_MODEL_RETURN_TYPE_ASSOC, false );
			
				$datos_producto = $conexion->query( "SELECT $db.productos.ID AS id_producto, nombre_producto, fecha_creacion, url_producto, otros_campos, CASE WHEN portada = '' OR portada IS NULL THEN CASE WHEN ( SELECT url_portada FROM $db.categorias WHERE $db.categorias.id = $db.productos.id_categoria ) IS NOT NULL && ( SELECT url_portada FROM $db.categorias WHERE $db.categorias.id = $db.productos.id_categoria ) != '' THEN ( SELECT url_portada FROM $db.categorias WHERE $db.categorias.id = $db.productos.id_categoria ) ELSE 'Sin portada' END ELSE CONCAT('./recursos/', $db.productos.id, '/portada/', portada) END AS portada FROM $db.productos WHERE id IN ( SELECT id_producto FROM $db.productos_categorias WHERE id_categoria = ? AND id_producto = ? AND borrado != '1' ) AND creado_por = ? AND borrado != '1';", [ $id_categoria, $id_producto, $id_usuario ], UtilModel::UTIL_MODEL_QUERY_SELECT, UtilModel::UTIL_MODEL_RETURN_TYPE_ASSOC, false );
				$ruta_recursos = "./recursos/$id_producto/";
				
				if(file_exists($ruta_recursos)){
					$carpeta_recursos = opendir($ruta_recursos);
					while($recurso_actual = readdir($carpeta_recursos)){
						switch(true){
							case strcmp($recurso_actual, ".") == 0:
							case strcmp($recurso_actual, "..") == 0:
							case strcmp($recurso_actual, "portada") == 0:
							break;
							default:
								if(!is_dir($recurso_actual)){
									array_push($datos_recursos, $ruta_recursos . "$recurso_actual");
								}
							break;
						}
					}
				}
				$datos_mostrar = $datos_producto[0];
				$datos_mostrar["recursos"] = $datos_recursos;
				echo json_encode($datos_mostrar);
				die();
			break;
			case 21:
				$datos_devolver = []; $id_usuario = $_SESSION[u_id];
				$datos_devolver = $conexion->query( "SELECT nombre, apellidos, email, $db.usuarios.estilo, $db.archivador_web_estilos.ALIAS, $db.archivador_web_estilos.COLOR_PRIMARIO, $db.archivador_web_estilos.COLOR_SECUNDARIO, $db.archivador_web_estilos.COLOR_TERCIARIO, CASE WHEN $db.usuarios.url_imagen_perfil_usuario IS NOT NULL && $db.usuarios.url_imagen_perfil_usuario != '' THEN $db.usuarios.url_imagen_perfil_usuario ELSE './assets/imgs/usuarios/usuario_sin_imagen.png' END AS url_imagen_perfil_usuario FROM $db.usuarios INNER JOIN $db.archivador_web_estilos ON $db.usuarios.estilo = $db.archivador_web_estilos.ID WHERE $db.usuarios.id = ?;", [ $id_usuario ], UtilModel::UTIL_MODEL_QUERY_SELECT, UtilModel::UTIL_MODEL_RETURN_TYPE_ASSOC );
				$datos_devolver["estilos"] = $conexion->query( "SELECT alias as alias, color_primario as color_primario, color_secundario as color_secundario, color_terciario as color_terciario FROM $db.archivador_web_estilos;", [ ], UtilModel::UTIL_MODEL_QUERY_SELECT, UtilModel::UTIL_MODEL_RETURN_TYPE_ASSOC, false );
				echo json_encode($datos_devolver);
				die();
			break;
			case 22: // Edita el perfil del usuario, modifica diferentes apartados ( imagen de perfil, nombre, apellidos y email )
				$id_usuario = $_SESSION[u_id]; $apartado = $_POST[apartado];
				switch(true){
					case strcmp($apartado, "imagen") == 0:
						$datos_imagen = $_FILES["imagen"]; $nombre_imagen = $datos_imagen["name"]; $peso_imagen = $datos_imagen["size"]; $mime_imagen = $datos_imagen["type"]; $ruta_temporal_imagen = $datos_imagen["tmp_name"];
						foreach($recursos_permitidos as $recurso_permitido_actual){
							if(strcmp($recurso_permitido_actual, $mime_imagen) == 0 && $peso_imagen < $tamano_recursos_permitido){
								$ruta_imagen = $conexion->query( "SELECT url_perfil_usuario FROM $db.usuarios WHERE ID = ?;", [ $id_usuario ]);
								$ruta_imagen_usuario = $ruta_imagen . "/" . $nombre_imagen;
								if(move_uploaded_file($ruta_temporal_imagen, $ruta_imagen_usuario)){
									$conexion->query( "UPDATE $db.usuarios SET url_imagen_perfil_usuario = ? WHERE ID = ?;", [ $ruta_imagen_usuario, $id_usuario ], UtilModel::UTIL_MODEL_QUERY_UPDATE );
									echo 1;
								}
							}
						}
					break;
					case strcmp($apartado, "datos_usuario") == 0:
						$nombre_usuario = $_POST[nombre_usuario]; $apellidos_usuario = $_POST[apellidos_usuario]; $email_usuario = $_POST[email_usuario];
						$conexion->query( "UPDATE $db.usuarios SET nombre = ?, apellidos = ?, email = ? WHERE ID = ?;", [ $nombre_usuario, $apellidos_usuario, $email_usuario, $id_usuario ], UtilModel::UTIL_MODEL_QUERY_UPDATE );
						echo "1";
					break;
				}
				die();
			break;
			case 23: /* Modifica apartados de un producto, como su portada, propiedades, recursos o título */
				$id_usuario = $_SESSION[u_id]; $id_producto = $_POST[id_producto]; $apartado = (int) $_POST[apartado];
				switch($apartado){
					case 1: // Modificar imagén de la portada
						$portada_modificada = false; $portada = $_FILES["portada"]; $ruta_temporal_portada = $portada["tmp_name"]; $peso_portada = $portada["size"]; $tipo_recurso_portada = $portada["type"]; $nombre_portada = preg_replace("[\ ]", "", $portada["name"]); $portada_error = $portada["error"];
						if(!$portada_error){
							foreach($recursos_permitidos as $recurso_permitido_actual){
								if(strcmp($tipo_recurso_portada, $recurso_permitido_actual) == 0 && $peso_portada < $tamano_recursos_permitido){
									$es_producto_usuario = ( $conexion->query( "SELECT COUNT(id) FROM $db.productos WHERE id = ? AND creado_por = ?;", [ $id_producto, $id_usuario ], UtilModel::UTIL_MODEL_QUERY_SELECT ) > 0 ) ? true : false;
									if($es_producto_usuario){
										$carpeta_recursos_producto = "./recursos/$id_producto/";
										if(!is_dir($carpeta_recursos_producto)){
											mkdir($carpeta_recursos_producto, 0777, true);
										}
										$carpeta_recursos_producto_portada = "./recursos/$id_producto/portada/";
										if(!is_dir($carpeta_recursos_producto_portada)){
											mkdir($carpeta_recursos_producto_portada, 0777, true);
										}
										
										//echo "$carpeta_recursos_producto_portada . $nombre_portada <br/>";
										//echo "$ruta_temporal_portada <br/>";
										$modificar_portada = move_uploaded_file($ruta_temporal_portada, $carpeta_recursos_producto_portada . $nombre_portada);
										if($modificar_portada){
											$conexion->query( "UPDATE $db.productos SET PORTADA = ? WHERE ID = ? AND creado_por = ?;", [ $nombre_portada, $id_producto, $id_usuario ], UtilModel::UTIL_MODEL_QUERY_UPDATE );
											$portada_modificada = true;
											echo 1;
										}
									}
								}
							}
						}
						if(!$portada_modificada){
							echo 0;
						}
						die();
					break;
					case 2: // Modificar título
						$titulo = $_POST[titulo];
						$conexion->query( "UPDATE $db.productos SET nombre_producto = ? WHERE id = ? AND creado_por = ?;", [ $titulo, $id_producto, $id_usuario ], UtilModel::UTIL_MODEL_QUERY_UPDATE );
						die();
					break;
					case 3: // Añadir un recurso
						$datos_devolver = []; $recurso_agregado = false; $recurso = $_FILES["recurso"]; $ruta_temporal_portada = $recurso["tmp_name"]; $peso_portada = $recurso["size"]; $tipo_recurso_portada = $recurso["type"]; $nombre_portada = preg_replace("[\ ]", "", $recurso["name"]); $portada_error = $recurso["error"];
						if(!$portada_error){
							foreach($recursos_permitidos as $recurso_permitido_actual){
								if(strcmp($tipo_recurso_portada, $recurso_permitido_actual) == 0 && $peso_portada < $tamano_recursos_permitido){
									$es_producto_usuario = ( $conexion->query( "SELECT COUNT(id) FROM $db.productos WHERE id = ? AND creado_por = ?;", [ $id_producto, $id_usuario ] ) > 0 ) ? true : false;
									if($es_producto_usuario){
										$carpeta_recursos_producto = "./recursos/$id_producto/";
										if(!is_dir($carpeta_recursos_producto)){
											mkdir($carpeta_recursos_producto, 0777, true);
										}
										$carpeta_recursos_producto_portada = "./recursos/$id_producto/";
										if(is_dir($carpeta_recursos_producto_portada)){
											mkdir($carpeta_recursos_producto_portada, 0777, true);
										}
										
										//echo "$carpeta_recursos_producto_portada . $nombre_portada <br/>";
										//echo "$ruta_temporal_portada <br/>";
										$url_recurso = $carpeta_recursos_producto_portada . $nombre_portada;
										$agregar_recurso = move_uploaded_file($ruta_temporal_portada, $url_recurso);
										if($agregar_recurso){
											$recurso_agregado = true; $datos_devolver["url_recurso"] = $url_recurso; $datos_devolver["completado"] = 1;
										}
									}
								}
							}
						}
						if(!$recurso_agregado){
							$datos_devolver["completado"] = 0;
						}
						echo json_encode($datos_devolver);
						die();
					break;
					case 4: // Eliminar un recurso 
						$recurso_eliminado = false; $url_recurso = $_POST[recurso]; $id_producto_url_recurso = (int) ( explode("/", $url_recurso)[ ( count( explode("/", $url_recurso) ) - 2 ) ] ); $id_producto = (int) $_POST[id_producto];
						if($id_producto_url_recurso == $id_producto && strcmp($id_producto, "") != 0 && strcmp($id_producto_url_recurso, "") != 0){
							$es_recurso_de_producto_usuario = ( $conexion->query( "SELECT COUNT(*) FROM $db.productos WHERE (ID = ? && ID = ? ) && creado_por = ?;", [ $id_producto, $id_producto_url_recurso, $id_usuario ] ) > 0) ? true : false;;
							if($es_recurso_de_producto_usuario){
								echo 1;
								$recurso_eliminado = true;
								unlink($url_recurso);
							}
						}
						
						if(!$recurso_eliminado){
							echo 0;
						}
						
						die();
					break;
					case 5: // Modifica una propiedad
						$propiedades_otros_campos = $_POST[otros_campos]; $id_producto = $_POST[id_producto];
						$conexion->query( "UPDATE $db.productos SET otros_campos = ? WHERE creado_por = ? AND id = ?;", [ $propiedades_otros_campos, $id_usuario, $id_producto ], UtilModel::UTIL_MODEL_QUERY_UPDATE );
						die();
					break;
				}
			break;
			case 24: // Obtiene las listas creadas de un usuario, junto con su información ( necesaria )returnFormdata
				$id_usuario = $_SESSION[u_id];
				echo json_encode($conexion->query( "SELECT DISTINCT alias_lista.id AS __id, alias_lista.nombre_lista, alias_lista.fecha_creacion, ( SELECT COUNT(*) FROM $db.categorias_listas AS alias_categorias_lista WHERE id_lista = alias_lista.id AND alias_categorias_lista.id_categoria IN ( SELECT DISTINCT id FROM $db.categorias WHERE id_usuario = ? AND borrado != '1' AND $db.categorias.id = alias_categorias_lista.id_categoria ) ) AS numero_categorias, ( SELECT CASE WHEN AVG(valoracion) IS NULL THEN 0 ELSE ROUND(AVG(valoracion), 2) END FROM $db.listas_valoraciones WHERE id_lista = alias_lista.id ) AS valoracion_media, alias_lista.valoracion AS valoracion_lista FROM $db.listas AS alias_lista WHERE creado_por = ? AND alias_lista.borrado != '1';", [ $id_usuario, $id_usuario ], UtilModel::UTIL_MODEL_QUERY_SELECT, UtilModel::UTIL_MODEL_RETURN_TYPE_ASSOC, false ), false);
				die();
			break;
			case 25: // Crea una nueva lista
				$id_usuario = $_SESSION[u_id]; $nombre_lista = $_POST[nombre_lista]; $descripcion_lista = $_POST[descripcion_lista];
				$crear_lista = "INSERT INTO $db.listas ( nombre_lista, descripcion_lista, creado_por, fecha_creacion ) VALUES ( '$nombre_lista', '$descripcion_lista', '$id_usuario', now() );";
				$statement = $conexion->query($crear_lista, []);
				die();
			break;
			case 26: // Obtiene datos básicos de una sesión para guardar en el localStorage del navegador
				$id_usuario = $_SESSION[u_id]; $fecha_inicio_sesion = $_SESSION["fecha_inicio_sesion"];
				echo json_encode($conexion->query("SELECT $db.usuarios.nombre, CONCAT( $db.usuarios.nombre, ' ', $db.usuarios.apellidos ) AS nombre_completo, ? AS fecha_inicio_sesion, '1' AS sesion_iniciada FROM $db.usuarios WHERE id = ?;", [ $fecha_inicio_sesion, $id_usuario ], UtilModel::UTIL_MODEL_QUERY_SELECT, UtilModel::UTIL_MODEL_RETURN_TYPE_ASSOC, true));
				die();
			break;
			case 27: // Devuelve cuantas listas tienes creadas, cuantas categorías, subcategorías, productos y si tienes establecida una foto de perfil.
				$id_usuario = $_SESSION[u_id];
				echo json_encode($conexion->query("SELECT DISTINCT ( SELECT COUNT(*) FROM $db.categorias WHERE categoria_padre = '0' AND borrado != '1' AND id_usuario = ? ) AS categorias_iniciales, ( SELECT COUNT(*) FROM $db.categorias WHERE categoria_padre != '0' AND borrado != '1' AND id_usuario = ? ) AS subcategorias, ( SELECT COUNT(*) FROM $db.productos WHERE borrado != '1' AND creado_por = ? ) AS productos_creados, ( SELECT COUNT(*) FROM $db.listas WHERE creado_por = ? AND borrado != '1' ) AS listas, ( SELECT CASE WHEN url_perfil_usuario IS NULL OR url_perfil_usuario = '' THEN 0 ELSE 1 END FROM $db.usuarios WHERE id = ? ) as imagen_perfil_usuario_agregada FROM $db.categorias LIMIT 1;", [ $id_usuario, $id_usuario, $id_usuario, $id_usuario, $id_usuario ], UtilModel::UTIL_MODEL_QUERY_SELECT, UtilModel::UTIL_MODEL_RETURN_TYPE_ASSOC, true));
				die();
			break;
			case 28: // Devuelve los datos de una subcategoría actual para editarla.
				$id_usuario = $_SESSION[u_id]; $id_subcategoria = $_POST[id_subcategoria];
				echo json_encode($conexion->query("SELECT descripcion_categoria AS titulo, CASE WHEN url_portada IS NULL OR url_portada = '' THEN './assets/imgs/categoria_vacia.png' ELSE url_portada END AS url_portada FROM $db.categorias WHERE categoria_padre != '0' AND id_usuario = ? AND borrado != '1' AND id = ?;", [ $id_usuario, $id_subcategoria ], UtilModel::UTIL_MODEL_QUERY_SELECT, UtilModel::UTIL_MODEL_RETURN_TYPE_ASSOC, true));
				die();
			break;
			case 29: // Modifica apartados de una subcategoría ( titulo o portada )
				$id_usuario = $_SESSION[u_id];
				$apartado = $_POST[apartado];
				$id_subcategoria = (int) $_POST[id_subcategoria];
				if(strcmp("", $id_subcategoria) != 0){
					switch($apartado){
						case "titulo": // Título
							$titulo = $_POST[titulo];
							$conexion->query( "UPDATE $db.categorias SET descripcion_categoria = ? WHERE id_usuario = ? AND borrado != '1' AND categoria_padre != '0' AND id = ?;", [ $titulo, $id_usuario, $id_subcategoria ], UtilModel::UTIL_MODEL_QUERY_UPDATE );
						break;
						case "imagen": // Portada
							$portada = $_FILES["imagen"]; $nombre_portada = $portada["name"]; $tamano_portada = $portada["size"]; $tipo_archivo_portada = $portada["type"]; $ruta_temporal_portada = $portada["tmp_name"]; $error_portada = $portada["error"];
							if(!$error_portada){
								foreach($recursos_permitidos as $recurso_permitido_actual){
									if(strcmp($recurso_permitido_actual, $tipo_archivo_portada) == 0 && $tamano_portada <= $tamano_recursos_permitido){
										$ruta_recursos_subcategorias = "./recursos_subcategorias/$id_subcategoria";
										if(!file_exists($ruta_recursos_subcategorias) && !is_dir($ruta_recursos_subcategorias)){
											$conexion->query( "UPDATE $db.categorias SET url_recursos = ? WHERE id_usuario = ? AND borrado != '1' AND categoria_padre != '0' AND id = ?;", [ $ruta_recursos_subcategorias, $id_usuario, $id_subcategoria ], UtilModel::UTIL_MODEL_QUERY_UPDATE );
											mkdir( $ruta_recursos_subcategorias, 0777, true );
										}
										$ruta_portada_subcategorias = $ruta_recursos_subcategorias . "/portada";
										if(!file_exists($ruta_portada_subcategorias) && !is_dir($ruta_portada_subcategorias)) mkdir( $ruta_portada_subcategorias, 0777, true );
										
										$url_portada = $ruta_portada_subcategorias . DIRECTORY_SEPARATOR . $nombre_portada;
										move_uploaded_file($ruta_temporal_portada, $url_portada);
										$conexion->query( "UPDATE $db.categorias SET url_portada = ? WHERE id_usuario = ? AND borrado != '1' AND categoria_padre != '0' AND id = ?;", [ $url_portada, $id_usuario, $id_subcategoria ], UtilModel::UTIL_MODEL_QUERY_UPDATE );
										mkdir( $ruta_portada_subcategorias, 0777, true );
										echo 1;
									}
								}
							}
						break;
					}
				}
				die();
			break;
			case 30: // Devuelve la portada de una subcateogría
				$id_usuario = $_SESSION[u_id]; $id_subcategoria = $_POST[id_subcategoria];
				if(strcmp($id_subcategoria, "") != 0){
					echo json_encode( $conexion->query( "SELECT CASE WHEN url_portada IS NULL OR url_portada = '' THEN './assets/imgs/categoria_vacia.png' ELSE url_portada END AS url_portada FROM $db.categorias WHERE id = ? AND id_usuario = ? AND borrado != '1' AND categoria_padre != '1' AND tipo_categoria = '2';", [ $id_subcategoria, $id_usuario ], UtilModel::UTIL_MODEL_QUERY_SELECT, UtilModel::UTIL_MODEL_RETURN_TYPE_ASSOC, true ) );
				}
				die();
			break;
			case 31: // Actualiza la puntuación de una lista
				$puntuacion = $_POST[puntuacion]; $id_usuario = $_SESSION[u_id]; $id_lista = $_POST[id_lista];
				$conexion->query( "UPDATE $db.listas SET valoracion = ? WHERE id = ? AND creado_por = ? AND borrado != '1';", [ $puntuacion, $id_lista, $id_usuario ], UtilModel::UTIL_MODEL_QUERY_UPDATE );						
				die();
			break;
			case 32:
				$id_usuario = $_SESSION[u_id]; $id_lista = $_POST[id_lista];
				$conexion->query( "UPDATE $db.listas SET borrado = '1' WHERE id = ? AND creado_por = ?;", [ $id_lista, $id_usuario ], UtilModel::UTIL_MODEL_QUERY_UPDATE );						
				die();
			break;
			default:
				header("Location: index.php");
				die();
			break;
		}
				header("Location: index.php");
				die();
	}else{
		//header("Location: index.php");
		//die();
	}
	
	/*
		
		Cargar productos de una subcategoría
		
	*/
	
	if(count($_GET) > 0){
		
		$accion = (int) $_GET[accion];
		
		switch($accion){
			case 1:
				if(isset($_SESSION[u_id]) && strlen($_SESSION[u_id]) > 0){
					$id_subcategoria = $_GET[id_subcategoria]; $id_usuario = $_SESSION[u_id];
					echo json_encode($conexion->query("SELECT DISTINCT $db.productos.id, $db.productos.nombre_producto, $db.productos.url_producto, $db.productos.otros_campos AS properties, CONCAT('./recursos/', $db.productos.id, '/portada/', portada ) AS backgroundImage, 'image/png' AS elementType FROM $db.productos WHERE id IN ( SELECT DISTINCT $db.productos_categorias.id_producto FROM $db.productos_categorias WHERE id_categoria = ? ) AND borrado != '1' AND creado_por = ? AND portada IS NOT NULL UNION 
					SELECT DISTINCT $db.productos.id, $db.productos.nombre_producto, $db.productos.url_producto, $db.productos.otros_campos AS properties, '' AS backgroundImage, 'image/png' AS elementType FROM $db.productos WHERE id IN ( SELECT DISTINCT $db.productos_categorias.id_producto FROM $db.productos_categorias WHERE id_categoria = ? ) AND borrado != '1' AND creado_por = '$id_usuario' AND portada IS NULl;", [ $id_subcategoria, $id_usuario, $id_subcategoria ], UtilModel::UTIL_MODEL_QUERY_SELECT, UtilModel::UTIL_MODEL_RETURN_TYPE_ASSOC, false));
					die();
				}
			break;
			case 2: // Obtiene los elementos de una subcategoría
				if(isset($_SESSION[u_id]) && strlen($_SESSION[u_id]) > 0){
					$id_lista = $_GET[id_lista]; $id_usuario = $_SESSION[u_id];
					echo json_encode($conexion->query("SELECT alias_categorias.id, 'image/png' AS elementType, alias_categorias.descripcion_categoria AS nombre_producto FROM $db.categorias AS alias_categorias INNER JOIN $db.categorias_listas ON $db.categorias_listas.id_categoria = alias_categorias.id INNER JOIN $db.listas ON $db.listas.id = $db.categorias_listas.id_lista WHERE creado_por = ? AND alias_categorias.borrado != '1' AND listas.borrado != '1' AND categoria_padre = '0' AND id_lista = ?;", [ $id_usuario, $id_lista ], UtilModel::UTIL_MODEL_QUERY_SELECT, UtilModel::UTIL_MODEL_RETURN_TYPE_ASSOC, false));
					die();
				}
			break;
		}
		
	}
	header("Location: login.php");
	die();
?>