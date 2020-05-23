function verifyLogin(){
	var $formRegistroContainer = $("#form_register");
	var $errorContainer = $formRegistroContainer.find(".error-info");
	var $usuario = $formRegistroContainer.find("#registro_usuario"), $password = $formRegistroContainer.find("#registro_password"), $password_repeat = $formRegistroContainer.find("#registro_repeat_password"), $nombre = $formRegistroContainer.find("#registro_nombre"),  $apellidos = $formRegistroContainer.find("#registro_apellidos"), $email = $formRegistroContainer.find("#registro_email");
	
	var caractersUse = "abcdefghijklmnopqrstuvwxyzñABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-_.";
	
	caractersMinLength = 6;
	caractersMaxLength = 255;
	
	if($usuario.val().length < caractersMinLength || $usuario.val().length > caractersMaxLength){
		$errorContainer.html("El nombre posee menos de 6 carácteres o más de 255 carácteres");
		$errorContainer.show();
		return false;
	}
	
	for(var a = 0;a < $usuario.val().length; a++){
		var exist = false;
		for(var b = 0; b < caractersUse.length; b++){
			if(String($usuario.val()[a]).localeCompare(String(caractersUse[b])) == 0){
				exist = true;
			}
		}
		if(!exist){
			$errorContainer.html("El nombre posee carácteres no permitidos [ " + $usuario.val()[a] + " ].");
			$errorContainer.show();
			return false;
		}
	}
	
	if(String($password.val()).localeCompare(String($password_repeat.val())) != 0){
		$errorContainer.html("Las contraseñas no son iguales");
		$errorContainer.show();
		return false;
	}
	
	if(String($usuario.val()).localeCompare("") == 0){
		$errorContainer.html("El usuario no puede estar vacío");
		$errorContainer.show();
		return false;
	}
	
	if(String($password.val()).localeCompare("") == 0){
		$errorContainer.html("La contraseña no puede estar vacía");
		$errorContainer.show();
		return false;
	}
	
	
	if(String($nombre.val()).localeCompare("") == 0){
		$errorContainer.html("El nombre no puede estar vacío");
		$errorContainer.show();
		return false;
	}
	
	if(String($apellidos.val()).localeCompare("") == 0){
		$errorContainer.html("Los apellidos no pueden estar vacíos");
		$errorContainer.show();
		return false;
	}
	
	if(String($email.val()).localeCompare("") == 0){
		$errorContainer.html("El email no puede estar vacío");
		$errorContainer.show();
		return false;
	}
	
	$errorContainer.html("");
	$errorContainer.hide();
	
	return true;
	
}

$(document).ready(function(){
	$("#form_register").submit(function(e){
		if(!verifyLogin()){
			return false;
		}else{
			return true;
		}
	});
});