function cargarSubGalerias(){ // Función con la que se cargan las subcategorías de una categoría actual a través de Ajax
	var id_categoria = getUrlParam("id_categoria");
	return send("POST", "backend.php", returnFormData({ "accion" : 7, "id_categoria" : id_categoria }), "json");
}

function obtenerNombreCategoriaActual(){ // Devuelve el nombre de la categoría actual según su nombre
	var id_categoria = getUrlParam("id_categoria");
	return send("POST", "backend.php", returnFormData({ "accion" : 8, "id_categoria" : id_categoria }), "json")[0]["descripcion_categoria"];
}

function pintarEstructuraBasica(){ // Pinta la estructurá básica de la aplicación
	var nombre_categoria_actual = obtenerNombreCategoriaActual();
	$("body").find(".page_title").html("Categoría - " + nombre_categoria_actual);
	pintarSubGalerias();
}

function pintarSubGalerias(){ // Función que se usa para pintar en el dom las subcategorías de la categoría actual
	var $subcategorías_container = $("#edicion_galeria_container");
	$subcategorías_container.html("");
	var subcategorías = cargarSubGalerias();
	if(subcategorías.length > 0){
		$subcategorías_container.append(`<div class='row'><div class='col-md-12'>
				<hr/>
				<button type='button' class='btn btn-block bg-dark text-white call_modal_crear_subcategoria'>Crear subcategoría</button>
				<hr/>
		</div></div>`);
		$.map(subcategorías, (value, index) => {
			var descripcion_subcategoria = value["descripcion_subcategoria"];
			var id_subcategoria = value["id"];
			var portada_subcategoria = value["url_portada"];
			$subcategorías_container.append(`<div class='row'>
				<divc class='col-md-12 subcategoria_container' data-id-subcategoria='` + id_subcategoria + `'>
					<img class='subcategorias-selector-imagenes editar_subcategoria' src='` + portada_subcategoria +  `'><label class='titulo_subcategoria'>` + descripcion_subcategoria + `</label><button style='float: right;' class='btn btn-danger eliminar_subcategoria text-white '> Eliminar subcategoría </button>
				</div>  
			</div>`);
		});
		$subcategorías_container.append("<br style='width: 100%; margin-top: 0px; margin-bottom: 15px; margin-left: 0px; margin-right: 0px;' />");
	}else{
		$subcategorías_container.html(`<div class='row'>
			<div class='col-md-12'>
				<p>Aun no has creado ninguna subcategoría. Para poder añadir elementos a tu galería, deberás crear como mínimo una subcategoría en la que poder añadirlos.</p>
			</div>
		</div>
		<div class='row'>
			<div class='col-md-12'>
				<hr/>
				<button type='button' class='btn btn-block bg-dark text-white call_modal_crear_subcategoria'>Crear subcategoría</button>
				<br/>
			</div>
		</div>`);
	}
}

$(document).ready(function(){
	pintarEstructuraBasica();
});