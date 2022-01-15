// var submit = $('cityInput');
// Code for map apperance
// let map = L.map('map', {
//     layers: MQ.mapLayer(),
//     center: [39.830864, -98.580866],
//     zoom: 4
// });

const quote = document.querySelector ("#quotes");
const author = document.querySelector("#author");
const btn  = document.querySelector("#btn");

btn.addEventListener("click", getQuote);

function getQuote(){
    console.log("Button clicked");
    
    fetch("http://api.quotable.io/random")
    .then(res => res.json())
    .then(data => {
        console.log(data)
       quote.innerHTML = `"${data.content}"`;
        author.innerHTML = data.author;
    })


    
}



