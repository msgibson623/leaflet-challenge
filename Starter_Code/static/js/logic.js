// Creating map object
var map = L.map('map',  {
    center: [39.82860130003183, -98.5794689733809],
    zoom: 5,
    layers: []
  });

// adding tile layer/map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Grabbing the Data
var link= "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

// Map Styling
var mapStyle = {
    color: 'red',
    fillColor: 'orange',
    fillOpacity: 0.4,
    weight: 1.2
}

//Create a function to pick color based on depth
function chooseColor(depth){

    // series of statements to test depth
    if(depth <= 10) return 'orange'
    else if(depth > 10 && depth <= 30) return "red"
    else if(depth > 30 && depth <= 50) return 'purple'
    else if(depth > 50 && depth <= 90) return 'blue'
    else if(depth > 90) return 'green'
    else return 'black'
    
}


//read in data
d3.json(link).then(function(data) {

    for (var i = 0; i < data.features.length; i++) {
    var earthquakes = data.features[i]
    var coordinates = earthquakes.geometry.coordinates
    var mag = earthquakes.properties.mag
    var time = earthquakes.properties.time
        let date = new Date(time);
        let humanReadableDate = date.toLocaleString();  
    var depth = earthquakes.geometry.coordinates[2]
    var size = mag * 5
    var markerColor = chooseColor(depth);


    var marker = L.circleMarker([coordinates[1],coordinates[0]], {
        radius: size,
        color: markerColor,
        fillOpacity: 0.5
    }).bindPopup(`<h3>${earthquakes.properties.title}</h3>
                <hr>
                <p><b>Location:</b> ${earthquakes.properties.place}</p> 
                <p><b>Time:</b> ${humanReadableDate}</p>
                <p><b>Depth:</b> ${depth}</p>
                <p><b>Magnitude:</b> ${mag}</p>
            
                
    `).addTo(map);
    
    }
      // Creating the legend
      var legend = L.control({position: 'bottomright'});
      legend.onAdd = function () {
          var div = L.DomUtil.create('div', 'info legend');
          var labels = [" -10-10 ", " 10-30", " 30-50 ", " 50-70 ", " 70-90 ", " 90+ "];
          var ranges = ["orange", "red", "purple", "blue", "green", "black"]
          var legendInfo = "";
          labels.forEach(function(label,i) {
              var color = ranges[i];
              legendInfo += `<div class='legend-color-box' style='background-color: ${color}'></div><span>${label}</span><br>`;
          });
          div.innerHTML = legendInfo;
          return div;
      };      

legend.addTo(map);

})





 
  


    



