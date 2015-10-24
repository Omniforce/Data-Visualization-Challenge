$(function() {
	var params = {};
	var establishmentsData = [];

	getEstablishments(params, function(data) {
		establishmentsData = data;
		$('#establishments').bootstrapTable({
			data: data,                
			pagination: true,
			pageSize: 15,
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
			}]
		});
	});
});

function onClickRow(row, $element) {
	console.log(row, $element);
}