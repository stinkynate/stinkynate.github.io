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
			  rowHtml += addBall(row, i==3);
			  rowHtml += addLevel(row);
			  rowHtml += addGender(row);
			  rowHtml += addAbility(row);
			  rowHtml += addNature(row);
			  rowHtml += addOT(row);
			  rowHtml += addTID(row);
			  rowHtml += addDate(row);
			  rowHtml += addNotes(row);
			  rowHtml += addProofType(row);
			  rowHtml += addProofName(row);
			  rowHtml += addLocation(row);
			  rowHtml += addHistory(row);
			  var tr = d3.select("tbody").insert("tr").html(rowHtml);
			  if (row[36]=="TRUE")
				tr.classed("personal", true);
			  else if (row[37]=="TRUE") // Keep these mutually exclusive
				tr.classed("traded", true);  
			  else if (row[39]=="TRUE") // No need to mark as a multiple if it's traded or personal
				tr.classed("multiple", true);
			}
			
			filterTable();
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
	if (row[5] != "")
		pokemon = row[5].toLowerCase();
	
	var address = "https://projectpokemon.org/images/sprites-models/swsh-"+shinyLink+"-sprites/"+pokemon+".gif";
	var onError = "loadGen7Animated(this)";
	if (row[5].startsWith("http"))
	{
		address = row[5];
		onError = "";
	}
	
	return "<td><div><img class='pokemon' data-pokemon='"+pokemon+"' data-shiny='"+row[6]+"' src='"+address+"' onload='checkImageSize(this)' onerror='"+onError+"' height='40'/></div>"+row[4]+ "</td>";
}
function addShiny(row)
{
	return "<td>"+row[6]+ "</td>";
}
function addBall(row, first)
{
	var ball = row[7] == "" ? "" : ballMap.get(row[7]);
	if (ball == undefined)
		console.log(row[7]);
	// Reflow after first ball loads to make sure columns line up with header
	var floatHeader = first ? " onLoad='floatHeader()' " : "";
	return "<td><img class='ball' src='"+ball+"' alt='"+row[7]+"' title='"+row[7]+"'"+floatHeader+"/></td>";
}
function addLevel(row)
{
	return "<td>"+row[8]+ "</td>";
}
function addGender(row)
{
	return "<td>"+row[9]+ "</td>";
}
function addAbility(row)
{
	return "<td>"+row[10]+ "</td>";
}
function addNature(row)
{
	return "<td>"+row[11]+ "</td>";
}
function addOT(row)
{
	return "<td>"+row[24]+ "</td>";
}
function addTID(row)
{
	return "<td>"+row[25]+ "</td>";
}
function addDate(row)
{
	return "<td>"+row[26]+ "</td>";
}
function addNotes(row)
{
	return "<td>"+row[31]+ "</td>";
}
function addProofType(row)
{
	return "<td>"+row[27]+ "</td>";
}
function addProofName(row)
{
	return "<td>"+row[28]+ "</td>";
}
function addLocation(row)
{
	return "<td>"+row[32]+ "</td>";
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

function floatHeader()
{
	var $table = $('table');
	$table.floatThead();
}

function reflow()
{
	var $table = $('table');
	$table.floatThead('reflow');
}

function filterTable() {
  // Declare variables
  var traded, personal, multiples, showTraded, showPersonal, showMultiples, filter, filterText;
  traded = document.getElementById("showTraded");
  showTraded = traded.checked;
  personal = document.getElementById("showPersonal");
  showPersonal = personal.checked;
  multiples = document.getElementById("showMultiples");
  showMultiples = multiples.checked;
  filter = document.getElementById("filter");
  filterText = filter.value;
  
  var showSelector = "#eventTable tbody tr"
  $(showSelector).hide();
  
  if (!showTraded||!showPersonal||!showMultiples)
  {
	  showSelector += ":not("
	  if (!showTraded)
	  {
		  showSelector += ".traded";
	  }
	  if (!showPersonal)
	  {
		  if (!showTraded)
			  showSelector += ",";
		  showSelector += ".personal";
	  }
	  if (!showMultiples)
	  {
		  if (!showTraded||!showPersonal)
			  showSelector += ",";
		  showSelector += ".multiple";
	  }
	  showSelector += ")";
  }
  showSelector += " td"
  $(showSelector).filter(function () {
        var $t = $(this);
		if ($t.text().toLowerCase().indexOf(filterText) > -1) {
			return true;
		}
        return false;
    }).parent().show();
  
  $("table tbody tr").removeClass("odd even");
  $("table tbody tr:visible:odd").addClass("odd");
  $("table tbody tr:visible:even").addClass("even");
  
  reflow();
}