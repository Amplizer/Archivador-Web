<?php require "conexion.php";
	$ruta_actual = explode("/", $_SERVER["PHP_SELF"])[ (count(explode("/", $_SERVER["PHP_SELF"])) - 1) ];
	
	$sesion_iniciada = $_SESSION[sesion_iniciada];
	if(strlen($sesion_iniciada) == 0){
		switch(true){
			case strcmp($ruta_actual, "login.php") == 0:
			case strcmp($ruta_actual, "register.php") == 0: break;
			default:
				header("Location: login.php");
			break;
		}
	}else{
		switch(true){
			case strcmp($ruta_actual, "login.php") == 0:
			case strcmp($ruta_actual, "register.php") == 0:
				header("Location: index.php");
			break;
			default: break;
		}
	}
 ?>
<html>
	<head>
		<meta charset="utf-8" http-equiv="Content-Type">
		<title>Archivador web</title>
		
		<link rel="stylesheet" href="./assets/bootstrap/bootstrap.min.css" />
		<link rel="stylesheet" href="./assets/dropzone/dropzone.min.css" />
		<link rel="stylesheet" href="./assets/wysihtml5/wysihtml5.min.css" />
		<link rel="stylesheet" href="./assets/wysihtml5/wysihtml5.color.css" />
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
		<link rel="stylesheet" href="./assets/styles/styles.css" />
		<link rel="stylesheet" href="./assets/styles/sj_visual_elements.css" />
		<link rel="stylesheet" href="./assets/bootstrap/mdb.min.css" />
		
		
		<script src="./assets/jquery/jquery.min.js"></script>
		<script src="./assets/bootstrap/popper.min.js"></script>
		<script src="./assets/bootstrap/bootstrap.min.js"></script>
		<script src="./assets/local/visualizador_elementos.js"></script>
		<script src="./assets/local/ve_lang/eng.js"></script>
		<script src="./assets/dropzone/dropzone.min.js"></script>
		<script src="./assets/wysihtml5/wysihtml5.min.js"></script>
		<script src="./assets/wysihtml5/wysihtml5-bootstrap.js"></script>
		<script src="./assets/local/util.js"></script>
		<script src="./assets/local/eventos.js"></script>
		<script src="./assets/local/init_dropzone.js"></script>
		<script src="./assets/local/visualizador_elementos_init.js"></script>
		<script src="./assets/local/getFormData.js"></script>
		<script src="./assets/local/editar_elemento.js"></script>
		<script src="./assets/local/configuracion_basica.js"></script>
		<style>
		.nav-link{
			cursor: pointer;
		}
		</style>
	</head>
	<body>
		<nav class="navbar navbar-expand-lg navbar-light">
		  <a class="navbar-brand" href="#">Archivador </a>
		  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		  </button>
			
		  <div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav mr-auto">
				<?php
				$sesion_iniciada = $_SESSION[sesion_iniciada];
				if(strlen($sesion_iniciada) > 0){ ?>
			  <li class="nav-item <?php if(strcmp($ruta_actual, "index.php") == 0){ echo "active"; } ?>">
				<a class="nav-link" href="index.php">Inicio <span class="sr-only"> </span></a>
			  </li>
			  <li class="nav-item <?php if(strcmp($ruta_actual, "archivar.php") == 0){ echo "active"; } ?>">
				<a class="nav-link" href="archivar.php">Crear galerías <span class="sr-only"> </span></a>
			  </li>
			 <!--  <li class="nav-item <?php if(strcmp($ruta_actual, "listas_creadas.php") == 0){ echo "active"; } ?>">
				<a class="nav-link" href="listas_creadas.php">Listas creadas</a>
			  </li> -->
			  <li class="nav-item <?php if(strcmp($ruta_actual, "perfil.php") == 0){ echo "active"; } ?>">
				<a class="nav-link" href="perfil.php">Perfil</a>
			  </li>
			  <li class="nav-item">
				<a class="nav-link" href="logout.php">Cerrar sesión</a>
			  </li>
			  <?php
				}else{
				?>
			  <li class="nav-item <?php if(strcmp($ruta_actual, "login.php") == 0){ echo "active"; } ?>">
				<a href="login.php" class="nav-link "> Iniciar sesión </a>
			  </li>
			  <li class="nav-item <?php if(strcmp($ruta_actual, "register.php") == 0){ echo "active"; } ?>">
				<a href="register.php" class="nav-link "> Registrarse </a>
			  </li>	
				<?php
				}
			  ?>
			</ul>
		  </div>
		</nav>
		<div class="container-fluid">