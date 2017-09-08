var temperature = document.getElementById('temperature');
var latitude;
var longitude;
var addressWeatherApi;
var weather;

if (!navigator.geolocation) {
	temperature.innerHTML = "<p>Geolocation is not supported by this browser.<p>";
}


navigator.geolocation.getCurrentPosition(success, error);


function success(position) {
	latitude = position.coords.latitude;
	longitude = position.coords.longitude;
	addressWeatherApi = "https://fcc-weather-api.glitch.me/api/current?lon=" +
												 + latitude + "&lat=" + longitude;


	var request = new XMLHttpRequest();
	request.open('GET', addressWeatherApi, true);

	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {
	    // Success!
	    weather = JSON.parse(request.responseText);
	  } else {
	    // We reached our target server, but it returned an error
	    console.log("We reached our target server, but it returned an error");
	  }
	};

	request.onerror = function() {
	  // There was a connection error of some sort
	  console.log("There was a connection error of some sort");
	};

	request.send();


	temperature.innerHTML = "latitude: " + latitude + ", longitude: " + longitude;

}


function error() {
    temperature.innerHTML = "Unable to retrieve your location";
}




