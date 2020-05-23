function obtenerElementos( id_subcategoria = 0 ){
	return send("POST", "backend.php", returnFormData({ "accion" : 14, "id_subcategoria" : id_subcategoria }), "json");
}

function obtenerTituloSubcategoria( id_subcategoria = null){
	if((isNaN(parseInt((id_subcategoria)))) || id_subcategoria == null || id_subcategoria == undefined || String(id_subcategoria).localeCompare("") == 0){
		return "[ Categoría sin nombre ]";
	}
	return String(send("POST", "backend.php", returnFormData({ "accion" : 13, "id_subcategoria" : id_subcategoria }), "json")[0]["titulo"]);
}

function pintarTitulo(){
	var id_subcategoria = getUrlParam("id_subcategoria");
	$(document).find(".page_title").html(obtenerTituloSubcategoria(id_subcategoria));
}

function generarEstructuraInicial(numeroElementosExistentes = 0){
	$contenedorInicial = $(document).find("#edicion_subcategoria_container");
	if(numeroElementosExistentes > 0){
		//$contenedorInicial.html("<div class='row'><div class='col-md-12'><button class='call_modal_crear_elementos btn btn-block bg-dark text-white'> Crear / Añadir elementos </button><br/></div></div><div class='row'><div class='col-md-12'><p><input type='text' class='form-control' placeholder='    Busca elementos... ' /><icon style='color: #999; position: absolute; top: 8.5px; left: 20px;' class='input-helper material-icons'>search</icon></p><hr/></div></div>");
		$contenedorInicial.html("<div class='row'><div class='col-md-12'><button class='call_modal_crear_elementos btn btn-block bg-dark text-white'> Crear / Añadir elementos </button><br/></div></div>");
	}else{
		$contenedorInicial.html("<div class='row'><div class='col-md-12'><p>Aún no has creado ningún elemento dentro de esta subcategoría. </p><hr /><button class='call_modal_crear_elementos btn btn-block bg-dark text-white'> Crear / Añadir elementos </button><br/></div></div>");
	}
	
	$contenedorInicial.append("<div class='row'><div class='col-md-12' id='edicion_elementos_subcategoria_container'></div></div>");
	
}

function pintarElementos(elementos = null){
	$pintarElementosContainer = $(document).find("#edicion_subcategoria_container");
	if( elementos.length == undefined || elementos.length == 0 || elementos == null || elementos == undefined || String(elementos).localeCompare("") == 0){
		
	}
}

function pintarEstructura(){
	let id_subcategoria = getUrlParam("id_subcategoria");
	let elementos = obtenerElementos( id_subcategoria );
	generarEstructuraInicial(elementos.length);
	pintarElementos(elementos);
	inicializarVisualizadorElementos($("#edicion_elementos_subcategoria_container"));
}

function crearElementoAgregarPortada( id_elemento_creado = null ){
	$("#modal_crear_elementos .accion").val(17);
	if(id_elemento_creado != 0 && id_elemento_creado != null){
		if($("#dropzone_portada")[0].dropzone.files.length > 0){
			if($("#dropzone_portada").closest("form").find("#elemento_creado_recientemente").length == 0){
				$("#dropzone_portada").closest("form").append("<input type='hidden' id='elemento_creado_recientemente' value='" + id_elemento_creado + "'>");
			}else{
				$("#dropzone_portada").closest("form").find("#elemento_creado_recientemente").val(id_elemento_creado);
			}
			$("#dropzone_portada")[0].dropzone.processQueue();
		}
	}else{
		alert("Se ha producido un error al añadir portada al producto creado.");
	}
}

function agregarElementoCreado(elemento){
	window['sjVisualElements'].insert($("#edicion_elementos_subcategoria_container"), elemento, { position : 0 });
}

// Esta función deja los parámetros que se encuentran en el form de la misma forma que se encontraban en un principio, para volver a poder crear elementos 
function modificarParametrosCrearElemento(){
	$("#modal_crear_elementos").find(".accion").val(16);
	if($("#dropzone_portada").closest("form").find("#elemento_creado_recientemente")) $("#dropzone_portada").closest("form").find("#elemento_creado_recientemente").remove();
}

function crearElemento($_container){
	if($("#dropzone")[0].dropzone.files.length > 0){
		$("#dropzone")[0].dropzone.processQueue();
	}else{
		modificarParametrosCrearElemento();
		var $container = $_container;
		var formData = new FormData();
		formDataGetted = $container.closest("form")[0].getFormData(); // Cada dropzone que creemos, tendremos que crearlo dentro de un formulario, para que cuando podamos obtener los parametros que queramos de ese formulario creando una funcion dentro de él, y llamándola cuando sea necesario. Esta función devolverá los parámetros que nos interese del formulario en un objeto formdata.
		if(formDataGetted != null && formDataGetted != undefined && String(typeof(formDataGetted)).localeCompare("object") == 0 && formDataGetted.forEach != undefined){
			formDataGetted.forEach( ( value, index ) => {  if(formData.get(index) == null || formData.get(index) == undefined) formData.append(index, value); }, true);
		}
		// LLamar plugin para repintar elementos
		var id_elemento_creado = send("POST", "backend.php", formData, "html");
		crearElementoAgregarPortada(id_elemento_creado);
	}
	
	if($("#dropzone_portada")[0].dropzone.files.length > 0){
		
	}
	
	modificarParametrosCrearElemento();
	pintarEstructura();
	inicializarVisualizadorElementos($("#edicion_elementos_subcategoria_container"));
	limpiarForm($_container);
}

function init(){
	pintarTitulo();
	pintarEstructura();
	inicializarDropzone("#dropzone", {  }, [ modificarParametrosCrearElemento, crearElementoAgregarPortada ]);
	inicializarDropzone("#dropzone_portada", { numero_archivos : 1, tipos_archivos_permitidos : [ "image/png", "image/jpg", "image/jpeg", "image/gif"  ] }, [ modificarParametrosCrearElemento ] );
	//inicializarDropzone("#dropzone_portada", { numero_archivos : 1, tipos_archivos_permitidos : [ "image/png", "image/jpg", "image/jpeg", "image/gif"  ] }, crearElementoAgregarPortada );
}

$(document).ready(function(){
	init();
});