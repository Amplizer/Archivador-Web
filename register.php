<?php require "header.php"; ?>
<?php
	$sesion_iniciada = $_SESSION[sesion_iniciada];
	if(strlen($sesion_iniciada) == 0){ ?>
	<script src="./assets/local/form_register.js"></script>
	<div class="row">
		<div class="col-md-2"> </div>
			<br/>
		</div>
	</div>
	<div class="row">
		<div class="col-md-2"> </div>
		<div class="col-md-8">	
			<div class="jumbotron">
				<h1>Regístrate </h1>
			</div>
		</div>
		<div class="col-md-2"> </div>
	</div>
	<div class="row">
		<div class="col-md-2"> </div>
		<div class="col-md-8">	
			<form id="form_register" method="POST" action="backend.php">
				<input type="hidden" name="accion" value="1" id="accion">
				<input type="hidden" name="cfsrtoken" id="cfsrtoken" value="<?php
					$cfsrtoken = hash("sha256", date("Y-m-d") . rand(1, 10000));
					$_SESSION[cfsrtoken] = $cfsrtoken;
					echo $cfsrtoken;
				 ?>"/>
				<div class="form-group"> <div style="display: none;" class="alert alert-info error-info text-white bg-danger"> </div> </div>
				<div class="form-group">
					<label for="registro_usuario">Nombre usuario</label>
					<input type="text" name="registro_usuario" class="form-control" id="registro_usuario" placeholder="Usuario" />
				</div>
				<div class="form-group">
					<label for="registro_password">Contraseña</label>
					<input type="password" name="registro_password" class="form-control" id="registro_password" placeholder="Contraseña" />
				</div>
				<div class="form-group">
					<label for="registro_repeat_password">Repite contraseña</label>
					<input type="password" name="registro_repeat_password" class="form-control" id="registro_repeat_password" placeholder="Repetir contraseña" />
				</div>
				<div class="form-group">
					<label for="registro_nombre">Nombre</label>
					<input type="text" name="registro_nombre" class="form-control" id="registro_nombre" placeholder="Nombre" />
				</div>
				<div class="form-group">
					<label for="registro_apellidos">Apellidos</label>
					<input type="text" name="registro_apellidos" class="form-control" id="registro_apellidos" placeholder="Apellidos" />
				</div>
				<div class="form-group">
					<label for="registro_email">Email</label>
					<input type="email" name="registro_email" class="form-control" id="registro_email" placeholder="Email" />
				</div>
				<div class="form-group">
					<button type="submit" class="btn bg-dark btn-block text-white">Registrarse</button>
				</div>
			</form>
		</div>
		<div class="col-md-2"> </div>
	</div>
<?php } ?>
<?php require "footer.php"; ?>