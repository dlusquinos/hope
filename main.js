

var salesTable;
var usersTable;

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
			
			{ "data": "scl",			  
			  "title": utilidades.i18n('users.scl'),
			  "render": function (data, type, row, meta) {
				 return data;
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

			var sumTotal=0;
			
			for(var i=0; i < data.length; i++) {
				var row = data[i];						
				sumTotal+= row.scl;
			}

			// Añadir el sumatorio al pie de la tabla
			$(this.api().column(3).footer()).html(sumTotal);
		 }
		
    });
	
	
	var dataSales = construirDataSales();
	salesTable.clear().rows.add(dataSales).draw();	
	
	usersTable.clear().rows.add(users_objects).draw();
	
});


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

