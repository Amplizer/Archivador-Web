
function obtenerListas(){
	return send("POST", "backend.php", returnFormData({ "accion" : 24 }), "json");
}

function cargarHTMLListas(arrayListas = obtenerListas()){
	var str_listas = "<div class='row'><div class='col-md-12'><br/></div></div>";
	arrayListas.forEach( ( lista_actual ) => { 
	var puntuacion_lista = parseInt(lista_actual["valoracion_lista"]), valoracion_minima = 0, valoracion_maxima = 5, aux = 0;
	var html_puntacion_lista = "";
	for( ; aux < valoracion_maxima; aux++){
		if( puntuacion_lista > aux){
			html_puntacion_lista += "<img class='aw_score' data-selected='1' src='./assets/imgs/score/selected.png'>";
		}else{
			html_puntacion_lista += "<img class='aw_score' data-selected='0' src='./assets/imgs/score/not_selected.png'>";
		}
	}
	str_listas += "<div class='row'><div class='col-md-12'><div class='contenedor_lista' data-id='" + lista_actual["__id"] + "'><button style='float: right; margin-left: 15px;' class='close eliminar_recurso_editar_producto'><i class='material-icons'>close</i></button><div class='contenedor_lista_puntuacion'>" + html_puntacion_lista + "</div><p class='contenedor_lista_titulo'><strong>" + lista_actual["nombre_lista"] + "</strong> ( " + lista_actual["numero_categorias"] +" categorías ).</p></div></div></div>"; }, true );
	return str_listas + "<div class='row'><div class='col-md-12'><br/></div></div>";
	//return arrayListas.forEach( ( lista_actual ) => { return "<div class='row'><div class='col-md-12'>" + lista_actual["nombre_lista"] + "</div></div>"; } );
}

function estructuraCrearLista(){
	return "<hr/><button class='mostrar_modal_crear_lista btn btn-dark text-white btn-block'>Crear lista</button><hr/>";
}

function cargarEstructuraInicial(){
	var $contenedor_principal = $("#listas_creadas");
	//$contenedor_principal.html("<div class='row'><div class='col-md-12'>" +  + "</div></div>");
	$contenedor_principal.html( estructuraCrearLista() + cargarHTMLListas( ) );
}

function inicializarVisualizadorElementosListas($container, id_lista){
	$($container).sjVisualElements({
		action : "init",
		elementsSource : [
			"./backend.php?id_lista=" + id_lista + "&accion=2"
		],
		elementsPageLength : 6,
		smallDeviceColumnsLength : 2,
		mediumDeviceColumnsLength : 2,
		largeDeviceColumnsLength : 2,
		events : {
			eventClick : function(event){ 
				
			},
			mouseenter : function(event){ },
			mouseout : function(event){ sjVisualElements.delete(this); },
			eventContainerMouseEnter : function(events){
				
			},
			eventContainerMouseOut : function(events){
				
			},
			eventDeleteClick : function(){
				
			}
		}
	});
}

$(document).ready(function(){
	cargarEstructuraInicial();
});