function getGalerias(){ // Obtiene las categorias
	return send("POST", "backend.php", returnFormData({ "accion" : 3 }), "json");
}

function mostrarCategorias(categorias, $galeriasContainer){ // Una vez obtenidas las categorías, las va añadiendo al DOM
	$galeriasContainer.append("<div class='row'><div class='col-md-12'><button class='btn btn-block bg-dark text-white call_modal_crear_galeria'> Crear galería </button><hr/></div></div>");
	$.map(categorias, (value, index) => {
		var nombre_categoria = value["descripcion_categoria"];
		var id_categoria = value["id"];
		$galeriasContainer.append(`
			<div class='row'>
				<div class='col-md-12 categoria_container' data-id-categoria='` + id_categoria + `'>
				<label class='titulo_categoria '>` + nombre_categoria +  `</label>
					<button style='float: right;' class='btn bg-danger eliminar_galeria text-white'> Eliminar galería </button>
				</div>
			</div>`);
	});
}


function funcionCategorias(){ // Ejecuta toda la funcionalidad para mostrar las categorías, obtenerlas, etc
	var galerias_creadas = getGalerias();
	var $div_galerias = $("#galerias_creadas");
	$div_galerias.html("");
	if(galerias_creadas.length > 0){
		mostrarCategorias(galerias_creadas, $div_galerias);
	}else{
		$div_galerias.html("<p>Aun no has creado ninguna galería. </p> <button class='btn bg-dark text-white call_modal_crear_galeria btn-block'>Crear galería</button> <br/>");
	}
}

$(document).ready(function(){
	funcionCategorias();
});