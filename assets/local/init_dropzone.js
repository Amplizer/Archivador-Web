Dropzone.autoDiscover = false;
function inicializarDropzone(dropzoneName, opciones, functionEjecutarMandarParametros){
	var numero_archivos =  ( opciones != undefined ) ? opciones.numero_archivos || 99 : 99;
	var tipos_archivos_permitidos = ( opciones != undefined ) ? opciones.tipos_archivos_permitidos || [ 1 ] : [ 1 ];
	var dropzone = new Dropzone(dropzoneName, {
		maxFiles : numero_archivos,
		parallelUploads : numero_archivos,
		autoProcessQueue : false,
		uploadMultiple : true,
		url : "backend.php",
		init : function(){
			this.tipos_archivos_permitidos = tipos_archivos_permitidos;
			this.funcion_ejecutar_finalizar_proceso = functionEjecutarMandarParametros;
			this.on("addedfile", function(file){
				var aceptado = false;
				this.tipos_archivos_permitidos.forEach( ( type ) => {
					if(type == 1 || String(file.type).localeCompare(type) == 0){
						var botonEliminar = document.createElement("button");
						botonEliminar.classList.add("btn");
						botonEliminar.classList.add("eliminar_archivo");
						botonEliminar.classList.add("btn-danger");
						botonEliminar.classList.add("text-white");
						botonEliminar.classList.add("btn-block");
						botonEliminar.style.borderRadius = "20px";
						botonEliminar.style.marginTop = "5px";
						botonEliminar.innerText = "Eliminar";
						file.previewTemplate.appendChild(botonEliminar);
						file.previewTemplate.style.border = "2px solid #F3F3F3";
						file.previewTemplate.style.borderRadius = "10px";
						file.previewTemplate.style.padding = "5px";
						file.previewTemplate.querySelectorAll(".dz-image")[0].style.background = "#F3F3F3";
						$(file.previewTemplate).find(".eliminar_archivo").on("click", function(e){
							e.preventDefault();
							e.stopPropagation();
							if(confirm("¿Eliminar archivo?")){
								//$(this).closest(".dz-preview").remove();
								dropzone.removeFile(file);
							}
						});
						aceptado = true;
					}
				}, true);
				
				if(!aceptado){
					alert("El tipo de archivo que intenta subir no está permitido. Tipos de archivos permitidos ( MIME ): " + String(this.tipos_archivos_permitidos.join(", ")) + ".");
				}
				
			});
			this.on("sending", function(file, xhr, formData){
				var $container = $(this.previewsContainer);
				formDataGetted = $container.closest("form")[0].getFormData(); // Cada dropzone que creemos, tendremos que crearlo dentro de un formulario, para que cuando podamos obtener los parametros que queramos de ese formulario creando una funcion dentro de él, y llamándola cuando sea necesario. Esta función devolverá los parámetros que nos interese del formulario en un objeto formdata.
				if(formDataGetted != null && formDataGetted != undefined && String(typeof(formDataGetted)).localeCompare("object") == 0 && formDataGetted.forEach != undefined){
					formDataGetted.forEach( ( value, index ) => {  if(formData.get(index) == null || formData.get(index) == undefined) formData.append(index, value); }, true);
				}
			});
			this.on("complete", function(file){
				//file.previewTemplate.remove();
				this.removeFile(file);
			});
			this.on("success", function(file, response){
				dropzone.id_elemento_insertado = parseInt(response);
				
				if( this.funcion_ejecutar_finalizar_proceso != undefined && this.funcion_ejecutar_finalizar_proceso != null && ( this.funcion_ejecutar_finalizar_proceso.length > 0 ) ){
					this.funcion_ejecutar_finalizar_proceso.forEach( ( _this ) => { _this.call(this, response); }, true);
				}
				
				/*if( this.funcion_ejecutar_finalizar_proceso != undefined && this.funcion_ejecutar_finalizar_proceso != null ){
					this.funcion_ejecutar_finalizar_proceso(response);
				}*/
			});
		}
		} );
	$(dropzoneName)[0].dropzone = dropzone;
}