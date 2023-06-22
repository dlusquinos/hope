

var salesTable;
var usersTable;
var dataSales;
var dataUsers;

$(document).ready(function() {

	utilidades.translateLabels();

	salesTable = $('#salesTable').DataTable({
        data: [],
        "columns": [


			{ "data": "check",	
			  "className": "text-center",
			  "orderable" : false,			  			  
			  "render": function (data, type, row, meta) {
				var checked = data ? "checked" : "";
				return '<input type="checkbox" tabindex="-1" class="checkbox" ' + checked + '>';			
			  }
			},


			{ "data": "week",
			  "type": "date-eu",		
			  "title": utilidades.i18n('sales.week'),
			  "render": function (data, type, row, meta) {
				return data;
			  }
			},
			

			{ "data": "caf.quantity",
			  "orderable" : false,
			  "className" : "price importe",
			  "title": utilidades.i18n('sales.quantity'),
			  "render": function (data, type, row, meta) {
					  return data ? data.toFixed(3) : "--";
			  }
			},
			
			{ "data": "caf.average",
			  "orderable" : false,
			  "className" : "price importe",
			  "title": utilidades.i18n('sales.average'),
			  "render": function (data, type, row, meta) {
				 return data ? data.toFixed(3) : "--";
			  }
			},
			
			{ "data": "caf.total",
			  "orderable" : false,
			  "className" : "price importe",
			  "title": utilidades.i18n('sales.total'),
			  "render": function (data, type, row, meta) {
				 return data ? data.toFixed(3) : "--";
			  }
			},
			
			{ "data": "water.quantity",
			  "orderable" : false,
			  "className" : "price importe",
			  "title": utilidades.i18n('sales.quantity'),
			  "render": function (data, type, row, meta) {
					  return data ? data.toFixed(3) : "--";
			  }
			},
			
			{ "data": "water.average",
			  "orderable" : false,
			  "className" : "price importe",
			  "title": utilidades.i18n('sales.average'),
			  "render": function (data, type, row, meta) {
				 return data ? data.toFixed(3) : "--";
			  }
			},
			
			{ "data": "water.total",
			  "orderable" : false,
			  "className" : "price importe",
			  "title": utilidades.i18n('sales.total'),
			  "render": function (data, type, row, meta) {
				 return data ? data.toFixed(3) : "--";
			  }
			}

        ],
        "paging": false,
        "info": false,
		"filter": false,
		"order": [[ 1, 'asc' ]],
		
		drawCallback: function(settings) {	
			$('#salesTable tbody .checkbox').off('change');
			$('#salesTable tbody .checkbox').on('change', function(event) {
				event.stopPropagation();
				
				var tr = $(this).closest('tr');
				var tabla = $('#salesTable').DataTable();
				var datosFila = tabla.row(tr).data();
				var checkValue = $(this).is(":checked");
				
				datosFila.check = checkValue;
				
				//Repintar fila		
				tabla.row(tr).data(datosFila);
				tabla.draw();
				
			});
		
			
			$('#salesTable thead .checkbox').off('change');
			$('#salesTable thead .checkbox').on('change', function(event) {
				event.stopPropagation();
				
				var checkValue = $(this).is(":checked");
				var tr = $(this).closest('tr');
				var tabla = $('#salesTable').DataTable();
				var tablaData = tabla.data();
				
				for(var i=0; i < tablaData.length; i++) {
					var datosFila = tablaData[i];
					datosFila.check = checkValue;
				}
				tabla.clear().rows.add(tablaData).draw();
				
			});
		
		
		
			$('#salesTable').DataTable().columns.adjust();	
		},
		
		footerCallback: function(row, data, start, end, display) {		

			var totalesCaf = calcularTotales('caf', row, data);
			var totalesWater = calcularTotales('water', row, data);

			// Añadir el sumatorio al pie de la tabla
			$(this.api().column(2).footer()).html(totalesCaf.sumaCantidad.toFixed(3));
			$(this.api().column(3).footer()).html(totalesCaf.precioMedio.toFixed(3));
			$(this.api().column(4).footer()).html(totalesCaf.sumTotal.toFixed(3));
			
			$(this.api().column(5).footer()).html(totalesWater.sumaCantidad.toFixed(3));
			$(this.api().column(6).footer()).html(totalesWater.precioMedio.toFixed(3));
			$(this.api().column(7).footer()).html(totalesWater.sumTotal.toFixed(3));						
		 }
		
    });
	
	
	usersTable = $('#usersTable').DataTable({
        data: [],
        "columns": [

			{ "data": "name",			  		
			  "title": utilidades.i18n('users.name'),
			  "render": function (data, type, row, meta) {
				return data;
			  }
			},
			

			{ "data": "user",			  
			  "title": utilidades.i18n('users.user'),
			  "render": function (data, type, row, meta) {
					  return data;
			  }
			},
			
			{ "data": "since",
			  "type": "date-eu",			
			  "title": utilidades.i18n('users.since'),
			  "render": function (data, type, row, meta) {
				 return data;
			  }
			},
			
			{ "data": "until",
			  "type": "date-eu",			
			  "title": utilidades.i18n('users.until'),
			  "render": function (data, type, row, meta) {
				 return data;
			  }
			},
			
			{ "data": "numCosechas",			  
			  "title": "Cosechas",
			  "render": function (data, type, row, meta) {
				 return data;
			  }
			},
			
			{ "data": "lands.scl",			  
			  "title": "SCL",
			  "render": function (data, type, row, meta) {
				 return data;
			  }
			},
			
			{ "data": "lands.ocl",			  
			  "title": "OCL",
			  "render": function (data, type, row, meta) {
				 return data;
			  }
			},
			
			{ "data": "lands.fcl",			  
			  "title": "FCL",
			  "render": function (data, type, row, meta) {
				 return data;
			  }
			},
			
			{ "data": "caf_boost_production",			  
			  "title": "Cosecha",
			  "render": function (data, type, row, meta) {
				 return data;
			  }
			},
			
			{ "data": "caf_total_production",			  
			  "title": "Total",
			  "render": function (data, type, row, meta) {
				 return data;
			  }
			},
			
			{ "data": "caf_total_cbx",			  
			  "title": "CBX",
			  "render": function (data, type, row, meta) {
				 return data.toFixed(2);
			  }
			},
			
			{ "data": "caf_consumption",			  
			  "title": "Cosecha",
			  "render": function (data, type, row, meta) {
				 return data;
			  }
			},
			
			{ "data": "caf_total_consumption",			  
			  "title": "Total",
			  "width": "200px",
			  "render": function (data, type, row, meta) {
				 return data;
			  }
			},
			
			{ "data": "caf_total_consumption_cbx",			  
			  "title": "CBX",
			  "render": function (data, type, row, meta) {
				 return data.toFixed(2);
			  }
			},
			
			{ "data": "caf_total_profit",			  
			  "title": "Total",
			  "render": function (data, type, row, meta) {
				 return data.toFixed(2);
			  }
			},
			
			{ "data": "caf_farmer_profit",			  
			  "title": "Granjero",
			  "render": function (data, type, row, meta) {
				 return data.toFixed(2);
			  }
			}

			

        ],
        "paging": false,
        "info": false,
		"filter": false,
		"order": [[ 1, 'asc' ]],
		
		drawCallback: function(settings) {	
			$('#usersTable').DataTable().columns.adjust();	
		},
		
		footerCallback: function(row, data, start, end, display) {		

			var sumTotalScl=0;
			var sumTotalOcl=0;
			var sumTotalFcl=0;
			
			for(var i=0; i < data.length; i++) {
				var row = data[i];						
				sumTotalScl+= row.lands.scl;
				sumTotalOcl+= row.lands.ocl;
				sumTotalFcl+= row.lands.fcl;
			}

			// Añadir el sumatorio al pie de la tabla
			$(this.api().column(5).footer()).html(sumTotalScl);
			$(this.api().column(6).footer()).html(sumTotalOcl);
			$(this.api().column(7).footer()).html(sumTotalFcl);
		 }
		
    });
	
	
	dataSales = construirDataSales();
	salesTable.clear().rows.add(dataSales).draw();	
	
	dataUsers =  construirDataUsers ()
	usersTable.clear().rows.add(dataUsers).draw();
	
});

