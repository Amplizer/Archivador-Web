
function cargarDatosUsuario(){
	return send("POST", "backend.php", returnFormData({ accion : 27 }), "json");
}

function datosOpcionesPerfil( imagen_seleccionada ){
	if(imagen_seleccionada & ( imagen_seleccionada == 0 )){
		return "<div class='row'><div class='col-md-12'><p>Aun no has añadido ninguna imagen. <strong> <a class='text-dark' href='./perfil.php'> Haz click aquí para editar tu perfil. </a> </strong></p></div></div>";
	}else{
		return "";
	}
}

function cargarDatosListas( numero_listas ){
	if(numero_listas & numero_listas == 0){
		return "<div class='row'><div class='col-md-12'><p> Aún no has creado ninguna lista. <strong> <a class='text-dark' href='./listas_creadas.php'> Haz click aquí para crear una lista. </a> </strong> </p></div></div>";
	}else{
		return "<div class='row'><div class='col-md-12'><p>Has creado " + numero_listas + " listas. <strong> <a class='text-dark' href='./listas_creadas.php'> Haz click aquí para crear otra lista. </a> </strong> </p></div></div>";
	}
}

function cargarDatosCategorias( numero_categorias_iniciales, numero_categorias_hijas ){
	var htmlCategoriasYSubcategorias = "";
	if(numero_categorias_iniciales & numero_categorias_iniciales == 0){
		htmlCategoriasYSubcategorias += "<div class='row'><div class='col-md-12'><p> No has creado categorías aún. <strong> <a class='text-dark' href='./archivar.php'> Haz click aquí para crear una categoría. </a> </strong> </p></div></div>";
	}else{
		htmlCategoriasYSubcategorias += "<div class='row'><div class='col-md-12'><p>Has creado " + numero_categorias_iniciales + " galerías. <strong> <a class='text-dark' href='./archivar.php'> Haz click aquí para crear otra categoría. </a> </strong> </p></div></div>";
	}
	if(numero_categorias_hijas & numero_categorias_hijas == 0){
		htmlCategoriasYSubcategorias += "<div class='row'><div class='col-md-12'><p> Aún no has creado ninguna subcategoría. </p></div></div>";
	}else{
		htmlCategoriasYSubcategorias += "<div class='row'><div class='col-md-12'><p>Has creado " + numero_categorias_hijas + " subcategorías ( tienes que crearlas dentro de las categorías ). </p></div></div>";
	}
	return htmlCategoriasYSubcategorias;
}

function cargarProductos( numero_productos ){
	if(numero_productos & numero_productos == 0){
		return "<div class='row'><div class='col-md-12'><p> Aún no has creado ningún producto. Para crear productos tienes que crear categorías y subcategorías. Si quieres crear una categoría haz click <strong> <a class='text-dark' href='./archivar.php'>  aquí. </a> </strong> </p></div></div>";
	}else{
		return "<div class='row'><div class='col-md-12'><p> Has creado " + numero_productos + " productos ( tienes que crearlas dentro de las subcategorías ). </p></div></div>";
	}
}

function establecerTitulo(){
	$(".jumbotron:eq(0) h4").html(" Bienvenid@ " + localStorageUtils.getProperty("nombre") + "." );
}

function cargarEstructuraInicial(){
	var datos_usuario = cargarDatosUsuario();
	//$("#contenedor_principal").html( cargarDatosListas( datos_usuario["listas"] ) + cargarDatosCategorias(  datos_usuario["categorias_iniciales"], datos_usuario["subcategorias"] ) + cargarProductos( datos_usuario["productos_creados"] ) + datosOpcionesPerfil( datos_usuario["imagen_perfil_usuario_agregada"] ) );
	$("#contenedor_principal").html( cargarDatosCategorias(  datos_usuario["categorias_iniciales"], datos_usuario["subcategorias"] ) + cargarProductos( datos_usuario["productos_creados"] ) + datosOpcionesPerfil( datos_usuario["imagen_perfil_usuario_agregada"] ) );
}

$(document).ready(function(){
	establecerTitulo();
	cargarEstructuraInicial();
});