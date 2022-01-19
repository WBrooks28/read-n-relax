// Global variable
const key = "AIzaSyBQyjNgRCUdgkuyAXYjvyBKMU3A2FKabeo";
const quote = document.querySelector("#quotes");
const author = document.querySelector("#author");
let addressSearchEl = document.getElementById("location-search");
let locationInputEl = document.getElementById("location-input");
let latitude = 37.5407246;
let longitude = -77.4360481;
let map;


// resets checkbox value
let checkboxValue = "";

// function that generates quote at bottom of screen
function getQuote() {

	fetch("https://api.quotable.io/random")
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			quote.innerHTML = `"${data.content}"`;
			author.innerHTML = data.author;
		});
}

getQuote();

//check and uncheck all checkboxes when all is changed
$("#all").change(function () {
	if (!$("input:checkbox").is("checked")) {
		$("input:checkbox").prop("checked", this.checked);
		console.log("all checked");
	} else {
		$("input:checkbox").prop("checked", false);
	}
});

// uncheck all if one of the boxes is unchecked
$(".check-single").change(function () {
	$(".check-single").click(function () {
		if ($(this).is(":checked")) {
			var isAllChecked = 0;

			$(".check-single").each(function () {
				if (!this.checked) isAllChecked = 1;
			});

			if (isAllChecked == 0) {
				$("all").prop("checked", true);
			}
		} else {
			$("#all").prop("checked", false);
		}
	});
});

let locationForm = document.getElementById("location-search");

addressSearchEl.addEventListener("submit", geocode);

function geocode(e) {
	// prevent actual submit
	e.preventDefault();

	let location = locationInputEl.value;
	axios
		.get("https://maps.googleapis.com/maps/api/geocode/json", {
			params: {
				address: location,
				key: key,
			},
		})
		.then(function (response) {
			// Log full response
			console.log(response);

			let latitude = response.data.results[0].geometry.location.lat;
			let longitude = response.data.results[0].geometry.location.lng;

			map.panTo({ lat: latitude, lng: longitude });
		})

		.catch(function (error) {
			console.log(error);
		});

}


function initMap() {
	// Create the map.
	const richmond = { lat: latitude, lng: longitude };
	map = new google.maps.Map(document.getElementById("map"), {
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
		{ location: richmond, radius: 5, query: checkboxValue },
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

$(document).ready(function () {
	initMap();
	$("#libraries").change(function () {
		if ($("#libraries").is(":checked")) {
			checkboxValue = $("#libraries").val();
			initMap();
		} else {
			$("#places").replaceWith(divClone);
		}
	});
	$("#coffee").change(function () {
		if ($("#coffee").is(":checked")) {
			checkboxValue = $("#coffee").val();
			initMap();
		} else {
			$("#places").replaceWith(divClone);
		}
	});
	$("#bookstores").change(function () {
		if ($("#bookstores").is(":checked")) {
			checkboxValue = $("#bookstores").val();
			initMap();
		} else {
			$("#places").replaceWith(divClone);
		}
	});
	$("#parks").change(function () {
		if ($("#parks").is(":checked")) {
			checkboxValue = $("#parks").val();
			initMap();
		} else {
			$("#places").replaceWith(divClone);
		}
	});
});

initMap();
