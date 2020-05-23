<div class="modal" id="modal_crear_galeria" data-backdrop="static" > <!-- Modal para crear galerías -->
	<div class="modal-dialog">
		<div class="modal-content">
			<form method="POST" action="backend.php">
				<div class="modal-header">
					<h4>Crear galería</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					  <span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div style="margin-top: 20px !important;" class="row">
						<div class="col-md-12">
							<input type="hidden" name="accion" value="4" />
							<div class="form-group">
								<div style="display: none;" class="alert alert-info bg-danger text-white"> </div>
							</div>
							<div class="form-group">
								<input type="text" name="nombre_galeria" class="form-control nombre_galeria" placeholder="Nombre de la galería" />
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="submit" class="crear_galeria btn bg-dark btn-block text-white"> Crear galería </button>
				</div>
			</form>
		</div>
	</div>
</div>

<div class="modal" id="modal_crear_subcategoria" data-backdrop="static" > <!-- Modal para crear sub galerías ( sub categorías ) -->
	<div class="modal-dialog">
		<div class="modal-content">
			<form method="POST" action="backend.php">
				<div class="modal-header">
					<h4>Crear subcategoría</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					  <span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div style="margin-top: 20px !important;" class="row">
						<div class="col-md-12">
							<input type="hidden" name="accion" value="9" />
							<div class="form-group">
								<div style="display: none;" class="alert alert-info bg-danger text-white"> </div>
							</div>
							<div class="form-group">
								<input type="text" name="nombre_subcategoria" class="form-control nombre_subcategoria" placeholder="Nombre / Descripción de la subcategoría" />
							</div>
							<div class="form-group">
								<p class="alert alert-info"><strong>Recomendación.</strong> Usar descripciones sencillas ( letras del alfabeto, autores, etc).</p>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="submit" class="crear_subcategoria btn bg-dark btn-block text-white"> Crear subcategoría </button>
				</div>
			</form>
		</div>
	</div>
</div>

<div class="modal" id="modal_editar_subcategoria" data-backdrop="static" > <!-- Modal para crear sub galerías ( sub categorías ) -->
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4>Editar subcategoría</h4>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				  <span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-md-12">
						<div class="form-group modal_editar_subcategoria_container">
							
						</div>
					</div>
				</div>
				<!-- <div style="margin-top: 20px !important;" class="row">
					<div class="col-md-12 modal_editar_subcategoria_container">
						<div class="form-group">
							<p>Título subcategoría</p>
							<textarea class="form-control editar_subcategoria_titulo"></textarea>
						</div>
					</div>
				</div>
				<div style="margin-top: 20px !important;" class="row">
					<div class="col-md-12">
						<div class="form-group">
							<p>Imagen productos</p>
							<button class="btn btn-dark text-white editar_imagen_productos"> Modificar imagen </button>
						</div>
					</div>
				</div>-->
			</div>
			<div class="modal-footer">
				<button type="submit" data-dismiss="modal" class="cargar_datos_subcategorias btn bg-dark btn-block text-white"> Aceptar </button>
			</div>
		</div>
	</div>
</div>

