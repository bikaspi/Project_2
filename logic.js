// Store our API endpoint inside queryUrl
var queryUrl = "usa_airports.geojson";


// var myMap = L.map("Usamap", {
//     center: [37.09, -95.71],
//     zoom: 5
//   });
  
//   // Add a tile layer
//   L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.streets",
//     accessToken: "pk.eyJ1IjoicmVuZWVlc2h1biIsImEiOiJjamlkdm53cWswNnZzM3BwbjV4b2VmajI3In0._PhSTsvzSD5NHNeWnRs_UQ"
//   }).addTo(myMap);

// Perform a GET request to the query URL
d3.json(queryUrl, function(airports) {
  console.log(airports)

  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(airports);
});

function createFeatures(usa_airports) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup('<h3 class="airport">' + feature.properties.ita +
      "</h3><hr><p>" + feature.properties.name + "</p>");
  }

//Create a GeoJSON layer containing the features array on the earthquakeData object
  //Run the onEachFeature function once for each piece of data in the array
  var airports = L.geoJSON(usa_airports, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
      var color;
      var r = 255;
      var g = 0;
      var b = 0;
      color= "rgb("+r+" ,"+g+","+ b+")"

      
      var geojsonMarkerOptions = {
        radius: 5,
        fillColor: color,
        color: "black",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      };
      return L.circleMarker(latlng, geojsonMarkerOptions);
    }
  });


  // Sending our earthquakes layer to the createMap function
 createMap(airports);
}

function createMap(airports) {

//   // Define streetmap and darkmap layers
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoiYnVtYmFsb3JkIiwiYSI6ImNqaWNhZ2d1bjAxOHoza3BqcDQzMHR3Z3AifQ.KzBDaZozIdwa38NsQZslfw");

   var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?" +
     "access_token=pk.eyJ1IjoiYnVtYmFsb3JkIiwiYSI6ImNqaWNhZ2d1bjAxOHoza3BqcDQzMHR3Z3AifQ.KzBDaZozIdwa38NsQZslfw");

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    airports: airports
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("Usamap", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, airports]
  });

//   // Create a layer control
//   // Pass in our baseMaps and overlayMaps
//   // Add the layer control to the map
//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(myMap);

//   function getColor(d) {
//     return d < 1 ? 'rgb(255,255,255)' :
//           d < 2  ? 'rgb(255,200,200)' :
//           d < 3  ? 'rgb(255,145,145)' :
//           d < 4  ? 'rgb(255,90,90)' :
//           d < 5  ? 'rgb(255,35,35)' :
//                    'rgb(255,0,0)';
//   }
  
//   // Create a legend to display information about our map
//   var legend = L.control({position: 'bottomright'});
  
//   legend.onAdd = function (map) {
  
//     var div = L.DomUtil.create('div', 'info legend'),
//     grades = [0, 1, 2, 3, 4],
//     labels = [];
  
//     div.innerHTML+='Magnitude<br><hr>'
  
//     // loop through our density intervals and generate a label with a colored square for each interval
//     for (var i = 0; i < grades.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + getColor(grades[i] + 1) + '">&nbsp&nbsp&nbsp&nbsp</i> ' +
//             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
//   }
  
//   return div;
//   };
  
//   legend.addTo(myMap);
  
   
}


