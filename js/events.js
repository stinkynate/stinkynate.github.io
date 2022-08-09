var ballMap = new Map();
Papa.parse("https://stinkynate.github.io/balls.csv"+"?_="+ (new Date).getTime(), {
	header: true,
	download: true,
	complete: function(results) {
		
		for (var i = 0; i < results.data.length; i++)
		{
			ballMap.set(results.data[i]['name'], results.data[i]['imageloc']);
		}
		parseEvents();
	}
});

function parseEvents()
{
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
			  if (row.length <= 1 || row[4] == "" || row[38] == "TRUE")
				  continue;

			  var rowHtml = "<td>"+(i-2)+"</td>";
			  rowHtml += addTag(row);
			  rowHtml += addEvent(row);
			  rowHtml += addPokemon(row,i);
			  rowHtml += addShiny(row);
			  rowHtml += addBall(row);
			  rowHtml += addLevel(row);
			  rowHtml += addGender(row);
			  rowHtml += addOT(row);
			  rowHtml += addTID(row);
			  rowHtml += addHistory(row);
			  d3.select("tbody").insert("tr").html(rowHtml);
			}
		}
	});
}

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
	var shinyLink = row[6] == "" ? "normal" : "shiny";
	var pokemon = row[4].toLowerCase();
	if (row[5] <> "")
		pokemon = row[5].toLowerCase();
	return "<td><div><img class='pokemon' data-pokemon='"+pokemon+"' data-shiny='"+row[6]+"' src='https://projectpokemon.org/images/sprites-models/swsh-"+shinyLink+"-sprites/"+pokemon+".gif' onload='checkImageSize(this)' onerror='loadGen7Animated(this)' height='40'/></div>"+row[4]+ "</td>";
}
function addShiny(row)
{
	return "<td>"+row[6]+ "</td>";
}
function addBall(row)
{
	var ball = row[7] == "" ? "" : ballMap.get(row[6]);
	if (ball == undefined)
		console.log(row[7]);
	return "<td><img class='ball' src='"+ball+"' alt='"+row[6]+"' title='"+row[6]+"'/></td>";
}
function addLevel(row)
{
	return "<td>"+row[8]+ "</td>";
}
function addGender(row)
{
	return "<td>"+row[9]+ "</td>";
}
function addOT(row)
{
	return "<td>"+row[24]+ "</td>";
}
function addTID(row)
{
	return "<td>"+row[25]+ "</td>";
}
function addHistory(row)
{
	return "<td>"+row[30]+ "</td>";
}

function checkImageSize(img)
{
	if(img.naturalHeight == 66 && img.naturalWidth == 78)
	{
		loadGen7Animated(img);
	}
}

function loadGen7Animated(img)
{
	var pokemon = img.dataset.pokemon;
	var isShiny = img.dataset.shiny;
	var shinyLink = isShiny == "" ? "normal" : "shiny";
	img.onerror = function() {loadMsikma(img)};
	img.src = "https://projectpokemon.org/images/"+shinyLink+"-sprite/"+ pokemon + ".gif";
}

function loadMsikma(img)
{
	img.onerror = null;
	var pokemon = img.dataset.pokemon;
	var isShiny = img.dataset.shiny;
	var shinyLink = isShiny == "" ? "regular" : "shiny";
	
	img.classList.add("msikma");
	img.parentElement.classList.add("msikma");
	img.src = "https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/"+shinyLink+"/"+pokemon+".png"
}

