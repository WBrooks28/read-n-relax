const key = "AIzaSyBQyjNgRCUdgkuyAXYjvyBKMU3A2FKabeo";

const quote = document.querySelector ("#quotes");
const author = document.querySelector("#author");

let checkboxValue = "";

function getQuote(){
    console.log("Button clicked");

    fetch("https://api.quotable.io/random")
    .then(res => res.json())
    .then(data => {
        console.log(data)
       quote.innerHTML = `"${data.content}"`;
        author.innerHTML = data.author;
    })};

getQuote();  

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 34.397, lng: 150.644 },
        scrollwheel: false,
        zoom: 4
    });
}

function getCity() {
    fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${checkboxValue}+richmond+virginia&key=${key}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
}

function getAll() {
    fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=libaries+richmond+virginia&key=${key}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
    fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=bookstores+richmond+virginia&key=${key}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
    fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=parks+richmond+virginia&key=${key}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
    fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=coffee+richmond+virginia&key=${key}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
}

$(document).ready(function() {
    $('#all').change(function () {
        checkboxValue = $('#all').val(); 
        console.log(checkboxValue);
        getAll();
     });
     $('#libraries').change(function () {
        checkboxValue = $('#libraries').val(); 
        console.log(checkboxValue);
        getCity();
     });
     $('#bookstores').change(function () {
        checkboxValue = $('#bookstores').val(); 
        console.log(checkboxValue);
        getCity();
     });
     $('#coffee').change(function () {
        checkboxValue = $('#coffee').val(); 
        console.log(checkboxValue);
        getCity();
     });
     $('#parks').change(function () {
        checkboxValue = $('#parks').val(); 
        console.log(checkboxValue);
        getCity();
     });
});
