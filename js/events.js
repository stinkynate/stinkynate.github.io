Papa.parse("https://stinkynate.github.io/events.csv", {
	worker: true,
	//header: true,
	download: true,
	complete: function(results) {
		console.log(results);
		
		//d3.select("tbody").html("")
		//d3.selectAll("p").classed('noresults', true).html("")
		//d3.event.preventDefault();
		
		for (var i = 3; i < results.data.length; i++) {
		   //console.log(results.data[5][3]);
		  // console.log(output[i]['avg_vote'])
		  // d3.select("tbody>tr>td").text(output[i]['original_title']);
		  d3.select("tbody").insert("tr").html(
		  "<td>"+(i-2)+"</td>"+
		  "<td>"+results.data[i][1]+"</td>"+ // Tag
		  "<td>"+results.data[i][2]+ "</td>"+ // Event
		  "<td><img class='pokemon' src='https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/"+results.data[i][4].toLowerCase()+".png' inline=false/>"+results.data[i][4]+ "</td>"+ // Pokemon
		  "<td>"+results.data[i][5]+ "</td>"+ // Shiny
		  "<td><img class='ball' src='https://raw.githubusercontent.com/msikma/pokesprite/master/icons/ball/cherish.png'/>"+results.data[i][6]+"</td>"+ // Ball
		  "<td>"+results.data[i][7]+ "</td>"+ // Level
		  "<td>"+results.data[i][8]+ "</td>"+ // Gender
		  "<td>"+results.data[i][23]+ "</td>"); // OT
		}
	}
});