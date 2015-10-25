$(function() {
	var establishmentParams = {};
	var liquorParams = {};
	
	var establishmentsData = [];
	var liquorLicensesData = [];

	getEstablishments(establishmentsData, function(establishmentData) {
		establishmentsData = establishmentData;
		
		buildBootstrapTable(establishmentData);

		getLiquorLicenses(liquorParams, function(liquorData) {
			liquorLicensesData = liquorData;
		});
	});
});

function onClickRow(row, $element) {
	console.log(row, $element);
}

function buildBootstrapTable(data) {
	$('#establishments').bootstrapTable({
			data: data,                
			pagination: true,
			pageSize: 13,
			search: true,
			onClickRow: onClickRow,
			columns: [{
				field: 'address',
				title: 'Address',
				align: 'center',
				sortable: true
			},
			{
				field: 'businessname',
				title: 'Business Name',
				align: 'center',
				sortable: true
			},
			{
				field: 'zip',
				title: 'Zip',
				align: 'center',
				sortable: true
			},
			{
				title: 'Liquor License',
				align: 'center',
				sortable: true
			}]
		});
}