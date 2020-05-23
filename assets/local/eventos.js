function capturarEventos(){
	
	//Por si se rellama a la función, se desvincularán los posibles eventos vinculados recientemente
	
	$("body").off("click", ".call_modal_crear_galeria");
	$("body").off("click", ".crear_galeria");
	$("body").off("click", ".eliminar_galeria");
	$("body").off("click", ".eliminar_subcategoria");
	$("body").off("click", ".crear_subcategoria");
	$("body").off("click", ".call_modal_crear_elementos");
	$("body").off("keydown", ".nombre_elemento");
	$("body").off("click", ".crear_elemento");
	$("body").off("click", ".nuevo_campo");
	$("body").off("click", ".eliminar_campo_extra");
	
	$("body").on("click", ".call_modal_crear_galeria", function(e){ // Botón para crear galerias
		$("#modal_crear_galeria").modal("show");
	});
	$("body").on("click", ".crear_galeria", function(e){ // Botón para crear galerias
		e.preventDefault();
		var $formCrearGaleria = $(this).closest("form");
		var $errorContainer = $formCrearGaleria.find(".bg-danger");
		var nombre_galeria = $formCrearGaleria.find(".nombre_galeria").val();
		var caractersUse = "abcdefghijklmnopqrstuvwxyzñABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-_. +¿?¡!|@|#áéíóúÁÉÍÓÚ";
		var nombreMinLength = 1;
		var nombreMaxLength = 500;
		
		for(var a = 0; a < nombre_galeria.length; a++){
			var existe = false;
			for(var b = 0; b < caractersUse.length; b++){
				if(String(nombre_galeria[a]).localeCompare(String(caractersUse[b])) == 0){
					existe = true;
				}
			}
			if(!existe){
				$errorContainer.html("El nombre de la categoría contiene un carácter no permitido [ " + nombre_galeria[a] + " ].");
				$errorContainer.show();
				return false;
			}
		}
		
		if(String(nombre_galeria).length < 1 || String(nombre_galeria).length > 500){
			$errorContainer.html("El nombre de la categoría debe tener más de 1 carácter o menos de 500 carácteres.");
			$errorContainer.show();
			return false;
		}
		
		if(String(nombre_galeria).localeCompare("") == 0){
			$errorContainer.html("El nombre de la categoría no puede estar vacío.");
			$errorContainer.show();
			return false;
		}
		
		$formCrearGaleria.submit();
		
	});

	$("body").on("click", ".eliminar_subcategoria", function(e){ // Botones para eliminar galerías
		e.preventDefault();
		e.stopPropagation();
		if(confirm("¿Eliminar subcategoría?")){
			var $categoria_container = $(this).closest(".subcategoria_container");
			var id_subcategoria = $categoria_container.attr("data-id-subcategoria");
			send("POST", "backend.php", returnFormData({ "accion" : 10, "id_subcategoria" : id_subcategoria }), "html");
			pintarSubGalerias();
			//location.reload();
		}
	});
	
	
	$("body").on("click", ".eliminar_galeria", function(e){ // Botones para eliminar galerías
		e.preventDefault();
		e.stopPropagation();
		if(confirm("¿Eliminar categoría?")){
			var $categoria_container = $(this).closest(".categoria_container");
			var id_categoria = $categoria_container.attr("data-id-categoria");
			send("POST", "backend.php", returnFormData({ "accion" : 5, "id_categoria" : id_categoria }), "html");
			funcionCategorias();
			//location.reload();
		}
	});
	
	$("body").on("click", ".categoria_container", function(e){ // Botones para eliminar galerías
		e.preventDefault();
		e.stopPropagation();
		var id_categoria = $(this).attr("data-id-categoria");
		location.href = "./editar_galeria.php?id_categoria=" + id_categoria;
	});
	
	$("body").on("click", ".subcategoria_container", function(e){ // Botones para eliminar galerías
		e.preventDefault();
		e.stopPropagation();
		var id_subcategoria = $(this).attr("data-id-subcategoria");
		location.href = "./editar_subcategoria.php?id_subcategoria=" + id_subcategoria;
	});
	
	$("body").on("click", ".editar_subcategoria", function(e){
		e.preventDefault();
		e.stopPropagation();
		var id_subcategoria = $(this).closest(".subcategoria_container").attr("data-id-subcategoria");
		var datos_subcategoria = send("POST", "backend.php", returnFormData({ accion : 28, id_subcategoria : id_subcategoria }), "json");
		var portada_subcategoria = datos_subcategoria["url_portada"];
		var titulo_subcategoria = datos_subcategoria["titulo"];
		var $contenedor_edicion_subcategoria = $("#modal_editar_subcategoria .modal_editar_subcategoria_container");
		$contenedor_edicion_subcategoria.html("<p style='background-color: #e9ecef; padding-top: 15px; padding-bottom: 15px;  text-align: center;'> Título subcategoría </p><input type='text' class='form-control editar_subcategoria_titulo' data-id-subcategoria='" + id_subcategoria + "' value='" + titulo_subcategoria + "' placeholder='Nombre / Descripción de la subcategoría' /><br/><p style='background-color: #e9ecef; padding-top: 15px; padding-bottom: 15px; text-align: center;'><strong> Modificar imagen productos </strong></p><img  class='modificar_imagen_subcategoria' style='cursor: pointer; width: 100%; border-radius: 12px 12px; margin-bottom: 15px; ' src='" + portada_subcategoria + "' /><input type='file' data-id-subcategoria='" + id_subcategoria + "' style='display: none;' class='modificar_imagen_subcategoria_contenedor' ><hr/><button class='modificar_imagen_subcategoria btn btn-block btn-dark text-white'> Modificar imagen </button>");
		$("#modal_editar_subcategoria").modal("show");
		return false;
	});
	
	$("body").on("click", ".call_modal_crear_subcategoria", function(e){ // Botones para llamar al modal que proporciona interfaz para crear una subcategoría
		e.preventDefault();
		e.stopPropagation();
		$("#modal_crear_subcategoria").modal("show");
	});
	
	$("body").on("click", ".crear_subcategoria", function(e){ // Botones para llamar al modal que proporciona interfaz para crear una subcategoría
		e.preventDefault();
		var $formCrearGaleria = $(this).closest("form");
		var $errorContainer = $formCrearGaleria.find(".bg-danger");
		var nombre_galeria = $formCrearGaleria.find(".nombre_subcategoria").val();
		var caractersUse = "abcdefghijklmnopqrstuvwxyzñABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-_. +¿?¡!|@|#áéíóúÁÉÍÓÚ";
		var nombreMinLength = 1;
		var nombreMaxLength = 500;
		
		for(var a = 0; a < nombre_galeria.length; a++){
			var existe = false;
			for(var b = 0; b < caractersUse.length; b++){
				if(String(nombre_galeria[a]).localeCompare(String(caractersUse[b])) == 0){
					existe = true;
				}
			}
			if(!existe){
				$errorContainer.html("El nombre de la categoría contiene un carácter no permitido [ " + nombre_galeria[a] + " ].");
				$errorContainer.show();
				return false;
			}
		}
		
		if(String(nombre_galeria).length < 1 || String(nombre_galeria).length > 500){
			$errorContainer.html("El nombre de la categoría debe tener más de 1 carácter o menos de 500 carácteres.");
			$errorContainer.show();
			return false;
		}
		
		if(String(nombre_galeria).localeCompare("") == 0){
			$errorContainer.html("El nombre de la categoría no puede estar vacío.");
			$errorContainer.show();
			return false;
		}
		
		var id_categoria_padre = getUrlParam("id_categoria");
		
		if(id_categoria_padre != undefined && String(id_categoria_padre).localeCompare("") != 0 && id_categoria_padre != null){
			$formCrearGaleria.append("<input type='hidden' value='" + id_categoria_padre + "' name='id_categoria_padre' />");
			$formCrearGaleria.submit();
		}
		
	});
	
	$("body").on("click", ".call_modal_crear_elementos", function(e){ // Inicia el modal para crear elementos dentro de una subcategoría;
		e.preventDefault();
		e.stopPropagation();
		$("#modal_crear_elementos").modal("show");
	});
	
	$("body").on("keydown change", ".nombre_elemento", function(e){ // Permite buscar elementos de cualquier categoría ( pertenecientes al usuario ) para poder añadirlas a la categoría actual
		let nombre_elemento =  ( e.keyCode >= 32 /* espacio */ && e.keyCode <= 122 /* z */) ? $(this).val() + String.fromCharCode( e.keyCode ) : ( e.keyCode == 8 ) ? String($(this).val()).substr( 0, ( String($(this).val()).length - 1 ) ) : $(this).val();
		console.log("valor: " + $(this).val());
		let $container_elementos_cargados_previamente = $("#cargar_elementos_creados_previamente");
		$container_elementos_cargados_previamente.html("");
		if(e.keyCode == 8 && nombre_elemento.length == 0){
			$container_elementos_cargados_previamente.hide();
			$container_elementos_cargados_previamente.html("");
		}else{
			$container_elementos_cargados_previamente.show();
			$container_elementos_cargados_previamente.html("Cargando elementos previos...");
			let elementos_previos = send("POST", "backend.php", returnFormData({ "accion" : 15, "nombre_elemento" : nombre_elemento, id_categoria : getUrlParam("id_subcategoria") }), "json");
			if(elementos_previos.length > 0){
				$container_elementos_cargados_previamente.html("");
				$.map(elementos_previos, function(elemento, elementoIndex){
					var nombre_elemento = elemento["nombre_producto"];
					var id_elemento = elemento["id"];
					$container_elementos_cargados_previamente.append("<div data-id-elemento='" + id_elemento + "' class='elementos_previos_seleccion'>" + nombre_elemento + "</div><br/>");
				});
			}else{
				$container_elementos_cargados_previamente.html("No se han encontrado elementos según ese criterio.");
			}
		}
		
	});
	
	$("body").on("click", ".elementos_previos_seleccion", function(e){ // Añade un elemento ya seleccionado ( en caso de que no se haya añadido previamente, el mismo elemento a la misma subcategoría
		e.preventDefault();
		e.stopPropagation();
		let elemento_insertado = send("POST", "backend.php", returnFormData({ "accion" : 19, id_producto : $(this).attr("data-id-elemento"), id_categoria : getUrlParam("id_subcategoria") }), "json")[0];
		sjVisualElements.insert("#edicion_elementos_subcategoria_container", elemento_insertado, { position : 0 });
		$(this).remove();
	});
	
	$("body").on("click", ".crear_elemento", function(e){ // Crea un nuevo elemento, y la añade a la subcategoría seleccionada
		e.preventDefault();
		e.stopPropagation();
		crearElemento($(this));
		/*var $formElement = $(this).closest("form");
		var $otrosCamposContainer = $formElement.find("#otros_campos");
		var nombre_elemento = $formElement.find(".nombre_elemento").val();
		var otros_campos = {};
		$otrosCamposContainer.find(".otro_campo_container").each(function(){
			var nombre_campo = $(this).find(".otro_campo_nombre").val();
			var valor_campo = $(this).find(".otro_campo_valor").val();
			otros_campos[ nombre_campo ] = valor_campo;
		});
		var otros_campos = JSON.stringify(otros_campos);
		*/
	});
	
	$("body").on("click", ".nuevo_campo", function(e){ // Crea un nuevo elemento, y la añade a la subcategoría seleccionada
		e.preventDefault();
		e.stopPropagation();
		let $otros_campos_container = $("#otros_campos");
		
		if(String($otros_campos_container.html()).localeCompare("") == 0){
			$otros_campos_container.html("<hr/><h4>Otros campos</h4><br/><div class='alert alert-info'> Si añade otros campos, luego podrá realizar búsquedas de los productos a través de esos campos. </div>");
		}
		
		$otros_campos_container.append("<div class='otro_campo_container row'><div class='col-md-12'><hr/><input style='display: inline-block; width: 40%;' type='text' class='form-control otro_campo_nombre' placeholder='Nombre del campo'><input type='text' style='display: inline-block; margin-left: 5px !important; width: 40%;' class='otro_campo_valor form-control' placeholder='Valor'><button style='width: 15%; margin-left: 5px !important; margin-bottom: 5px !important;' class='btn btn-danger eliminar_campo_extra'>  <icon style=' display: inline-block;' class='material-icons'>delete</icon></button></div></div>");
	});
	
	$("body").on("click", ".eliminar_campo_extra", function(e){ // Elimina una propiedad de un elemento cuando se está creando ( el elemento )
		e.preventDefault();
		e.stopPropagation();
		if(confirm("¿Eliminar campo?")){
			$(this).closest(".otro_campo_container").remove();
		}
	});
		
	$("body").on("change", ".modificar_imagen_container", function(){
		var tipo_archivo = $(this)[0].files[0].type;
		switch(true){
			case "image/jpeg".localeCompare(tipo_archivo) == 0:
			case "image/jpeg".localeCompare(tipo_archivo) == 0:
			case "image/png".localeCompare(tipo_archivo) == 0:
				var imagen = $(this)[0].files[0];
				let imagen_modificada = send("POST", "backend.php", returnFormData({ "accion" : 22, "apartado" : "imagen", "imagen" : imagen }), "html");
				if(parseInt(imagen_modificada) == 1){
					cargarEstructuraInicial();
				}
			break;
			default:
				alert("El tipo de archivo que intenta añadir no está permitido.");
			break;
		}
		$(this).val(null);
	});
		
	$("body").on("click", ".modificar_imagen_perfil_usuario", function(){
		$("body .modificar_imagen_container").click();
	});
	
	$("body").on("click", ".modificar_datos_usuario", function(){
		var nombre_usuario = $(".editar_nombre").val(), apellidos_usuario = $(".editar_apellidos").val(), email_usuario = $(".editar_email").val();
		let datos_usuarios_modificados = send("POST", "backend.php", returnFormData({ "accion" : 22, "apartado" : "datos_usuario", "nombre_usuario" : nombre_usuario, "apellidos_usuario" : apellidos_usuario, "email_usuario" : email_usuario }), "html");
		if(parseInt(datos_usuarios_modificados) == 1){
			cargarEstructuraInicial();
		}
	});
	
	$("body").on("click", ".mostrar_modal_crear_lista", function(){
		$("#modal_crear_lista").modal("show");
	});
	
	$("body").on("click", ".crear_lista", function(){
		var $_this = $(this)
		var accion = 25;
		var nombre_lista = $_this.closest("form").find(".nombre_lista:eq(0)").val();
		var descripcion_lista = $_this.closest("form").find(".descripcion_lista:eq(0)").val();
		send("POST", "backend.php", returnFormData({ accion : 25, nombre_lista : nombre_lista, descripcion_lista : descripcion_lista }));
		cargarEstructuraInicial();
		return false;
	});
	
	$("body").on("click", ".contenedor_lista_titulo", function(e){
		inicializarVisualizadorElementosListas($("#contenedor_mostrar_categorias_listas"), $(this).closest(".contenedor_lista").attr("data-id"));
		$("#modal_editar_lista").modal("show");
	});
	
	$(".editar_lista").on("click", function(){
		$("#modal_editar_lista").modal("hide");
	});
	
	$("body").on("click", ".contenedor_lista .contenedor_lista_puntuacion .aw_score", function(e){
		e.preventDefault();
		e.stopPropagation();
		var score_seleccionado = ( $(this).attr("data-selected") & parseInt($(this).attr("data-selected")) === 1) ? true : false;
		var puntuacion = null;
		var id_lista = $(this).closest(".contenedor_lista").attr("data-id");
		switch(score_seleccionado){
			case true:
				$(this).attr("src", "./assets/imgs/score/not_selected.png").attr("data-selected", "0");
				$(this).prevAll(".aw_score").attr("src", "./assets/imgs/score/not_selected.png").attr("data-selected", "0");
				$(this).nextAll(".aw_score").attr("src", "./assets/imgs/score/not_selected.png").attr("data-selected", "0");
				puntuacion = 0;
			break;
			case false:
				$(this).attr("src", "./assets/imgs/score/selected.png").attr("data-selected", "1");
				$(this).prevAll(".aw_score").attr("src", "./assets/imgs/score/selected.png").attr("data-selected", "1");
				puntuacion = $(this).prevAll(".aw_score").length + 1;
			break;
		}
		send( "POST", "backend.php", returnFormData( { accion : 31, id_lista : id_lista, puntuacion : puntuacion } ), null );
	});
	
	$("body").on("click", ".contenedor_lista .eliminar_recurso_editar_producto", function(e){
		if(confirm("¿Eliminar lista?")){
			var id_lista = $(this).closest(".contenedor_lista").attr("data-id");
			send( "POST", "backend.php", returnFormData( { accion : 32, id_lista : id_lista } ), null );
			cargarEstructuraInicial();
		}
	});
	
	$("body").on("click", ".modificar_imagen_subcategoria", function(e){
		var $contenedor_imagen = $(this).closest(".modal_editar_subcategoria_container").find(".modificar_imagen_subcategoria_contenedor");
		$contenedor_imagen.click();
	});
	
	$("body").on("keyup change", ".editar_subcategoria_titulo", function(e){
		var titulo = $(this).val();
		var id_subcategoria = $(this).attr("data-id-subcategoria");
		send("POST", "backend.php", returnFormData({ accion : 29, "apartado" : "titulo", titulo : titulo, id_subcategoria : id_subcategoria }));
	});
	
	$("body").on("change", ".modificar_imagen_subcategoria_contenedor", function(e){
		var archivo_actual = $(this).val();
		var tipo_archivo = $(this)[0].files[0].type;
		var id_subcategoria = $(this).attr("data-id-subcategoria");
		switch(true){
			case "image/jpeg".localeCompare(tipo_archivo) == 0:
			case "image/jpeg".localeCompare(tipo_archivo) == 0:
			case "image/png".localeCompare(tipo_archivo) == 0:
				var imagen = $(this)[0].files[0];
				let imagen_modificada = send("POST", "backend.php", returnFormData({ id_subcategoria : id_subcategoria, "accion" : 29, "apartado" : "imagen", "imagen" : imagen }), "html");
				if(parseInt(imagen_modificada) == 1){
					pintarEstructuraBasica();
					$("#modal_editar_subcategoria").modal("hide");
				}
			break;
			default:
				alert("El tipo de archivo que intenta añadir no está permitido.");
			break;
		}
	});
	
	$("body").on("click", ".cargar_datos_subcategorias", function(){
		pintarEstructuraBasica();
	});
	
	$("body").on("mouseenter", ".aw_score", function(e){  if(!(parseInt($(this).attr("data-selected")) === 1)){ $(this).attr("src", "./assets/imgs/score/selected.png"); $(this).prevAll(".aw_score").attr("src", "./assets/imgs/score/selected.png"); } });
	$("body").on("mouseout", ".aw_score", function(e){
		if(!(parseInt($(this).attr("data-selected")) === 1)){ 
			$(this).attr("src", "./assets/imgs/score/not_selected.png");
		}
		if(($(this).prevAll(".aw_score").filter( ( index, value ) => { if( parseInt($(value).attr("data-selected")) === 1 ){ return value; } } )).length == 0){ 
			$(this).prevAll(".aw_score").attr("src", "./assets/imgs/score/not_selected.png");
		};
	});
};
$(document).ready(function(){
	capturarEventos();
});