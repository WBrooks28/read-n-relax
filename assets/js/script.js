var submit = $('cityInput');
//Code for map apperance
let map = L.map('map', {
    layers: MQ.mapLayer(),
    center: [39.830864, -98.580866],
    zoom: 4
});