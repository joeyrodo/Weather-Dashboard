var APIKey = "bf36d18de1238e6676858fb65f55c5a5";
var city;
var country;
let temp;
let geocodeName;
let lat;
let lon;
let forecastListIndex = 0;
// response variables
let cityName;
let date = [];
let icon = []
let temperature = [];
let windSpeed = [];
let humidity = [];
// html elements
let dailyForecast = document.getElementById("today-element");

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
            latLonSubmit();
        });

        function latLonSubmit() {
            var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
            fetch(forecastURL).then((response) => response.json()).then((forecast) => {
                cityName = forecast.city.name;
                forecastListIndex = 0;
                for (i = 0; i < 5; i++) {
                    date[i] = forecast.list[forecastListIndex].dt_txt.substring(0, 10);
                    icon[i] = "https://openweathermap.org/img/wn/" + forecast.list[forecastListIndex].weather[0].icon + "@2x.png";
                    temperature[i] = forecast.list[forecastListIndex].main.temp;
                    windSpeed[i] = forecast.list[forecastListIndex].wind.speed;
                    humidity[i] = forecast.list[forecastListIndex].main.humidity;
                    testLog(i);
                    forecastListIndex = forecastListIndex + 8;
                }
                writeForecast();
            });
        }
        function writeForecast() {
            dailyForecast.children[0].innerHTML = cityName;
            dailyForecast.children[1].innerHTML = date[0];
            dailyForecast.children[2].innerHTML = icon[0];
            dailyForecast.children[3].innerHTML = temperature[0];
            dailyForecast.children[4].innerHTML = windSpeed[0];
            dailyForecast.children[5].innerHTML = humidity[0];

            for (i = 0; i < 5; i++) {
                day = document.getElementById(i);
                day.children[0].innerHTML = date[i];
                day.children[1].innerHTML = icon[i];
                day.children[2].innerHTML = temperature[i];
                day.children[3].innerHTML = windSpeed[i];
                day.children[4].innerHTML = humidity[i];
            }

        }
        function testLog() {
            console.log("forecast: \n\ " + cityName + " \n\ " + date[i] + " \n\ " + temperature[i] + " \n\ " + windSpeed[i] + " \n\ " + humidity[i] + " \n\ " + forecastListIndex);
        }

        function geocodeTest() {
            console.log("geocode test successful!");
            console.log(geocodeName, lat, lon);
        }
        console.log("hi");
    }
}