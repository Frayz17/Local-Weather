var temperature = document.getElementById('temperature');
var sky = document.getElementById('sky');
var skyIcon = document.getElementById('sky-icon');
var degree = document.getElementById('degree');
var latitude;
var longitude;
var addressWeatherUrl;
var weatherData;
var celsiusDeg;
var fahrenheitDeg;

// --------------------- Retrieve weather --------------------
if (!navigator.geolocation) {
	temperature.innerHTML = "<p>Geolocation is not supported by this browser.<p>";
}

navigator.geolocation.getCurrentPosition(success, error);

function success(position) {
	latitude = position.coords.latitude;
	longitude = position.coords.longitude;
	addressWeatherUrl = "https://fcc-weather-api.glitch.me/api/current?lon=" +
												 + latitude + "&lat=" + longitude;

	// get JSON string from fcc weather api and parse it to object										 
	var request = new XMLHttpRequest();
	request.open('GET', addressWeatherUrl, true);

	request.onload = function() {		
	  if (request.status >= 200 && request.status < 400) {
	    // ---------------------- Success! --------------------	    
	    weatherData = JSON.parse(request.responseText);

	    // --------------------- Celsius to fahrenheit --------------------
			celsiusDeg = Math.round(weatherData.main.temp);
			fahrenheitDeg = Math.round(celsiusDeg * 1.8 + 32);

	    // write weather data into page
	    temperature.innerHTML = celsiusDeg;
	    skyIcon.src = weatherData.weather[0].icon;
	    sky.innerHTML = weatherData.weather[0].description;


	    // --------------------- Celsius to fahrenheit temperature--------------------
			degree.addEventListener("click", function(event) {
				// change celcius degree to fahrenheit degree
				temperature.innerHTML = fahrenheitDeg;
				degree.innerHTML = "F";
			});




	  } else {
	    // We reached our target server, but it returned an error
	    temperature.innerHTML = "We can't show the temperature now, api weather is shut down";
	  }
	};

	request.onerror = function() {
	  // There was a connection error of some sort
	  temperature.innerHTML = "There was a connection error of some sort";
	};

	request.send();
}

function error() {
    temperature.innerHTML = "Unable to retrieve your location";
}
// ----------------------------------------------------------------
