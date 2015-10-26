$(function() {
	var establishmentParams = {
		'$limit': 5000
	};
	var liquorParams = {
		'$limit': 5000
	};
	
	var establishmentsData = [];
	var liquorLicensesData = [];

	getEstablishments(establishmentParams, function(foodData) {
		establishmentsData = foodData;

		buildBootstrapTable(foodData);

		getLiquorLicenses(liquorParams, function(liquorData) {
			liquorLicensesData = liquorData;

			setupDatePicker(establishmentsData, liquorLicensesData);

			syncLiquorData(establishmentsData, liquorLicensesData);
		});
	});

	$('#licenseFilter').change(function() {
		console.log($('#datePicker').val());
		filterAfterDate($('#datePicker').val(), establishmentsData) 
	});

	$('#clear').click(function() {
		refreshTable(establishmentsData);
	});
});

function onClickRow(row, $element) {
	// console.log(row, $element);
}

// Adds liquorLicenseDate field to each establishment that has a liquor license
function syncLiquorData(establishmentsData, liquorData) {
	establishmentsData.forEach(function(establishment, index) {
		liquorData.forEach(function(liquorLicense) {
			if(establishment['businessname'].toLowerCase() == liquorLicense['dbaname'].toLowerCase()) {
				if(establishment['zip'] == liquorLicense['zip']){
					establishment['liquorLicenseDate'] = liquorLicense['issdttm'];
				}
			}
 		});
	});
}

// Creates a date picker where the starting date is the earliest liquor license
function setupDatePicker(establishments, liquorLicensesData) {
	var earliestDate = findEarliestDate(liquorLicensesData);

	$('#datePicker').daterangepicker({
		"singleDatePicker": true,
		"startDate": earliestDate,
	}, function(start, end, label) {
		console.log("Helloer")
		filterAfterDate(start, establishments);
	});
}

// Find the earliest license date from a list of licenses
function findEarliestDate(licenses) {
	var earliest = null;
	licenses.forEach(function(license) {
		if(!earliest) {
			earliest = moment(license['issdttm']);
		}
		else {
			var nextDate = moment(license['issdttm']);
			if(nextDate.isBefore(earliest)) {
				earliest = nextDate;
			}
		}
	});
	return earliest;
}

function buildBootstrapTable(data) {
	$('#establishments').bootstrapTable({
			data: data,                
			pagination: true,
			pageSize: 15,
			search: true,
			onClickRow: onClickRow,
			columns: [{
				field: 'businessname',
				title: 'Business Name',
				align: 'center',
				sortable: true
			},
			{
				field: 'address',
				title: 'Address',
				align: 'center',
			},
			{
				field: 'licenseadddttm',
				title: 'Food License Date',
				align: 'center',
				formatter: dateFormatter,
				sortable: true
			},
			{
				field: 'liquorLicenseDate',
				title: 'Liquor License Date',
				align: 'center',
				formatter: dateFormatter,
				sortable: true
			}]
		});
}

// Rebuilds the table with the given array of establishments
function refreshTable(establishments) {
	$('#establishments').bootstrapTable('load', {
		data: establishments
	});
}

// Returns a easily readible date for display
function dateFormatter(date) {
	if (date) {
		return moment(date).format("MMMM Do, YYYY");
	}
}