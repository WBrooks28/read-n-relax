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
    // Create the map.
    const richmond = { lat: 37.4316, lng: -78.6569};
    const map = new google.maps.Map(document.getElementById("map"), {
      center: richmond,
      zoom: 7,
      mapId: "8d193001f940fde3",
    });
    // Create the places service.
    const service = new google.maps.places.PlacesService(map);
    let getNextPage;
    const moreButton = document.getElementById("more");
  
    moreButton.onclick = function () {
      moreButton.disabled = true;
      if (getNextPage) {
        getNextPage();
      }
    };
  
    // Perform a nearby search.
    service.textSearch(
      { location: richmond, radius: 500, query: checkboxValue},
      (results, status, pagination) => {
        if (status !== "OK" || !results) return;
        console.log(results);
        addPlaces(results, map);
        moreButton.disabled = !pagination || !pagination.hasNextPage;
        if (pagination && pagination.hasNextPage) {
          getNextPage = () => {
            // Note: nextPage will call the same handler function as the initial call
            pagination.nextPage();
          };
        }
      }
    );
  }

  const placesList = document.getElementById("places");
  var divClone = $("#places").clone();

  function addPlaces(places, map) {
  
    for (const place of places) {
      if (place.geometry && place.geometry.location) {
        const image = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };
  
        new google.maps.Marker({
          map,
          icon: image,
          title: place.name,
          position: place.geometry.location,
        });
  
        const li = document.createElement("li");
  
        li.textContent = place.name;
        placesList.appendChild(li);
        li.addEventListener("click", () => {
          map.setCenter(place.geometry.location);
        });
      }
    }
  }

$(document).ready(function() {
    $('#libraries').change(function () {
        if ($("#libraries").is(':checked')) {
            checkboxValue = $("#libraries").val();
            initMap(); 
        } else {
         $("#places").replaceWith(divClone);
        }
     });
     $('#coffee').change(function () {
        if ($("#coffee").is(':checked')) {
            checkboxValue = $("#coffee").val();
            initMap(); 
        } else {
         $("#places").replaceWith(divClone);
        }
     });
     $('#bookstores').change(function () {
        if ($("#bookstores").is(':checked')) {
            checkboxValue = $("#bookstores").val();
            initMap(); 
        } else {
         $("#places").replaceWith(divClone);
        }
     });
     $('#parks').change(function () {
        if ($("#parks").is(':checked')) {
            checkboxValue = $("#parks").val();
            initMap(); 
        } else {
         $("#places").replaceWith(divClone);
        }
     });
});