<div class="modal" id="modal_crear_elementos" data-backdrop="static" > <!-- Modal para crear elementos ( productos ) -->
	<div class="modal-dialog">
		<div class="modal-content">
			<form method="POST" action="backend.php">
				<div class="modal-header">
					<h4>Crear / Añadir elementos </h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					  <span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-md-12">
							<input type="hidden" name="accion" class="accion" value="16" />
							<div style="margin-top: 10px !important; margin-bottom: 20px !important;" class="row">
								<div style="" class="col-md-12">
									<button style="float: right;" class="btn bg-dark text-white nuevo_campo">Si el elemento tiene más valores / propiedades, haz click aquí</button>
								</div>
							</div>
							<div style="text-align: middle;" class="form-group">
								<hr/>
								<div style="display: none;" class="alert alert-info bg-danger text-white"> </div>
							</div>
							<div class="form-group">
								<input type="checkbox" style="display: inline-block !important; width: auto !important;" class="form-control buscar_elementos_por_nombre" /> <p style="vertical-align: middle; height: 40px !important; display: inline-block !important;"> Buscar productos creados previamente </p>
								<br/>
							</div>
							<div class="form-group">
								<input type="text" name="nombre_elemento" class="form-control nombre_elemento" placeholder="Nombre del elemento" />
								<div class="row">
									<div class="col-md-12">
										<div style="display: none; padding: 10px; margin-top: 10px; margin-bottom: 10px; border-radius: 5px 5px; border: 1px solid #F1F1F1;" id="cargar_elementos_creados_previamente" >
											
										</div>
									</div>
								</div>
							</div>
							<div class="form-group">
								<div style="margin-top: 20px !important;" class="row">
									<div class="col-md-12">
										 <div id="dropzone_portada"  class="dropzone needsclick dz-clickable">

										  <div class="dz-message needsclick">
											Si quieres, puedes añadir una portada <br />
										  </div>

										</div>
									</div>
								</div>
							</div>
							<div class="form-group">
								<div style="margin-top: 20px !important;" class="row">
									<div class="col-md-12">
										<hr/>
									</div>
								</div>
							</div>
							<div class="form-group">
								<div style="margin-top: 20px !important;" class="row">
									<div class="col-md-12">
										 <div id="dropzone"  class="dropzone needsclick dz-clickable">

										  <div class="dz-message needsclick">
											Si tienes imágenes, añádelas aquí.<br />
										  </div>

										</div>
									</div>
								</div>
							</div>
							<div class="form-group">
								<div style="margin-top: 20px !important;" class="row">
									<div id="otros_campos" class="col-md-12"></div>
								</div>
							</div>
							<div class="form-group">
								<br/>
								<p class="alert alert-info">Puedes crear elementos y reutilizarlos en otras subcategorías.</p>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="submit" class="crear_elemento btn bg-dark btn-block text-white"> Crear elemento </button>
				</div>
			</form>
		</div>
	</div>
</div>

<div id="modal_editar_elemento" data-backdrop="static" class="modal fade">
	<div class="modal-dialog-full">
		<div class="modal-content">
			<div class="modal-header">
				<h4 id="modal_editar_elemento_titulo"></h4>
				<button style="float: right;" type="button" class="close" data-dismiss="modal" aria-label="Close">
				  <span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-md-12">
						<div id="modal_editar_elemento_container">
							
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<div style="width: 100%;" class="form-group">
					<div class="row">
						<div class="col-md-12">
							<button class="btn btn-dark btn-block" data-dismiss="modal" > Aceptar </button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="modal" id="modal_crear_lista" data-backdrop="static" > <!-- Modal para crear listas -->
	<div class="modal-dialog">
		<div class="modal-content">
			<form method="POST" action="backend.php">
				<div class="modal-header">
					<h4>Crear lista</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					  <span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div style="margin-top: 20px !important;" class="row">
						<div class="col-md-12">
							<input type="hidden" name="accion" value="25" />
							<div class="form-group">
								<div style="display: none;" class="alert alert-info bg-danger text-white"> </div>
							</div>
							<div class="form-group">
								<input type="text" name="nombre_lista" class="form-control nombre_lista" placeholder="Nombre de la lista" />
							</div>
							<div class="form-group">
								<textarea class="form-control descripcion_lista" placeholder="Escribe una descripción sobre la lista"></textarea>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="submit" class="crear_lista btn bg-dark btn-block text-white"> Crear lista </button>
				</div>
			</form>
		</div>
	</div>
</div>

<div class="modal" id="modal_editar_lista" data-backdrop="static" > <!-- Modal para editar listas -->
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4>Editar lista</h4>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				  <span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<div style="margin-top: 20px !important;" class="row">
					<div class="col-md-1"> </div>
					<div class="col-md-10" id="contenedor_mostrar_categorias_listas">
						
					</div>
					<div class="col-md-1"> </div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="submit" class="editar_lista btn bg-dark btn-block text-white"> Aceptar </button>
			</div>
		</div>
	</div>
</div>