function construirDataUsers () {
	
	for(var i=0; i < users_objects.length; i++) {
		
		var userData = users_objects[i];
		var numScl = userData.lands.scl;
		var numOcl = userData.lands.ocl;
		var numFcl = userData.lands.fcl;
		
		var numCarrotsSCL = getLand('scl').caf.boost_production;
		var numCarrotsOCL = getLand('ocl').caf.boost_production;
		var numCarrotsFCL = getLand('fcl').caf.boost_production;
		
		
		//Produccion
		userData['caf_boost_production'] = numScl*numCarrotsSCL + numOcl*numCarrotsOCL +  numFcl*numCarrotsFCL;
		
		//Fechas
		var numCosechas = Math.ceil(MIN_CAF_PRODUCTION/userData.caf_boost_production);
		userData['numCosechas'] = numCosechas;
		var fechaDesde = crearDate(userData.since);
		var fechaHasta = new Date(fechaDesde.getTime() + numCosechas * 5 * 24 * 60 * 60 * 1000);
		userData['until'] = formatDate(fechaHasta);
		
		userData['caf_total_production'] = numCosechas*userData['caf_boost_production'];
		var caf_average= obtenerAverageEntreFechas(fechaDesde,fechaHasta,'caf');		
		//caf_average = 1; //TODO: eliminar
		userData['caf_total_cbx'] = userData['caf_total_production']*caf_average;
		
		//Fees		
		var average_revisado = caf_average < 1 ? 1 : caf_average;
		var feeFormula = FEE_FORMULA.replace('caf_average', average_revisado);
		var fee = eval(feeFormula);
		var sclFee = numCarrotsSCL*fee;
		var oclFee = numCarrotsOCL*fee;
		var fclFee = numCarrotsFCL*fee;

		//Consumo
		var waterConsumption = numScl*getLand('scl').caf.consumption.water + numOcl*getLand('ocl').caf.consumption.water + numFcl*getLand('fcl').caf.consumption.water;
		var seedConsumption = numScl*getLand('scl').caf.consumption.seed + numOcl*getLand('ocl').caf.consumption.seed + numFcl*getLand('fcl').caf.consumption.seed;
		var feeConsumption = numScl*sclFee + numOcl*oclFee + numFcl*fclFee;
		userData['caf_consumption'] = waterConsumption + " water, " +  seedConsumption + " seed, " + feeConsumption.toFixed(2) + " fee"
		
		var water_average = obtenerAverageEntreFechas(fechaDesde,fechaHasta,'water');
		userData['caf_total_consumption'] = waterConsumption*numCosechas + " water, " +  seedConsumption*numCosechas + " seed, " + (feeConsumption*numCosechas).toFixed(2) + " fee"
		userData['caf_total_consumption_cbx'] = waterConsumption*numCosechas*water_average + seedConsumption*numCosechas*2 + feeConsumption*numCosechas;
		
		
		//Beneficio
		userData['caf_total_profit'] = userData['caf_total_cbx'] - userData['caf_total_consumption_cbx'];
		userData['caf_farmer_profit'] = userData['caf_total_profit']*FARMER_PROFIT_PERCENT;
	}

	return users_objects;	
	
}

