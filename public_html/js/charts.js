$(document).ready(function(){
	
	// Set up AJAX
	$.ajax({

		type: 'get',
		datatype: "json",
		url: 'api/charts.php',
		success:function(dataFromServer){
			console.log(dataFromServer);
			// Load Visualization API
			google.charts.load("current", {packages:["corechart"]});
			// Set a callback to eun when Vis API is loaded
    		google.charts.setOnLoadCallback(drawChart);

    		function drawChart(){

    			var data = new google.visualization.DataTable();
    			data.addColumn('string', 'Tag');
    			data.addColumn('number', 'TagCount');

    			for(var i = 0; i < dataFromServer.length; i++){
    				// parseFloat changes from string to number
    				var value = parseFloat(dataFromServer[i].TagCount);
    				var name = dataFromServer[i].tag;
    				data.addRow([name, value]);

    			}

    			var options = {
    				title: 'Amount of movies tags'
    			};

    			var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    			chart.draw(data, options);

    		}




		},
		error:function(){
			console.log('Cannot connect to server..')
		}

	});


});