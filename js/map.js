// Function to draw your map
var drawMap = function() {
   var map = L.map('container').setView([39.10, -95.80], 4);
  // Create map and set view
 

  // Create a tile layer variable using the appropriate url
	var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');

  // Add the layer to your map
	layer.addTo(map);

  // Execute your function to get data
 getData(map);
}

var getData = function(map) {
var data;
$.ajax({
     url:'data/response.json',
     type: "get",
     success:function(data) {
       data = data
       customBuild(data, map);
     }, 
     dataType:"json"
}) 
}
// Loop through your data and add the appropriate layers and points
var customBuild = function(data, map) {
	// Be sure to add each layer to the map
	var singleLayer = {};
	for(i = 0; i< data.length; i++) {	
		if(data[i].Race == undefined){
				data[i].Race = "Unknown";
			}
		if(singleLayer[data[i].Race] == undefined){
			singleLayer[data[i].Race] = new L.LayerGroup([]);
			singleLayer[data[i].Race].addTo(map);
		}			
		
		if (data[i]["Hit or Killed?"] == "Hit") {
			var circle = L.circleMarker([data[i].lat, data[i].lng], {
			color: 'red',
			fillColor: '#f03',
			fillOpacity: 0.5,
			radius: 5
			}).addTo(singleLayer[data[i].Race]);
		}
		else {
			var circle = L.circleMarker([data[i].lat, data[i].lng],{
			color: 'orange',
			fillColor: '#ff4d00',
			fillOpacity: 0.2,
			radius:5
			}).addTo(singleLayer[data[i].Race]);
		}
		circle.bindPopup(data[i].Summary);
	}		
	// Once layers are on the map, add a leaflet controller that shows/hides layers

var control = L.control.layers(null,singleLayer).addTo(map);
 male(data);
 }
 var maleCount = 0;
 var white = 0;
 var nonWhite = 0;
 var women = 0;
 var male = function(data) {
	for(i = 0; i < data.length; i++) {
		if (data[i]["Victim's Gender"] == "Male") {
			maleCount++;
		}
		if (data[i]["Victim's Gender"] != "Male") {
			women++;
		}
		if (data[i].Race == "White") {
			white++;
		}
		if (data[i].Race == "White") {
			nonWhite++;
		}		
	}
 tableData(maleCount, white, nonWhite, women);
 }
 function tableData(maleCount, white, nonWhite, women) {
 if($("#myTable tbody").length==0) {
	$("#myTable").append("<tbody></tbody>");
 }
 $("#myTable tbody").append(
	"<tr>" + "<td>" + maleCount + "</td>" + "<td>" + women + "</td>" + "<td>" + white + "</td>" + "<td>" + nonWhite + "</td>" + "</tr>"
 );
 }
 