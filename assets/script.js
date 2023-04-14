var APIKey = "bf36d18de1238e6676858fb65f55c5a5";
var city;
var country;
let temp;
let geocodeName;
let lat;
let lon;

document.getElementById("submit").addEventListener("click", submitted);
function submitted() {
    userInput = document.getElementById("text-box").value;
    city = userInput;
    if (userInput != "") {
    console.log("input detected!");
    console.log(city);
    var geocodeURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=" + 1 + "&appid=" + APIKey;
    fetch(geocodeURL).then((response) => response.json()).then((geocode) => {
        geocodeName = geocode[0].name;
        lat = geocode[0].lat;
        lon = geocode[0].lon;
        geocodeTest();
    });
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    fetch(queryURL).then((response) => response.json()).then((forecast) => {
        temp = Math.round((forecast.main.temp - 273.15) * 1.8 + 32);
        testLog();
    });

    function testLog() {
        console.log(temp);
    
    }

    function geocodeTest() {
        console.log("geocode test successful!");
        console.log(geocodeName, lat, lon);
    }
    console.log("hi");
    }
}