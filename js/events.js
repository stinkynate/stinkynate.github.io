Papa.parse("https://stinkynate.github.io/events.csv", {
	worker: true,
	header: true,
	download: true,
	complete: function(results) {
		console.log(results);
		
		//d3.select("tbody").html("")
		//d3.selectAll("p").classed('noresults', true).html("")
		//d3.event.preventDefault();
		
		for (var i = 0; i < results.data.length; i++) {
		   //console.log(results.data[5][3]);
		  // console.log(output[i]['avg_vote'])
		  // d3.select("tbody>tr>td").text(output[i]['original_title']);
		  d3.select("tbody").insert("tr").html("<td>"+[i+1]+"</td>"+"<td>"+"<a href=https://www.imdb.com/title/"+results.data[i]["imdb_title_id"]+" target='_blank'>"+(results.data[i]["original_title"])+"</a>"
		  + "</td>");
		}
	}
});