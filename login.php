<?php require "header.php"; ?>
	<script src="assets/local/login.js"></script>
	<div class="row">
		<div class="col-md-12">
			<div class="jumbotron">
				<h1 style="text-align: center;">Inicia sesión</h1>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-md-2"> </div>
		<div class="col-md-8">
			<form method="POST" action="backend.php">
				<input type="hidden" name="accion" value="2" />
				<input type="hidden" name="login_cfsrtoken" value="<?php 
					$cfsrtoken = hash("sha256", date("Y-m-d") . rand(1, 10000));
					$_SESSION[login_cfsrtoken] = $cfsrtoken;
					echo $cfsrtoken;
				?>">
				<div class="form-group">
					<div style="display: none !important;" class="alert alert-info bg-danger text-white"> </div>
				</div>
				<div class="form-group">
					<input type="text" id="usuario_o_email" name="usuario_o_email" class="form-control usuario_o_email" placeholder="Nombre de usuario o email" />
				</div>
				<div class="form-group">
					<input type="password" id="password" name="password" class="form-control password" placeholder="Contraseña" />
				</div>
				<div class="form-group">
					<button type="submit" class="btn bg-dark btn-block text-white"> Iniciar sesión </button>
				</div>
			</form>
		</div>
		<div class="col-md-2"> </div>
	</div>
<?php require "footer.php"; ?>