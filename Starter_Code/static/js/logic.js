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
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

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
    if(depth <= 10) return 'pink'
    else if(depth > 10 && depth <= 30) return 'red'
    else if(depth > 30 && depth <= 50) return 'purple'
    else if(depth > 50 && depth <= 90) return 'blue'
    else if(depth > 90) return 'green'
    else return 'black'
    
}


//read in data
d3.json(link).then(function(data) {
    

    //use the geoJson function to draw map
    L.geoJson(data, {

        // Passing in mapStyle for our styling
        style: function(feature) {

            //style each feature based on conditionals above
            return {
                color: 'red',
                fillColor: chooseColor(feature.geometry.coordinates[2]),
                fillOpacity: 0.4,
                weight: 1.2
            },

            L.circleMarker([features.geometry.coordinates[0],coordinates[1]],{
                radius: size,
                color: chooseColor,
                fillOpacity: 0.4
            }).addTo(map);
        
        },
    

    }).addTo(map);

    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {
    
        var div = L.DomUtil.create('div', 'info legend'),
        label = [-10-10, 10-30, 30-50, 50-70, 70-90, +90],
        labelColor= [chooseColor];
    
        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < geometry.coordinates; i++) {
            div.innerHTML +=
            labels.push(
                '<i class="circle":' + chooseColor(depth + 1) + '"></i> ' +
                coordinates[0] ? coordinates[1] : '+');
    }
        div.innerHTML = labels.join('<br>')
    return div;
    };
    legend.addTo(map);


})





 
  


    



