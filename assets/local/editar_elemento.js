class EditarElemento{ //  ( Requiere Jquery y Bootstrap )
	constructor(contenedor_titulo, /* Objeto Jquery donde se pintará el título */ contenedor_datos, /* Contenedor donde se pintarán los datos */ data, /* datos */ queHacerAlFinalizar /* Funcion para saber que hacer cuando se finaliza todo */ ){
		this.contenedor_titulo = contenedor_titulo;
		this.contenedor_datos = contenedor_datos;
		this.id_producto = data["id_producto"];
		this.titulo = data['nombre_producto'];
		this.otros_campos = data['otros_campos'];
		this.portada = data['portada'];
		this.recursos = data['recursos'];
		this.fecha_creacion = data['fecha_creacion'];
		this.funcionQueHacerAlFinalizar = queHacerAlFinalizar;
		this.pintarYCapturarEventos();
	}
	setTitulo(){
		$(this.contenedor_titulo).html("<h4>" + this.titulo + "</h4>");
	}
	setContainerData(){
		var contenedor_datos = this.contenedor_datos;
		try{
			var otros_campos = JSON.parse(this.otros_campos);
			var str_otros_campos = "";
			var portada = this.portada;
			var recursos = this.recursos;
			if(Object.keys(otros_campos).length > 0 && otros_campos != null){
				str_otros_campos += "<div class='row'><div class='col-md-12 contenedor_otros_campos'>";
				$.map(otros_campos, ( value, index ) => {
					str_otros_campos += " <div class='row'><div class='col-md-12 propiedad_elemento_edicion' data-propiedad='" + value + "' data-propiedad-valor='" + index + "'><p style='margin-bottom: 2rem; text-align: center; max-width: 60%;'>" + index + " : " + value + " </p><button style='position: absolute; left: calc( 100% - 70px ); top: 0px; min-width: 60px; margin-right: 15px; float: right;' class='btn btn-danger eliminar_propiedad_editar_producto'><i class='material-icons'>delete</i></button><button style='position: absolute; left: calc( 100% - 140px ); top: 0px; min-width: 60px; margin-right: 10px !important; float: right;' class='btn btn-dark editar_propiedad_editar_producto'><i class='material-icons'>edit</i></button><hr/></div></div>";
				} );
				str_otros_campos += "</div></div>";
			}else{
				str_otros_campos = "<div class='row'><div class='col-md-12 contenedor_otros_campos'><p>No se han añadido otras propiedades.</p></div></div>";
			}
			var str_portada = "";
			if(String(portada).length > 0 && portada !== null){
				str_portada += "<div style='text-align: center; margin-top: 15px; padding-right: 0px; padding-left: 0px !important;' class='col-md-6'><img src='" + portada + "' style=' max-width: calc(100% - 20px) !important; border-radius: 20px 20px;'> <input style='border: 0px !important; display: none;' type='file' class='form-control modificar_portada_editar_producto_contenedor' placeholder='Modificar portada' id='modificar_portada_editar_producto_contenedor'><button style='width: calc( 100% - 30px ); margin-top: 15px; margin-left: 15px; margin-right: 15px; ' class='btn btn-dark btn-block modificar_portada_editar_producto'>Modificar portada</button> <br style='height: 15px;'/></div><div class='col-md-6'><div style='margin-top: 15px; border: 1px solid #dee2e6; border-radius: 20px 20px;' class='col-md-12'> <div style='text-align: center;' class='form-group'><p style='padding-top: 15px; text-align: center;'>Propiedades</p><br/><button class='elemento_nuevas_propiedades btn-block btn btn-dark'>Añadir propiedades</button><hr/></div> " + str_otros_campos + " </div></div></div><div class='col-md-6'><br/>";
			}else{
				str_portada += "<div style='text-align: center; margin-top: 15px; padding-right: 0px; padding-left: 0px !important;' class='col-md-6'><img src='./assets/imgs/book.png' style=' max-width: calc(100% - 20px) !important; border-radius: 20px 20px;'> <input style='border: 0px !important; display: none;' type='file' class='form-control modificar_portada_editar_producto_contenedor' placeholder='Modificar portada' id='modificar_portada_editar_producto_contenedor'><button style='width: calc( 100% - 30px ); margin-top: 15px; margin-left: 15px; margin-right: 15px; ' class='btn btn-dark btn-block modificar_portada_editar_producto'>Modificar portada</button> <br style='height: 15px;'/></div><div class='col-md-6'><div style='margin-top: 15px; border: 1px solid #dee2e6; border-radius: 20px 20px;' class='col-md-12'> <div style='text-align: center;' class='form-group'><p style='padding-top: 15px; text-align: center;'>Propiedades</p><br/><button class='elemento_nuevas_propiedades btn-block btn btn-dark'>Añadir propiedades</button><hr/></div> " + str_otros_campos + " </div></div></div><div class='col-md-6'><br/>";
			}
			
			var str_recursos = "";
			var aux = 1;
			if(recursos.length > 0 && recursos != null){
				recursos.forEach( ( url_recurso ) => { str_recursos += "<div class='row'><div class='col-md-12'><div style='margin: 0px; margin-bottom: -1px; padding: 5px; border-radius: 2px 2px; border: 1px solid #dee2e6; border-collapse: collapse;' class='form-group producto_editado_recurso'><a style='color: #666;' target='_blank' href='" + url_recurso + "'>Recurso " + aux + "</a><button style='float: right;' class='close eliminar_recurso_editar_producto'><i class='material-icons'>close</i></button></div></div></div>"; aux++; }, true);
			}else{
				str_recursos += "<div class='row'><div class='col-md-12'><div class='form-group'><p style='text-align: center;'>Aún no has añadido ningún recurso</p></div></div></div>";
			}
			
			str_recursos += "";
			
			$(contenedor_datos).html( "<div class='row'><div class='col-md-12'><div class='form-group'><label>Modificar título ( se modifica en todas las subcategorías ) </label><input type='text' class='form-control modificar_titulo_modificar_producto' placeholder='Título' value='" + this.titulo + "'></div></div>" + str_portada + "</div><hr/><div style='margin-top: 15px; border: 1px solid #dee2e6; border-radius: 20px 20px; padding: 15px;'><div class='row'><div class='col-md-12'><div class='form-group'><p style='text-align: center;'>Recursos</p></div></div></div><div class='row' ><div class='col-md-12'><div class='form-group'><input style='border: 0px !important; display: none;' type='file' class='form-control agregar_recurso_editar_producto_contenedor' placeholder='Agregar recurso' /> <button class='btn btn-dark btn-block agregar_recurso_editar_producto'>Agregar recurso</button> </div></div></div><div class='row'><div class='col-md-12'><div class='form-group contenedor_recursos_producto'>" + str_recursos + "</div></div></div></div>");  // Estructura principal
		}catch(exception){
			$(contenedor_datos).html("<div class='row'><div class='col-md-12'><div class='alert alert-warning'>Se ha producido el siguiente error: " + exception + ". Por favor, contacte con el programador. </div></div></div><div class='row'><div class='col-md-12'><button class='btn btn-dark' data-dismiss='modal'>Volver atrás</button></div></div>");
		};
	}
	
	setIdAndContainerToElements(){ // Añadimos el id del producto a los elementos html como propiedad, para poder usarlos en el futuro para hacer llamadas backend y modificar datos
		var id_producto = this.id_producto;
		var contenedor_elementos = this.contenedor_datos;
		$.map(this.contenedor_datos.find(".modificar_titulo_modificar_producto, .modificar_portada_editar_producto, .modificar_portada_editar_producto_contenedor, .elemento_nuevas_propiedades, .eliminar_propiedad_editar_producto, .editar_propiedad_editar_producto, .agregar_recurso_editar_producto, .agregar_recurso_editar_producto_contenedor, .eliminar_recurso_editar_producto"), element => { element.id_producto = id_producto; });
		$.map(this.contenedor_datos.find(".modificar_titulo_modificar_producto, .modificar_portada_editar_producto, .modificar_portada_editar_producto_contenedor, .elemento_nuevas_propiedades, .eliminar_propiedad_editar_producto, .editar_propiedad_editar_producto, .agregar_recurso_editar_producto, .agregar_recurso_editar_producto_contenedor, .eliminar_recurso_editar_producto"), element => { element.contenedor_elementos = contenedor_elementos; });
	}
	
	static obtenerPropiedadesProductoActual($contenedor_propiedades_elemento){ // Devuelve las propiedades de un producto ( producto actual, propiedades que se encuentren en el contenedor pasado como parametro ) Las propiedades las devuelve en formato JSON como string
		var propiedades = {};
		$contenedor_propiedades_elemento.find(".propiedad_elemento_edicion").each( function(){
			var nombre_propiedad_elemento_producto = $(this).attr("data-propiedad-valor"); 
			var propiedad_elemento_producto = $(this).attr("data-propiedad"); 
			propiedades[nombre_propiedad_elemento_producto] = propiedad_elemento_producto;
		});
		return JSON.stringify(propiedades);
		//propiedad_elemento_edicion
	}
	
	setEvents(){ // Capturar eventos del elemento
		this.contenedor_datos.off("click", ".modificar_titulo_modificar_producto");
		this.contenedor_datos.off("click", ".modificar_portada_editar_producto");
		this.contenedor_datos.off("click", ".modificar_portada_editar_producto_contenedor");
		this.contenedor_datos.off("change", ".modificar_portada_editar_producto_contenedor");
		this.contenedor_datos.off("click", ".elemento_nuevas_propiedades");
		this.contenedor_datos.off("click", ".eliminar_propiedad_editar_producto");
		this.contenedor_datos.off("click", ".editar_propiedad_editar_producto");
		this.contenedor_datos.off("click", ".agregar_recurso_editar_producto");
		this.contenedor_datos.off("click", ".agregar_recurso_editar_producto_contenedor");
		this.contenedor_datos.off("change", ".agregar_recurso_editar_producto_contenedor");
		this.contenedor_datos.off("click", ".eliminar_recurso_editar_producto");
		this.contenedor_datos.off("click", ".guardar_cambios_propiedad_editar_producto");
		this.contenedor_datos.on("keyup change", ".modificar_titulo_modificar_producto", function(e){
			if(send) send("POST", "backend.php", returnFormData({ accion : 23, "apartado" : 2, "id_producto" : this.id_producto, "titulo" : $(this).val()  }), "html");
		});
		this.contenedor_datos.on("click", ".modificar_portada_editar_producto", function(e){
			$(this.contenedor_elementos).find(".modificar_portada_editar_producto_contenedor").click();
		});
		this.contenedor_datos.on("click", ".modificar_portada_editar_producto_contenedor", function(e){ });
		this.contenedor_datos.on("change", ".modificar_portada_editar_producto_contenedor", function(e){
			var tipos_archivos_permitidos = [ "image/png", "image/jpg", "image/jpeg" ], permitido = false, archivo_seleccionado = $(this)[0].files[0];
			if(archivo_seleccionado != undefined){
				tipos_archivos_permitidos.forEach( tipo_archivo => {
					if(tipo_archivo.localeCompare( archivo_seleccionado.type ) == 0){
						permitido = true;
					}
				}, true );
				
				if(permitido){
					var modificado = parseInt(send("POST", "backend.php", returnFormData({ accion : 23, "apartado" : 1, "id_producto" : this.id_producto, "portada" : archivo_seleccionado }), "html"));
					if(modificado & modificado == 1){
						var elemento_editado = new EditarElemento( $("#modal_editar_elemento #modal_editar_elemento_titulo"), $("#modal_editar_elemento #modal_editar_elemento_container"), send("POST", "backend.php", returnFormData({ "accion" : 20, "id_producto" :  this.id_producto, "id_categoria" : getUrlParam("id_subcategoria") }), "json"), function(){ });
					}else{
						alert("Se ha producido un error al modificar la portada.");
					}
				}else{
					alert("No es posible establecer como portada el archivo seleccionado.");
					return false;
				}
			}
		});
		
		this.contenedor_datos.on("click", ".elemento_nuevas_propiedades", function(e){
			var contenedor_propiedades_productos = $(this.contenedor_elementos).find(".contenedor_otros_campos");
			var html_insertar = "<div class='row'><div class='col-md-12 propiedad_elemento_edicion' data-propiedad='' data-propiedad-valor=''><p style='margin-bottom: 2rem; text-align: center; max-width: 60%;'> <input type='text' class='form-control nombre_propiedad_elemento_producto' placeholder='Propiedad' style='width: 45%; display: inline-block; margin-right: 5px;' value=''><input type='text' class='form-control propiedad_elemento_producto' placeholder='Valor' style='width: 45%; display: inline-block; ' value=''> </p><button style='position: absolute; left: calc( 100% - 70px ); top: 0px; min-width: 60px; margin-right: 15px; float: right;' class='btn btn-danger eliminar_propiedad_editar_producto'><i class='material-icons'>delete</i></button><button style='position: absolute; left: calc( 100% - 140px ); top: 0px; min-width: 60px; margin-right: 10px !important; float: right;' class='btn btn-dark guardar_cambios_propiedad_editar_producto nueva_propiedad_editar_producto'><i class='material-icons'>check</i></button><hr></div></div>";
			var nueva_propiedad_insertada = (contenedor_propiedades_productos.find(".nueva_propiedad_editar_producto").length > 0) ? true : false;
			if(!nueva_propiedad_insertada){
				if(contenedor_propiedades_productos.find(".propiedad_elemento_edicion").length > 0){
					contenedor_propiedades_productos.append(html_insertar);
				}else{
					contenedor_propiedades_productos.html(html_insertar);
				}
				contenedor_propiedades_productos.find(".nueva_propiedad_editar_producto")[0].id_producto = this.id_producto;
				contenedor_propiedades_productos.find(".nueva_propiedad_editar_producto")[0].contenedor_elementos = this.contenedor_elementos;
				contenedor_propiedades_productos.find(".nueva_propiedad_editar_producto").closest(".propiedad_elemento_edicion").find(".eliminar_propiedad_editar_producto")[0].id_producto = this.id_producto;
				contenedor_propiedades_productos.find(".nueva_propiedad_editar_producto").closest(".propiedad_elemento_edicion").find(".eliminar_propiedad_editar_producto")[0].contenedor_elementos = this.contenedor_elementos;
			}
		});
		this.contenedor_datos.on("click", ".eliminar_propiedad_editar_producto", function(e){
			if(confirm("¿Eliminar propiedad?")){
				var contenedor_propiedad_producto = $(this).closest(".propiedad_elemento_edicion");
				var contenedor_propiedades_producto = contenedor_propiedad_producto.closest(".contenedor_otros_campos");
				contenedor_propiedad_producto.remove();
				var id_producto = this.id_producto;
				if(id_producto) send("POST", "backend.php", returnFormData( { "accion" : 23, "apartado" : 5, "otros_campos" : EditarElemento.obtenerPropiedadesProductoActual(contenedor_propiedades_producto), "id_producto" : id_producto } ), "json");
			}
		});
		this.contenedor_datos.on("click", ".editar_propiedad_editar_producto", function(e){
			var contenedor_propiedad_producto = $(this).closest(".propiedad_elemento_edicion");
			var nombre_propiedad = contenedor_propiedad_producto.attr("data-propiedad-valor"), valor_propiedad = contenedor_propiedad_producto.attr("data-propiedad");
			contenedor_propiedad_producto.find("p:eq(0)").html("<input type='text' class='form-control nombre_propiedad_elemento_producto' placeholder='Propiedad' style='width: 45%; display: inline-block; margin-right: 5px;' value='" + nombre_propiedad + "'><input type='text' class='form-control propiedad_elemento_producto' placeholder='Valor' style='width: 45%; display: inline-block; ' value='" + valor_propiedad + "'>");
			$(this).removeClass("editar_propiedad_editar_producto").addClass("guardar_cambios_propiedad_editar_producto").html("<i class='material-icons'>check</i>");
		});
		this.contenedor_datos.on("click", ".guardar_cambios_propiedad_editar_producto", function(e){
			if($(this).hasClass("nueva_propiedad_editar_producto")) $(this).removeClass("nueva_propiedad_editar_producto");
			var contenedor_propiedad_producto = $(this).closest(".propiedad_elemento_edicion");
			var contenedor_propiedades_producto = contenedor_propiedad_producto.closest(".contenedor_otros_campos");
			var nombre_propiedad = contenedor_propiedad_producto.find(".nombre_propiedad_elemento_producto").val(), valor_propiedad = contenedor_propiedad_producto.find(".propiedad_elemento_producto").val();
			contenedor_propiedad_producto.attr("data-propiedad-valor", nombre_propiedad).attr("data-propiedad", valor_propiedad);
			contenedor_propiedad_producto.find("p:eq(0)").html( nombre_propiedad + " : " + valor_propiedad);
			$(this).removeClass("guardar_cambios_propiedad_editar_producto").addClass("editar_propiedad_editar_producto").html("<i class='material-icons'>edit</i>");
			send("POST", "backend.php", returnFormData( { "accion" : 23, "apartado" : 5, "otros_campos" : EditarElemento.obtenerPropiedadesProductoActual(contenedor_propiedades_producto), "id_producto" : this.id_producto } ), "html");
			/*
				Obtener propiedades elemento
			*/
		});
		this.contenedor_datos.on("click", ".agregar_recurso_editar_producto", function(e){
			this.contenedor_elementos.find(".agregar_recurso_editar_producto_contenedor").click();
		});
		this.contenedor_datos.on("change", ".agregar_recurso_editar_producto_contenedor", function(e){
			var tipos_archivos_permitidos = [ "image/png", "image/jpg", "image/jpeg" ], permitido = false, archivo_seleccionado = $(this)[0].files[0];
			if(archivo_seleccionado != undefined){
				
				tipos_archivos_permitidos.forEach( tipo_archivo => {
					if(tipo_archivo.localeCompare( archivo_seleccionado.type ) == 0){
						permitido = true;
					}
				}, true );
				
				if(permitido){
					var datos_recurso_insertado = send("POST", "backend.php", returnFormData({ accion : 23, "apartado" : 3, "id_producto" : this.id_producto, "recurso" : archivo_seleccionado }), "json");
					var completado_con_exito = datos_recurso_insertado["completado"];
					if(completado_con_exito & completado_con_exito == 1){
						var url_recurso = datos_recurso_insertado["url_recurso"];
						var numero_recursos_existentes = $(this.contenedor_elementos).find(".contenedor_recursos_producto .producto_editado_recurso").length;
						console.log($(this.contenedor_elementos));
						$(this.contenedor_elementos).find(".contenedor_recursos_producto").append("<div class='row'><div class='col-md-12'><div style='margin: 0px; margin-bottom: -1px; padding: 5px; border-radius: 2px 2px; border: 1px solid #dee2e6; border-collapse: collapse;' class='form-group producto_editado_recurso'><a style='color: #666;' target='_blank' href='" + url_recurso + "'>Recurso " + ( numero_recursos_existentes + 1 ) + "</a><button style='float: right;' class='close eliminar_recurso_editar_producto'><i class='material-icons'>close</i></button></div></div></div>");
						var elemento_editado = new EditarElemento( $("#modal_editar_elemento #modal_editar_elemento_titulo"), $("#modal_editar_elemento #modal_editar_elemento_container"), send("POST", "backend.php", returnFormData({ "accion" : 20, "id_producto" :  this.id_producto, "id_categoria" : getUrlParam("id_subcategoria") }), "json"), function(){ });
					}else{
						alert("Se ha producido un error al agregar un recurso.");
					}
				}else{
					alert("No es posible agregar el tipo de recurso seleccionado.");
					return false;
				}
			}
		});
		
		this.contenedor_datos.on("click", ".eliminar_recurso_editar_producto", function(e){
			if(confirm("¿Eliminar recurso?")){
				var contenedor_padre = $(this).closest(".producto_editado_recurso");
				var url_recurso = contenedor_padre.find("a:eq(0)").attr("href");
				var eliminado = parseInt(send("POST", "backend.php", returnFormData({ accion : 23, "apartado" : 4, "id_producto" : this.id_producto, "recurso" : url_recurso }), "html"));
				if(eliminado){
					contenedor_padre.remove();
				}else{
					alert("Se ha producido un error a la hora de eliminar el recurso");
				}
			}
		});
		
	}
	pintarYCapturarEventos(){ // Ejecutamos toda la funcionalidad
		this.setTitulo();
		this.setContainerData();
		this.setIdAndContainerToElements();
		this.setEvents();
		this.funcionQueHacerAlFinalizar.call(this);
	}
}