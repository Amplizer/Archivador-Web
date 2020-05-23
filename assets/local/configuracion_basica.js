
function cargarInformacionBasica(){
	var informacionBasica = send("POST", "backend.php", returnFormData({ accion : 26 }), "json");
	localStorageUtils.setPropertiesFromArrayOrObject( informacionBasica );
}

function comprobarInformacionBasicaCargada(){
	if(!localStorageUtils.getProperty("sesion_iniciada") || localStorageUtils.getProperty("sesion_iniciada") != 1){
		cargarInformacionBasica();
	}
}

$(document).ready( function(){
	comprobarInformacionBasicaCargada();
	
} );