// Food Establishment Licenses
var felBaseUri = 'https://data.cityofboston.gov/resource/fdxy-gydq.json';

function getEstablishments(params, callback) {
	performRequest(felBaseUri, params, callback);
}

// Liquor Licenses
var llBaseUri = 'https://data.cityofboston.gov/resource/g9d9-7sj6.json';

function getLiquorLicenses(params, callback) {
	performRequest(llBaseUri, params, callback);
}

// Requests
var appToken = 'Jjye7GDmaT7nemBtSZu8OsD3h';

function performRequest(baseUrl, parameters, callback) {
	var req = new XMLHttpRequest();

	$.get(
		baseUrl,
		parameters,
		function(data) {
			callback(data);
		});
}