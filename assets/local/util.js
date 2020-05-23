function send(method = "POST", url = "backend.php", data = new FormData(), dataType = "json"){
	var dataReturned = null;
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.status = 220 && xhr.readyState == 4){
			var dataXHR = xhr.responseText;
			switch(true){
				case String(dataType).localeCompare("json") == 0:
					dataReturned = JSON.parse(dataXHR);
				break;
				default:
					dataReturned = dataXHR;
				break;
			}
		}
	}
	xhr.open(method, url, false);
	xhr.send(data);
	return dataReturned;
}
function returnFormData(data, encodeToURI = false){
	if(String(typeof(data)).localeCompare("object") == 0){
		var dataReturn = new FormData();
		if(data.length != undefined){
			data.forEach(( value, index ) => {
				switch(encodeToURI){
					case true:
						dataReturn.append(encodeURIComponent(value), encodeURIComponent(data[value]));
					break;
					default:
						dataReturn.append(value, data[value]);
					break;
				} 
			}, true);
		}else{
		//	console.log(data);
			Object.getOwnPropertyNames(data).forEach((value, key) => {
				//console.log("key :" + value + " - value : " + data[value]);
				switch(encodeToURI){
					case true:
						dataReturn.append(encodeURIComponent(value), encodeURIComponent(data[value]));
					break;
					default:
						dataReturn.append(value, data[value]);
					break;
				}
			}, true);
		}
		return dataReturn;
	}else{
		return null;
	}
}

function getUrlParam(param = ""){
	var urlData = new Array();
	if(String(param).localeCompare("") == 0){
		return null;
	}
	
	var urlParams = String(String(String(location.href).split(String(location.hostname))[1]).split("?")[1]).split("&");
	urlParams.forEach( (value, index) => {
		var data = String(value).split("=");
		urlData[data[0]] = data[1];
	} );
	
	var valor = urlData[param];
	
	if(valor == undefined){
		return null;
	}else{
		return valor;
	}
}

function utilInitMain(){ // Esta función servirá inicializar funcionalidad util en la página, como capturar eventos sobre elementos para el correcto funcionamiento y visualización de la web
	$(document).on("keydown", "input[type=text]", function(e){ // Buscar textos / iconos de ayuda de referencia a un input type text, y esconder en caso de que no se visualicen cuando haya texto
		if(e.keyCode == 8 && $(this).val().length <= 1 ){
			$(this).parent().find(".input-helper").each( function() { $(this).show(); } );
		}else{
			$(this).parent().find(".input-helper").each( function() {  $(this).hide(); } );
		}
	});
}

//modal_crear_elementos

function limpiarForm($form){ // Esta funcion no afecta a shadowDOMs internos dentro del formulario
	let $formElement = ( $form.length > 0 && (String($form[0].nodeName).localeCompare("FORM") == 0) )  ? $form : ( $form.length > 0 ) ? $form.closest("form") : ( ($form.length == 0 || $form.length == undefined || $form.length == null) && String($form.nodeName).localeCompare("FORM") == 0 ) ? $($form) : ( $form.length == 0 || $form.length == undefined || $form.length == null ) ? $($form) : ( $($form).find("form").length > 0) ? $($form).find("form") : null ;
	console.log($formElement);
	if($formElement != null && $formElement != undefined && $formElement.length > 0){
		$formElement.find("input:not([type=hidden])").each( function(){
			$(this).val("");
		} );
	}
}

function ajax(url = "", method = "POST", data = [], dataTypeReturn = "json"){
	return new Promise( ( resolved, ejected ) => {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && ( xhr.status == 200 || xhr.status == 201 || xhr.status == 202 || xhr.status == 203 ) ){
				switch(true){
					case dataTypeReturn.localeCompare("json") == 0:
						console.log("data: ");
						console.log(xhr.responseText);
						resolved(JSON.parse(xhr.responseText));
					break;
					default:
						resolved(xhr.responseText);
					break;
				}
			}
		}
		xhr.onerror = function(){
			rejected(xhr, xhr.status);
		}
		xhr.open(method, url, true);
		xhr.send(data);
	} );
}

var localStorageUtils ={
	setPropertiesFromArrayOrObject : function(arrayOrObject){
		console.log(arrayOrObject);
		if( (arrayOrObject.length) === undefined ){ // Es un objeto
			Object.keys(arrayOrObject).forEach( ( index ) => { 
				localStorage.setItem(index, arrayOrObject[index]);
			} )
		}else{ // Es un array
			if( arrayOrObject.forEach !== undefined ){
				arrayOrObject.forEach( ( value, index ) => { localStorage.setItem(index, value); }, true );
			}
		}
	},
	setProperty : function(propertyName = null, propertyValue = null){
		if(propertyName !== null && propertyName !== undefined && propertyValue !== null && propertyValue !== undefined ){
			localStorage.setItem( propertyName, propertyValue );
		}
	},
	getProperty : function(propertyName = null){
		if(propertyName !== null && propertyName !== undefined){
			return localStorage.getItem(propertyName);
		}
	}
}

$(document).ready(function(){
	utilInitMain();
});