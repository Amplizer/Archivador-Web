
function cargarEstructuraInicial(){
	var $contenedorInicial = $("#container_edicion_perfil");
	var datos = send("POST", "backend.php", returnFormData({ "accion" : 21 }), "json");
	$contenedorInicial.html("<div class='row'><div class='col-md-8'><p style='min-height: 50px; text-align: center; background-color: #e9ecef; vertical-align: middle; display: flex; justify-content: center; align-content: center; align-items: center;'>Nombre</p><input type='text' class='editar_nombre form-control' value='" + datos["nombre"] + "'><br/><p style='min-height: 50px; text-align: center; background-color: #e9ecef; vertical-align: middle; display: flex; justify-content: center; align-content: center; align-items: center;'>Apellidos</p><input type='text' class='editar_apellidos form-control' value='" + datos["apellidos"] + "'><br/><p style='min-height: 50px; background-color: #e9ecef; vertical-align: middle; display: flex; justify-content: center; align-content: center; align-items: center; text-align: center;'>Email</p><input type='text' class='editar_email form-control' value='" + datos["email"] + "'><br/><p style='min-height: 50px; background-color: #e9ecef; vertical-align: middle; display: flex; justify-content: center; align-content: center; align-items: center; text-align: center;'>Diseño</p><select class='form-control selectpicker'><option value='Prueba'>Dark</option></select><br/></div><div class='col-md-4'><div class='form-group'><img style=' cursor: pointer; margin: 5px; margin-top: 30px; padding: 15px; border-radius: 5px 5px; border: 2px solid #F0F0F0; max-width: 280px; max-height: 390px;' src='" + datos["url_imagen_perfil_usuario"] + "' class='modificar_imagen_perfil_usuario'><button style='display: block; margin: 5px; margin-top: 5px; width: 280px; ' class='btn btn-dark modificar_imagen_perfil_usuario'>Modificar imagen</button></div></div></div><div class='row'><div class='col-md-12'><hr/><button class='modificar_datos_usuario btn btn-block btn-dark'> <i class='material-icons'>check</i> Guardar cambios</button><input type='file' class='modificar_imagen_container' style='display: none;' /><hr/><br/></div></div>");
}

function getEstilos(estilos){
	var str = "";
	estilos.filter( estilo => {  if(String(typeof(estilo)).localeCompare("object") == 0) Object.keys(estilo).filter( ( valor, propiedad ) => { str += "<option value='" + propiedad + "'>" + valor + "</option>"; }, true ) } );
	return str;
}

$(document).ready(function(){
	cargarEstructuraInicial();
});