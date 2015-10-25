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
});

function onClickRow(row, $element) {
	console.log(row, $element);
}

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

function setupDatePicker(establishments, liquorLicensesData) {
	var earliestDate = findEarliestDate(liquorLicensesData);

	$('#datePicker').daterangepicker({
		"singleDatePicker": true,
		"startDate": earliestDate,
	}, function(start, end, label) {
		var filteredEstablishments = filterLicensesAfterDate(establishments, start);
		refreshTable(filteredEstablishments);
	});
}

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

function refreshTable(establishments) {
	console.log(establishments);
	$('#establishments').bootstrapTable('load', {
		data: establishments
	});
}

function filterLicensesAfterDate(establishments, date) {
	var afterDateFilter = function(establishment) {
		if(establishment['liquorLicenseDate']) {
			return moment(establishment['liquorLicenseDate']).isAfter(moment(date));
		}
		return false;
	}

	return establishments.filter(afterDateFilter);
}

function dateFormatter(date) {
	if (date) {
		return moment(date).format("MMMM Do, YYYY");
	}
}