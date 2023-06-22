
var MIN_CAF_PRODUCTION = 1000;
var FARMER_PROFIT_PERCENT = 1;
var FEE_FORMULA = '0.73 +(caf_average-1)*0.30'

var sales_objects = [
	{
	 week: '28/05/2023', 
	 caf:  [{quantity: 500, average: 1.101}, {quantity: 1200, average: 1.063}, {quantity: 800, average: 1.085} ],
	 water: [{quantity: 10000, average: 0.048}, {quantity: 2000, average: 0.056}, {quantity: 27634, average: 0.06} ]
	},
	{
	 week: '04/06/2023', 
	 caf:  [{quantity: 7500, average: 1.001}, {quantity: 4567, average: 1.093}, {quantity: 840, average: 1.11} ],
	 water: []
	},
	{
	 week: '11/06/2023', 
	 caf:  [],
	 water: [{quantity: 9700, average: 0.058}, {quantity: 2070, average: 0.056}, {quantity: 4634, average: 0.062}] 
	}

]


var users_objects = [
	{name: 'Diego L.', user: '@diegolusquinos', since: '04/06/2023', lands: {scl: 20, ocl: 0, fcl: 0}},
	{name: 'Kike', user: '@KikeMercado', since: '04/06/2023', lands: {scl: 15, ocl: 0, fcl: 0}}
]


var lands_objects = [
	{name: 'scl', caf: { production:3 , consumption: {water:1, seed:1}, boost_production: 11} },
	{name: 'ocl', caf: { production:5 , consumption: {water:1, seed:1}, boost_production: 13} },
	{name: 'fcl', caf: { production:60, consumption: {water:12, seed:12}, boost_production: 156} }
]



