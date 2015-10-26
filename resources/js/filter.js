/* Gets the currently selected license filter and finds all establishments with
   licenses after the given date
*/
function filterAfterDate(date, establishments) {
	var filteredEstablishments = [];
	var selected = $('#licenseFilter').val();

	switch(selected) {
		case "Food":		
			filteredEstablishments = filterFoodLicensesAfterDate(establishments, date);
			break;
		case "Liquor":
			filteredEstablishments = filterLiquorLicensesAfterDate(establishments, date);
			break;
		case "Both":
			filteredEstablishments = filterBothLicensesAfterDate(establishments, date);
			break;
	}

	refreshTable(filteredEstablishments);
}

// Finds all establishments with liquor licenses after the given date
function filterLiquorLicensesAfterDate(establishments, date) {
	var afterDateFilter = function(establishment) {
		if(establishment['liquorLicenseDate']) {
			return moment(establishment['liquorLicenseDate']).isAfter(moment(date));
		}
		return false;
	}
	return establishments.filter(afterDateFilter);
}

// Finds all establishments with food licenses after the given date
function filterFoodLicensesAfterDate(establishments, date) {
	var afterDateFilter = function(establishment) {
		return moment(establishment['licenseadddttm']).isAfter(moment(date));
	}
	return establishments.filter(afterDateFilter);
}

// Finds all establishments with both food and liquor licenses after the given date
function filterBothLicensesAfterDate(establishments, date) {
	var afterDateFilter = function(establishment) {
		if(establishment['liquorLicenseDate']) {
			return moment(establishment['liquorLicenseDate']).isAfter(moment(date)) &&
				moment(establishment['licenseadddttm']).isAfter(moment(date));
		}
		return false;
	}
	return establishments.filter(afterDateFilter);
}