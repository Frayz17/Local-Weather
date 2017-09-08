var temperature = getElementById('#temperature');
var location = getLocation();

var latitude = location.coords.latitude;
var longitude = location.coords.longitude;

temperatur.innerHTML = "latitude: " + latitude + ", longitude: " + longitude;

// var weatherData = getJSON();







function getLocation() {
	var location;

	if (navigator.geolocation) {
		location = navigator.geolocation.getCurrentPosition;
	} else {
		location = "<p>Geolocation is not supported by this browser.<p>"
	}

	return location;
}