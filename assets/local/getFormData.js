// En este archivo se encontrarán todas las funciones, que llamarán a los distintos formularios que necesiten utilizar la función getFormData. 

function generarFormData(){
	$("#modal_crear_elementos").find("form")[0].getFormData = function(){
		let $_this = $(this);
		var formDataReturn = new FormData();
		var $otrosCamposContainer = $_this.find("#otros_campos");
		var nombre_elemento = $_this.find(".nombre_elemento").val();
		var accion = $_this.find(".accion").val();
		var otros_campos = {};
		$otrosCamposContainer.find(".otro_campo_container").each(function(){
			var nombre_campo = $(this).find(".otro_campo_nombre").val();
			var valor_campo = $(this).find(".otro_campo_valor").val();
			otros_campos[ nombre_campo ] = valor_campo;
		});
		var otros_campos = JSON.stringify(otros_campos);
		
		var id_elemento_creado_recientemente = $("#dropzone_portada").closest("form").find("#elemento_creado_recientemente").val();

		if(id_elemento_creado_recientemente){
			formDataReturn.append("id_subcategoria", id_elemento_creado_recientemente);
		}
		
		formDataReturn.append("otros_campos", otros_campos);
		formDataReturn.append("nombre_elemento", nombre_elemento);
		formDataReturn.append("accion", accion);
		formDataReturn.append("id_subcategoria", getUrlParam("id_subcategoria"));
		return formDataReturn;
	}
}

$(document).ready(function(){
	generarFormData();
});