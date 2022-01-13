var submit = $('cityInput');
//Code for map apperance
let map = L.map('map', {
    layers: MQ.mapLayer(),
    center: [41.850033, -87.6500523],
    zoom: 4
});
