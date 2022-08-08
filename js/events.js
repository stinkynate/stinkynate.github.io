Papa.parse("https://stinkynate.github.io/events.csv"+"?_="+ (new Date).getTime(), {
	worker: true,
	//header: true,
	download: true,
	complete: function(results) {
		console.log(results);
		
		//d3.select("tbody").html("")
		//d3.selectAll("p").classed('noresults', true).html("")
		//d3.event.preventDefault();
		
		for (var i = 3; i < results.data.length; i++) {
		  var row = results.data[i];
		  if (row.length <= 1)
			  continue;

		  var rowHtml = "<td>"+(i-2)+"</td>";
		  rowHtml += addTag(row);
		  rowHtml += addEvent(row);
		  rowHtml += addPokemon(row,i);
		  rowHtml += addShiny(row);
		  rowHtml += addLevel(row);
		  rowHtml += addGender(row);
		  rowHtml += addOT(row);
		  d3.select("tbody").insert("tr").html(rowHtml);
		}
	}
});

function addTag(row)
{
	return "<td>"+row[1]+"</td>";
}
function addEvent(row)
{
	return "<td><a href='"+row[3]+"' target='_blank'>"+row[2]+ "</a></td>"
}
function addPokemon(row, i)
{
	var shinyLink = row[5] == "" ? "normal" : "shiny";
	return "<td><img class='pokemon' src='https://projectpokemon.org/images/sprites-models/swsh-"+shinyLink+"-sprites/"+row[4].toLowerCase()+".gif'/>"+row[4]+ "</td>";
	//https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/
	//https://projectpokemon.org/images/sprites-models/swsh-normal-sprites/grookey.gif
}
function addShiny(row)
{
	return "<td>"+row[5]+ "</td>";
}
function addBall(row)
{
	return "<td><img class='ball' src='https://raw.githubusercontent.com/msikma/pokesprite/master/icons/ball/cherish.png'/>"+results.data[i][6]+"</td>";
}
function addLevel(row)
{
	return "<td>"+row[7]+ "</td>";
}
function addGender(row)
{
	return "<td>"+row[8]+ "</td>";
}
function addOT(row)
{
	return "<td>"+row[23]+ "</td>";
}