function construirDataSales() {
	var dataList  = [];
	
	for(var i=0; i < sales_objects.length; i++) {
		var registro = sales_objects[i];
		var cafData = obtenerDatosProductoFila(registro, 'caf');
		var waterData = obtenerDatosProductoFila(registro, 'water');
		
		var data = {
			check: true,
			week: registro.week,
			caf: cafData,
			water: waterData
		}
		
		dataList.push(data);
	}
	
	return dataList;
}	


function obtenerDatosProductoFila(registro, producto) {
	
		var compras = registro[producto];
		var sumaProductos = 0;
		var sumaCantidad = 0;
		var precioMedio = 0;
		
		for (var j = 0; j < compras.length; j++) {
			sumaProductos += compras[j].quantity * compras[j].average;
			sumaCantidad += compras[j].quantity;
		}
		
		if(sumaProductos > 0) {
			precioMedio = sumaProductos / sumaCantidad;
		}	
		
		var data = {
			
			quantity: sumaCantidad,
			average: precioMedio,
			total: sumaProductos,
		};
		
		return data;
}


function calcularTotales(producto, row, data ) {
	var sumaProductos = 0;
	var sumaCantidad = 0;
	var sumTotal=0;
	var precioMedio =0;
	
	for(var i=0; i < data.length; i++) {
		var row = data[i];
		if(row.check) {		
			sumaProductos += row[producto].quantity * row[producto].average;
			sumaCantidad += row[producto].quantity;
			sumTotal+= row[producto].total;
		}
	}

	if(sumaProductos > 0) {
		precioMedio = sumaProductos / sumaCantidad;
	}
	


	var sumatorio = {
		sumaCantidad: sumaCantidad,
		precioMedio: precioMedio,
		sumTotal: sumTotal
	}
	
	return sumatorio;

}

function getLand(land_name) {
	
	var land = lands_objects.find(function(item) {
		return item.name === land_name;
	}); 
	return land;
}

function formatDate(fecha) {
	// Obtiene el día, mes y año de la fecha actual
	var dia = fecha.getDate();
	var mes = fecha.getMonth() + 1; // Se suma 1 porque los meses se indexan desde 0
	var anio = fecha.getFullYear();

	// Formatea la fecha con ceros a la izquierda si es necesario
	if (dia < 10) {
	  dia = '0' + dia;
	}
	if (mes < 10) {
	  mes = '0' + mes;
	}

	return dia + '/' + mes + '/' + anio;
}


function crearDate(fechaStr) {
	// Extraer día, mes y año de la cadena de texto
	var partesFecha = fechaStr.split("/");
	var dia = parseInt(partesFecha[0], 10);
	var mes = parseInt(partesFecha[1], 10) - 1; // Se resta 1 porque los meses se indexan desde 0
	var anio = parseInt(partesFecha[2], 10);

	// Crear el objeto Date con la fecha especificada
	var fecha = new Date(anio, mes, dia);
	
	return fecha;
}



function obtenerAverageEntreFechas(fechaDesde, fechaHasta, producto) {
	
	var ventas=[];
	for(var i=0; i < dataSales.length; i++) {
		var sale = dataSales[i];
		var week = crearDate(sale.week);
		
		if (week >= fechaDesde && week < fechaHasta) {
			ventas.push(sale);
		}
	}	
		
		
	var sumaProductos = 0;
	var sumaCantidad = 0;
	for(var j=0; j < ventas.length; j++) {
		var row = ventas[j];				
		sumaProductos += row[producto].quantity * row[producto].average;
		sumaCantidad += row[producto].quantity;			
	}

	var precioMedio =0;
	if(sumaProductos > 0) {
		precioMedio = sumaProductos / sumaCantidad;
	}
	
	return precioMedio;
}
