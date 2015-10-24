// Food Establishment Licenses
var felBaseUri = 'https://data.cityofboston.gov/resource/fdxy-gydq.json';

function getEstablishments(params, callback) {
	performRequest(felBaseUri, params, callback);
}

// Requests
var appToken = 'Jjye7GDmaT7nemBtSZu8OsD3h';

function performRequest(baseUrl, parameters, callback) {
	var req = new XMLHttpRequest();
	$.get(
		felBaseUri,
		parameters,
		function(data) {
			callback(data);
		});
}