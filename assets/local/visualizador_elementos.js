//Visualizador de elementos.
// Este plugin permitirá elegir una escala con la que visualizar diferentes elementos, y permitirá cargar la estructura que tendrán los elementos dependiendo de que tipo de archivo contenga. También permitirá buscar elementos según palabras clave

if(jQuery != undefined){
	
	if(!window['sjVisualElements'])
		window['sjVisualElements'] = {
			remove : function(element){ // Delete an element calling remove
				var elementId = element.__veId, sjVisualElementsParentContainer = $(element).closest(".js_parent_container")[0], elements = sjVisualElementsParentContainer.initData.elements, newElementsList = [];
				Object.keys(elements).forEach( ( value, index ) => { if( elements[index].__veId != elementId ) newElementsList.push(elements[index]); }, true );
				sjVisualElementsParentContainer.initData.elements = newElementsList;
				$(sjVisualElementsParentContainer).sjVisualElements( sjVisualElementsParentContainer.initData );
			},
			delete : function(element){ // Delete an emelent calling remove
				this.remove(element);
			},
			insert : function(sjVisualElementsContainer, elementProperties, sjVisualElementsProperties){
				var sjVisualElementsParentContainer = $(sjVisualElementsContainer).closest(".js_parent_container")[0];
				var elementsLength = sjVisualElementsParentContainer.initData.elements.length;
				var position = ( sjVisualElementsProperties == undefined || sjVisualElementsProperties == null ) ? 0 : ( sjVisualElementsProperties.position != null && sjVisualElementsProperties.position != undefined && !isNaN(parseInt(sjVisualElementsProperties.position)) ) ? sjVisualElementsProperties.position : 0;
				if(elementsLength < position) position = ( elementsLength );
				sjVisualElementsParentContainer.initData.elements.splice( position, 0, elementProperties);
				$(sjVisualElementsParentContainer).sjVisualElements( sjVisualElementsParentContainer.initData );
			},
			add : function(sjVisualElementsContainer, elementProperties, sjVisualElementsProperties){
				this.insert(sjVisualElementsContainer, elementProperties, sjVisualElementsProperties);
			},
			utils : {
				ajax : function(url = "", method = "POST", data = []){
					var xhr = new XMLHttpRequest(), response = null;
					xhr.onreadystatechange = function(){
						if(xhr.readyState == 4 && ( xhr.status == 200 || xhr.status == 201 || xhr.status == 202 || xhr.status == 203 ) ){
							response = JSON.parse(xhr.responseText)
						}
					}
					xhr.onerror = function(){
						rejected(xhr, xhr.status);
					}
					xhr.open(method, url, false);
					xhr.send(data);
					return response;
					/* return new Promise( ( resolved, rejected ) => {
						var xhr = new XMLHttpRequest();
						xhr.onreadystatechange = function(){
							if(xhr.readyState == 4 && ( xhr.status == 200 || xhr.status == 201 || xhr.status == 202 || xhr.status == 203 ) ){
								switch(true){
									case dataTypeReturn.localeCompare("json") == 0:
										alert("1");
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
						xhr.open(method, url, false);
						xhr.send(data);
					} ); */
				}
			}
		}
	
	jQuery.fn.extend({
		sjVisualElements : function(visualiceElementsOptions, element = null){
			
			switch(true){ // Instancia del objeto ( inicialización )
				case visualiceElementsOptions.action == undefined:
				case visualiceElementsOptions.action == null:
				case String(visualiceElementsOptions.action).localeCompare("init") == 0:
					let defaultImgBackground = "assets/visual_elements/editor.png";
					
					var $container = $(this);
					console.log(visualiceElementsOptions.objectStructure);
					var elementPaintStructure = visualiceElementsOptions.objectStructure;
					console.log(visualiceElementsOptions.elements);
					var elementsToPaint = ( visualiceElementsOptions.elements ) ? visualiceElementsOptions.elements : [];
					var utils = window['sjVisualElements'].utils;
					var elementsSource = visualiceElementsOptions.elementsSource;
					
					var isMobile = verifyIsMobile();
					
					if(elementsSource != undefined && elementsSource != null && elementsSource.length > 0){
						elementsSource.forEach( (url, urlIndex, urlArray) =>  { 
							elementsToPaint = elementsToPaint.concat( utils.ajax(url, "GET", []) );
							//$.get(url, (rps) => { elementsToPaint = elementsToPaint.concat(rps); }, "json" );
							//utils.ajax(url, "GET", [], "json").then( (rps) => { elementsToPaint = elementsToPaint.concat(rps); alert("1"); } );
							//var aa = Promise.all( [utils.ajax(url, "GET", [], "json")] );
							//elementsToPaint = elementsToPaint.concat( utils.ajax(url, "GET", [], "json").then( (rps) => { return rps; } , (error) => { console.error("error getting data from " + url); } ));
							/*var xhr = new XMLHttpRequest();
							xhr.onreadystatechange = function(){
								if(xhr.readyState == 4 && ( xhr.status == 200 || xhr.status == 201 || xhr.status == 202 || xhr.status == 203 ) ){
									 elementsToPaint = elementsToPaint.concat(JSON.parse(xhr.responseText));
								}
							}
							xhr.onerror = function(){
								rejected(xhr, xhr.status);
							}
							xhr.open("GET", url, false);
							xhr.send("");*/
						} );
						
						delete visualiceElementsOptions.elementsSource;
					}
					
					elementsToPaint = getAndgenerateId(elementsToPaint);
					
					visualiceElementsOptions.elements = elementsToPaint;
					
					$container.addClass("js_parent_container"); /* Add this class for use later */
					$container[0].eventsAttached = {}; // Attach events hear
					
					var options = { // Default options
						lang : "eng", /* Default lang, you need to import by default */
						viewType : "medium",
						smallDeviceColumnsLength : 3,
						mediumDeviceColumnsLength : 6,
						largeDeviceColumnsLength : 6,
						responsive : true,
						fadeInit : true,
						fadeInitTime : 100, // 100 milliseconds
						fadeInitAllElements : false,
						fadeInitElementByElement : true,
						elementsPageStart : 0,
						paginator : true,
						elementsPageLength : 25,
						searchElements : true,
						searchElementsSensitiveCase : true,
						isMobile : isMobile,
						searchPaint : {
							active : false,
							identity : "" /* Search elements by identity */
						},
						objectStructure : {
							"image/png" : {
								src : "http://167.86.123.38/archivador_web/assets/imgs/book.png",
								height : 128, /* px */
								width : 128, /* px */
							}
						},
						events : {
							eventClick : function(event){ },
							eventMouseEnter : function(event){ },
							eventMouseOut : function(event){ },
							//eventContainerMouseEnter : function(events /* Array containing events */){ },
							//eventContainerMouseOut : function(events /* Array containing events */){ },
							eventDeleteClick : function(event){ }
						}
					}
					
					console.log(elementPaintStructure);
					
					$.map(visualiceElementsOptions, function(value, index){ // Set default options passed by param instance
						if( options[ index ] != undefined && options[ index ] != null ) options[ index ] = value;
					});
					
					$.map(options, function(value, index){ // Set default options passed by param instance
						visualiceElementsOptions[ index ] = value;
					});
					
					$container[0].initData = visualiceElementsOptions;					
					
					if( options.fadeInitAllElements && options.fadeInitElementByElement ) options.fadeInitAllElements = false; // Set only one fade init
					
					Object.assign(options, { smallDeviceImgResourceWidth : "150 px", mediumDeviceImgResourceWidth : "250 px", largeDeviceImgResourceWidth : "250 px" }); // Add private properties to options object
					
					function paintElements($container, elementList, options, viewType, elementsHorizontalLength){ // Called for paint All elements passed by param ( delete previous elements )
						var elementsHTML = "";
						var counter = 0;
						var elementListFiltered = elementList;
						if(options.searchPaint.active){ // Recreate elementsFilter using identity passed
							var identity = options.searchPaint.identity;
							elementListFiltered = elementListFiltered.filter( ( element, elementIndex ) => { if( searchElementsProperties(element, identity, options) ) return element; } );
						}
						elementListFiltered.filter( (element, elementIndex) => { if( elementIndex >= options.elementsPageStart && elementIndex < ( options.elementsPageLength + options.elementsPageStart) ) return element; } ).forEach((element, elementIndex) => {
							elementsHTML += paintHTMLElement( generateElementHTMLView(viewType, options, element), (counter + 1), elementsHorizontalLength);
							counter++;
						}, true);
						$container.html( elementsHTML );
						addPropertiesToElements($container, elementListFiltered, options);
						fixElementsHeight($container);
					}
					
					function addPropertiesToElements($container, elementList, options){
						var htmlElements = $container.find(".js_visual_elements_default_element"), htmlElementsDelete = $container.find(".js_visual_elements_default_element_delete"), counter = 0;
						elementList.filter( (element, elementIndex) => { if( elementIndex >= options.elementsPageStart && elementIndex < ( options.elementsPageLength + options.elementsPageStart) ) return element; } ).forEach((element, elementIndex) => {
							console.log("start: " + options.elementsPageStart + " - " + options.elementsPageLength + " - Elements length: " + Object.keys(elementList[elementIndex]).length);
							Object.keys(elementList[elementIndex]).forEach( ( elementPropertyIndex ) => {
								try{
									if(!htmlElements[counter][elementPropertyIndex]) htmlElements[ counter ][elementPropertyIndex] = elementList[ ( options.elementsPageStart + elementIndex ) ][elementPropertyIndex];
									if(!htmlElementsDelete[counter][elementPropertyIndex]) htmlElementsDelete[ counter ][elementPropertyIndex] = elementList[ ( options.elementsPageStart + elementIndex ) ][elementPropertyIndex];
								}catch(error){
									console.log("Error: " + (options.elementsPageStart + elementIndex));
								}
							}, true);
							counter++;
						}, true);
					}
					
					// -- Utils --
					
					function fixElementsHeight($container){
						$container.find(".js_visual_elements_default_element").each( function(){
							let height = parseInt($(this).attr("data-height"));
							let offSetHeight = $(this).height();
							let percentaje = (( offSetHeight * 100 ) / height);
							$(this).css("background-size", percentaje + "%");
						});
					}
					
					function searchElementsProperties(object, identity, options){
						var findIt = false, regExp = new RegExp("(" + identity + ")");
						if(options.searchElementsSensitiveCase) regExp.ignoreCase = true;
						Object.keys(object).map( ( objectProperty ) => {
							switch(true){
								case String(typeof(object[objectProperty])).localeCompare("object") == 0:
									 if(!findIt) findIt = searchElementsProperties(object[objectProperty], identity, options);
									
								break;
								default:
									console.log("reg Exp: ");
									console.log(regExp.exec(object[objectProperty]));
									console.log("------");
									if(regExp.exec(object[objectProperty]) != null) if(!findIt) findIt = true;
								break;
							}
							console.log("Find it: ");
							console.log(findIt);
							console.log("------");
						//	if(findIt) break;
						} );
						return findIt;
					}
					
					function getAndgenerateId(elements){
						var counter = 1;
						Object.keys(elements).forEach( ( value, index ) =>{ elements[index]['__veId'] = counter; counter++; }, true );
						return elements;
					}
					
					// --------------
					
					function paintHead($container, thLength){
						for(let a = 0; a < thLength; a++){
							$container.find("thead").append("<th></th>");
						}
					}
					
					function paintHTMLElement( elementHTML, position, elementsHorizontalLength){ // paintAllElements
						if( elementsHorizontalLength == 1 ){
							return "<tr><td> <div class='js_visual_elements_default_element_parent'> <div class='js_visual_elements_default_element_delete'>  <i class='sj_delete_element material-icons '> delete </i>  </div> " + elementHTML + " </div> </td></tr>";
						}else if(position % elementsHorizontalLength == 0 ){
							return "<td> <div class='js_visual_elements_default_element_parent'> <div class='js_visual_elements_default_element_delete'>  <i class='sj_delete_element material-icons '> delete </i>  </div></div>" + elementHTML + " </div> </td></tr>";
						}else if( ( position - 1 ) % elementsHorizontalLength == 0 ){
							return "<tr><td> <div class='js_visual_elements_default_element_parent'> <div class='js_visual_elements_default_element_delete'>  <i class='sj_delete_element material-icons '> delete </i>  </div></div>" + elementHTML + " </div> </td>";
						}else{
							return "<td> <div class='js_visual_elements_default_element_parent'> <div class='js_visual_elements_default_element_delete'> <i class='sj_delete_element material-icons '> delete </i> </div></div>" + elementHTML + " </div> </td>";
						}
					}
					
					function setPluginEvents($container){
						$container.on("mouseenter", ".js_visual_elements_default_element_delete", function(e){
							console.log("entra");
							return false;
						});
						$container.on("mouseout", ".js_visual_elements_default_element_delete", function(e){
							console.log("sale");
							return false;
						});//js_parent_container
						$container.on("click", ".sj-paginator-left", function(e){
							//console.log($(this).closest(".js_parent_container")[0].initData);
							if($(this).closest(".js_parent_container")[0] != undefined){
								let eventsRangeToShow = $(this).closest(".js_parent_container")[0].initData.elementsPageStart - $(this).closest(".js_parent_container")[0].initData.elementsPageLength;
								if( eventsRangeToShow >= 0){
									$(this).closest(".js_parent_container")[0].initData.elementsPageStart -= $(this).closest(".js_parent_container")[0].initData.elementsPageLength;
									$(this).closest(".js_parent_container").sjVisualElements( $(this).closest(".js_parent_container")[0].initData );
								}
							}
						});
						$container.on("click", ".sj-paginator-right", function(e){
							//console.log($(this).closest(".js_parent_container")[0].initData);
							if($(this).closest(".js_parent_container")[0] != undefined){
								let eventsRangeToShow = $(this).closest(".js_parent_container")[0].initData.elementsPageStart + $(this).closest(".js_parent_container")[0].initData.elementsPageLength;
								let eventsLength = $(this).closest(".js_parent_container")[0].initData.elements.length;
								if( eventsRangeToShow <= eventsLength){
									$(this).closest(".js_parent_container")[0].initData.elementsPageStart += $(this).closest(".js_parent_container")[0].initData.elementsPageLength;
									$(this).closest(".js_parent_container").sjVisualElements( $(this).closest(".js_parent_container")[0].initData );
								}
								console.log("eventsRangeToShow: " + eventsRangeToShow + " - " + eventsLength);
							}
						});
					}
					
					function setEvents($container, events = []){ // Set events attacheds to elements
						
						/*
						$containerEventsAttached = ($container.hasClass("js_parent_container")) ? $container : $(container).closest(".js_parent_container");
						
						if(events.length > 0){
							events.forEach( (actualEvent, actualEventName) => {
								$containerEventsAttached[0].eventsAttached[ actualEventName ] = value; // If needs to repaint element, use this reference to reAttach events to elements
							}, true );
						}
						
							//Object.keys(events).forEach( ( eventName ) => { $container.find(".js_visual_elements_default_element").on(eventName, events[eventName]); }, true);
							
						*/
						
						if(events["eventClick"]) $container.find(".js_visual_elements_default_element").on("click", events["eventClick"]);
						if(events["eventMouseEnter"]) $container.find(".js_visual_elements_default_element").on("mouseenter", events["eventMouseEnter"]);
						if(events["eventMouseOut"]) $container.find(".js_visual_elements_default_element").on("mouseout", events["eventMouseOut"]);
						if(events["eventDeleteClick"]) $container.find(".js_visual_elements_default_element_delete").on("click", events["eventDeleteClick"]);
						
					}
					
					function generateElementHTMLView(viewType /* device type */ , generateHTMLViewProperties /* Options properties */, elementProperties /* Actual element Properties */){ // Return a default html view depending device type ( small, medium or large )
						var img = null;
						var height = null;
						switch(true){
							case String(viewType).localeCompare("small") == 0:
								//return " <div class='row'><div class='col-md-12 mrb-element'> <img src='" + generateHTMLViewProperties.objectStructure[ elementProperties.elementType ].src + "' alt='" + elementProperties.title + "' /> </div></div> ";
								switch(elementProperties.backgroundImage){
									case undefined:
									case null:
									case '':
										img = generateHTMLViewProperties.objectStructure[ elementProperties.elementType ].src;
										height = generateHTMLViewProperties.objectStructure[ elementProperties.elementType ].height;
									break;
									default:
										img = elementProperties.backgroundImage;
										height = elementProperties.height;
									break;
								}
								return " <div class=' js_visual_elements_default_element'  alt='" + elementProperties.nombre_producto + "' data-height='" + height + "' style='background-size: 100% 100%; background-image: url( " + img + " ) ;' ><div class='col-md-12 mrb-element'> " + elementProperties.nombre_producto + " </div></div> ";
							break;
							case String(viewType).localeCompare("medium") == 0:
								//return " <div class='row'><div class='col-md-12 mrb-element'> <img src='" + generateHTMLViewProperties.objectStructure[ elementProperties.elementType ].src + "' alt='" + elementProperties.title + "' /> </div></div> ";
								switch(elementProperties.backgroundImage){
									case undefined:
									case null:
									case '':
										img = generateHTMLViewProperties.objectStructure[ elementProperties.elementType ].src;
										height = generateHTMLViewProperties.objectStructure[ elementProperties.elementType ].height;
									break;
									default:
										img = elementProperties.backgroundImage;
										height = elementProperties.height;
									break;
								}
								return " <div class=' js_visual_elements_default_element'  alt='" + elementProperties.nombre_producto + "' data-height='" + height + "' style='background-size: 100% 100%; background-image: url( " + img + " ) ;' ><div class='col-md-12 mrb-element'>" + elementProperties.nombre_producto + "</div></div> ";
							break;
							case String(viewType).localeCompare("high") == 0:
								//return " <div class='><div class='col-md-12 mrb-element'> <img src='" + generateHTMLViewProperties.objectStructure[ elementProperties.elementType ].src + "' alt='" + elementProperties.title + "' /> </div></div> ";
								switch(elementProperties.backgroundImage){
									case undefined:
									case null:
									case '':
										img = generateHTMLViewProperties.objectStructure[ elementProperties.elementType ].src;
										height = generateHTMLViewProperties.objectStructure[ elementProperties.elementType ].height;
									break;
									default:
										img = elementProperties.backgroundImage;
										height = elementProperties.height;
									break;
								}
								return " <div class=' js_visual_elements_default_element'  alt='" + elementProperties.nombre_producto + "' data-height='" + height + "' style='background-size: 100% 100%; background-image: url( " + img + " ) ;' ><div class='col-md-12 mrb-element'> " + elementProperties.nombre_producto + " </div></div> ";
							break;
							default: // Like high element
							
							break;
						}
					}
					
					function paintDefaultStructure($container, /* jQuery Object Param */ options, elementList){
						let elementListLength = ( ( options.elementsPageStart + options.elementsPageLength ) > elementList.length ) ? elementList.length : ( options.elementsPageStart + options.elementsPageLength );
						//	$container.html(" <table class='table table-hover table-striped' style='display: table-cell; border: 0px !important;'> <thead> </thead> <tbody></tbody> </table> ");
						$container.html(" <div class='js_container_search'> </div> <div class='js_container_table'> </div> <div class='sj-paginator'> <button class='btn btn-dark sj-paginator sj-paginator-left'> << </button> <p class='sj-paginator sj-paginator-counter'> Mostrando " + String((options.elementsPageStart + 1)).padStart(1, "0") + "/"  +  String( elementListLength ).padStart(1, "0")+ " de  " + elementList.length + " elementos.</p> <button class='btn btn-dark sj-paginator sj-paginator-right'> >> </button> </div>");
						$container_table = $container.find(".js_container_table").html("<table class='sj_visual_elements' style='width: 100%; border: 0px !important;'> <thead> </thead> <tbody></tbody> </table>");
					}
					
					function paintSearchStructure($container, options){
						if(options.searchElements){
							var defaultValue = options.searchPaint.identity;
							$container.find(".js_container_search").html("<hr/> <input type='text' value='" + defaultValue + "' placeholder='Buscar elementos' class='sj_search sj_search_style'> ");
							$container.find(".js_container_search .sj_search").on("keyup", searchElements);
							if(String(defaultValue).trim().localeCompare("") != 0){
								$container.find(".js_container_search .sj_search")[0].selectionEnd = $container.find(".js_container_search .sj_search").val().length;
								$container.find(".js_container_search .sj_search")[0].selectionStart = $container.find(".js_container_search .sj_search").val().length;
								$container.find(".js_container_search .sj_search").focus();
							}
						}
					}
					
					function searchElements(e){
						e.preventDefault();
						e.stopPropagation();//searchPaint
						var textValue = this.value;
						var dataContainer = $(this).closest(".js_parent_container")[0];
						if(String(textValue).trim().localeCompare("") == 0){
							dataContainer.initData.searchPaint.active = false;
							dataContainer.initData.searchPaint.identity = "";
						}else{
							dataContainer.initData.searchPaint.active = true;
							dataContainer.initData.searchPaint.identity = textValue;
						}
						
						$(dataContainer).sjVisualElements( dataContainer.initData );
						
					}
					
					function paintPlugin($container, elementList, options){ // Call to paint structure and elements
						let viewType = getViewType($container);
						let elementsHorizontalLength = ( String(viewType).localeCompare("small") == 0 ) ? options.smallDeviceColumnsLength : ( String(viewType).localeCompare("medium") == 0 ) ? options.mediumDeviceColumnsLength : options.largeDeviceColumnsLength;
						paintDefaultStructure($container, options, elementList);
						paintSearchStructure($container, options);
						paintHead($container, elementsHorizontalLength);
						paintElements($container.find("tbody"), elementList, options, viewType, elementsHorizontalLength);
						setPluginEvents($container);
						setEvents($container, options.events);
					}
					
					function setViewType($container, viewtype){
						$container[0].viewType = viewtype;
					}
					
					function getViewType($container){ // Return actual view type
						return $container[0].viewType;
					}
					
					function init($container, elementList, options){
						setViewType($container, options.viewType);
						paintPlugin($container, elementList, options);
						attachDefault($container);
						setMobileDefaults($container, options);
						if(options.responsive){
							setResponsive($container);
						}else{
							noResponsive();
						}
					}
					
					function noResponsive($container){
						$container[0].style.overflowY = "scroll";
						$container[0].style.overflowY = "scroll";
					}
					
					function setResponsive($container){
						$container[0].addEventListener("resize", function(e){
							let documentWidth = document.body.offsetHeight;
							switch(true){
								case documentWidth <= 768:
									$(this).viewType = "small";
								break;
								case documentWidth <= 1980:
									$(this).viewType = "medium";
								break;
								case documentWidth > 1980:
									$(this).viewType = "high";
								break;
							}
						});
					}
					
					function verifyIsMobile() {
					  var verifyIsMobile = false;
					  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) verifyIsMobile = true;})(navigator.userAgent||navigator.vendor||window.opera);
					  return verifyIsMobile;
					};
					
					function setMobileDefaults($container, options){
						if(options.isMobile){
							$container.find(".sj-paginator").addClass("sj-paginator-mobile");
							$container.find(".sj-paginator-left").addClass("sj-paginator-left-mobile");
							$container.find(".sj-paginator-right").addClass("sj-paginator-right-mobile");
							$container.find(".sj-paginator-counter").addClass("sj-paginator-counter-mobile");
						}
					}
					
					function attachDefault($container, properties){ // Attach default properties to $container for assyncs calls to plugin
						$.map( properties, (property, propertyName) => {
							$container[0][ propertyName ] = property;
						}, true);
					}
					
					init($container, elementsToPaint, options);
					
				break;
			}
		}
	});
}