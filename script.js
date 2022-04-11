var key = '27b5e63c65752cfa7f1cc398fef6d406'; //API key
var currentDate = moment().format("dddd MMMM Do, YYYY");
var currentTime = moment().format("hh:mm a");

console.log(currentDate);
console.log(currentTime);

var date = document.getElementById("date");
var time = document.getElementById("time");
var day1 = document.getElementById("day1");
var day2 = document.getElementById("day2");
var day3 = document.getElementById("day3");
var day4 = document.getElementById("day4");
var day5 = document.getElementById("day5");

//displaying the current date and time
date.innerText = currentDate;
time.innerText = currentTime;

//this array is pre-filled in cities that will be replaced with user search history.
var cities = ['Knoxville', 'Pigeon Forge', 'Atlanta', 'Milledgeville', 'Dublin'];
console.log(cities);

//setting up variables
var searchbtn = document.getElementById("searchbtn");
var searchbar = document.getElementById("searchbar");
var city1 = document.getElementById("city1");
var city2 = document.getElementById("city2");
var city3 = document.getElementById("city3");
var city4 = document.getElementById("city4");
var city5 = document.getElementById("city5");

var citytitle = document.getElementById("citytitle");
var currenttemp = document.getElementById("currenttemp");
var currentwind = document.getElementById("currentwind");
var currenthumidity = document.getElementById("currenthumidity");
var currentuv = document.getElementById("currentuv");
var hltemp = document.getElementById("hltemp");
var hlwind = document.getElementById("hlwind");
var hluv = document.getElementById("hluv");
var currentweather = document.getElementById("weather");
var currentImg = document.getElementById("currentImg");

var forecastContainer = document.getElementById("forecastContainer");
var temp1 = document.getElementById("temp1");
var temp2 = document.getElementById("temp2");
var temp3 = document.getElementById("temp3");
var temp4 = document.getElementById("temp4");
var temp5 = document.getElementById("temp5");
var forecastImg0 = document.getElementById("forecast0");
var forecastImg1 = document.getElementById("forecast1");
var forecastImg2 = document.getElementById("forecast2");
var forecastImg3 = document.getElementById("forecast3");
var forecastImg4 = document.getElementById("forecast4");


searchbtn.onclick = citysearch;

function citysearch(){
    console.log(searchbar.value);
    var cityinput = searchbar.value;
    cities.unshift(cityinput); //adding search into front of array
    cities.splice(5);   //keeping array/history kept at a length of 5
    console.log(cities);

    localStorage.setItem("cities", JSON.stringify(cities));
    console.log(JSON.stringify(cities));

    //setting searches into history city buttons in subheader
    city1.innerText = cities[0];
    city2.innerText = cities[1];
    city3.innerText = cities[2];
    city4.innerText = cities[3];
    city5.innerText = cities[4];
    
    weathersearch();
}

//latitude and longitude of the city called, will be used in another api data fetch
var lat = '';
var lon = '';

function weathersearch() {
  var weatherapi = 'https://api.openweathermap.org/data/2.5/weather?q=' + cities[0] + '&units=imperial&appid=' + key;
  citytitle.innerText = cities[0];

  // making a fetch from open call api to get city weather data
  fetch(weatherapi)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data)

    //display current temp and high/low for day
    console.log(data.main.temp);
    currenttemp.innerText = data.main.temp + '°';
    hltemp.innerText = 'H/L:  ' + Math.round(data.main.temp_max) + '° / ' + Math.round(data.main.temp_min) + '°';

    //display current humidity
    currenthumidity.innerText = data.main.humidity;

    //display current wind and degree it is blowing
    console.log(data.wind);
    currentwind.innerText = data.wind.speed + ' mph';
    hlwind.innerText = data.wind.deg + ' deg';

    //get latitude and longitude of city to use for another fetch from open call
    lat = data.coord.lat;
    lon = data.coord.lon;
    console.log(lat);
    console.log(lon);

    forecast();
  });
    
}


function forecast(){
  var forecastapi = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + key;
  
  //to clear the current 5-day forecast
  forecastContainer.replaceChildren();

  //this fetch from open call api gathers a few more details than the city call and gives the future forecast
  fetch(forecastapi)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data)

    //display UV
    console.log(data.current.uvi);
    currentuv.innerText = data.current.uvi;

    //make range for UV index low to extreme and give a new class to change text color based on range.
    if (data.current.uvi < 2.999){
      hluv.innerText = 'Low';
      hluv.setAttribute('class', 'low');
      currentuv.setAttribute('class', 'low');
    }
    else if (data.current.uvi < 5.999) {
      hluv.innerText = 'Moderate';
      hluv.setAttribute('class', 'moderate');
      currentuv.setAttribute('class', 'moderate');
    }
    else if (data.current.uvi < 7.999) {
      hluv.innerText = 'High';
      hluv.setAttribute('class', 'high');
      currentuv.setAttribute('class', 'high');
    }
    else if (data.current.uvi < 10.999) {
      hluv.innerText = 'Very High';
      hluv.setAttribute('class', 'veryhigh');
      currentuv.setAttribute('class', 'veryhigh');
    }
    else if (data.current.uvi > 11) {
      hluv.innerText = 'Extreme';
      hluv.setAttribute('class', 'extreme');
      currentuv.setAttribute('class', 'extreme');
    }

    //displaying the curennt weather description
    currentweather.innerText = data.current.weather[0].description;

    //setting the current weather image
    if (data.current.weather[0].id < 300){
      currentImg.setAttribute("style", "background-image: url('./assets/thunderstorm.jpg');");
    }
    else if (data.current.weather[0].id < 500){
      currentImg.setAttribute("style", "background-image: url('./assets/drizzle.jpg');");
    }
    else if (data.current.weather[0].id < 502){
      currentImg.setAttribute("style", "background-image: url('./assets/light rain.jpg');");
    }
    else if (data.current.weather[0].id < 600){
      currentImg.setAttribute("style", "background-image: url('./assets/heavy rain.jpg');");
    }
    else if (data.current.weather[0].id < 700){
      currentImg.setAttribute("style", "background-image: url('./assets/snow.jpg');");
    }
    else if (data.current.weather[0].id < 800){
      currentImg.setAttribute("style", "background-image: url('./assets/fog.jpg');");
    }
    else if (data.current.weather[0].id == 800){
      currentImg.setAttribute("style", "background-image: url('./assets/clear.jpg');");
    }
    else if (data.current.weather[0].id < 803){
      currentImg.setAttribute("style", "background-image: url('./assets/light clouds.jpg');");
    }
    else {
      currentImg.setAttribute("style", "background-image: url('./assets/heavy clouds.jpg');");
    }

    //creating 5 day forecast
    for (let i=0; i < 5; i++){
      //creating the containers for each day
      var forecastdiv = document.createElement('div');
      forecastdiv.setAttribute('class', "forecast");

      //creating element for forecast temperature
      var forecastTemp = document.createElement('p');
      forecastTemp.innerText = Math.round(data.daily[i].temp.day) + '°';

      //creating element for forecast date
      var forecastDay = document.createElement('p');
      forecastDay.innerText = moment().add(i+1, 'day').format('MM/DD');

      // setting background image to match the forecasted weather
      var x = data.daily[i].weather[0].id;
      if (x < 300){
        forecastdiv.setAttribute("style", "background-image: url('./assets/thunderstorm.jpg');");
      }
      else if (x < 500){
        forecastdiv.setAttribute("style", "background-image: url('./assets/drizzle.jpg');");
      }
      else if (x < 502){
        forecastdiv.setAttribute("style", "background-image: url('./assets/light rain.jpg');");
      }
      else if (x < 600){
        forecastdiv.setAttribute("style", "background-image: url('./assets/heavy rain.jpg');");
      }
      else if (x < 700){
        forecastdiv.setAttribute("style", "background-image: url('./assets/snow.jpg');");
      }
      else if (x < 800){
        forecastdiv.setAttribute("style", "background-image: url('./assets/fog.jpg');");
      }
      else if (x == 800){
        forecastdiv.setAttribute("style", "background-image: url('./assets/clear.jpg');");
      }
      else if (x < 803){
        forecastdiv.setAttribute("style", "background-image: url('./assets/light clouds.jpg');");
      }
      else {
        forecastdiv.setAttribute("style", "background-image: url('./assets/heavy clouds.jpg');");
      }

      //appending the containers to the correct section of the page
      forecastContainer.appendChild(forecastdiv);
      forecastdiv.appendChild(forecastTemp);
      forecastdiv.appendChild(forecastDay);
    }

  });

}


// When cities from search history are clicked
city1.onclick = weathercity1;
city2.onclick = weathercity2;
city3.onclick = weathercity3;
city4.onclick = weathercity4;
city5.onclick = weathercity5;

function weathercity1() {
  var weatherapi = 'https://api.openweathermap.org/data/2.5/weather?q=' + cities[0] + '&units=imperial&appid=27b5e63c65752cfa7f1cc398fef6d406';
  citytitle.innerText = cities[0];

  fetch(weatherapi)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.main);

      console.log(data.main.temp);
      currenttemp.innerText = data.main.temp + '°';
      hltemp.innerText = 'H/L:  ' + Math.round(data.main.temp_max) + '° / ' + Math.round(data.main.temp_min) + '°';

      currenthumidity.innerText = data.main.humidity;

      console.log(data.wind);
      currentwind.innerText = data.wind.speed + ' mph';
      hlwind.innerText = data.wind.deg + ' deg';

      lat = data.coord.lat;
      lon = data.coord.lon;
      console.log(lat);
      console.log(lon);
  
      forecast();
    }
  );
}

function weathercity2() {
  var weatherapi = 'https://api.openweathermap.org/data/2.5/weather?q=' + cities[1] + '&units=imperial&appid=27b5e63c65752cfa7f1cc398fef6d406';
  citytitle.innerText = cities[1];

  fetch(weatherapi)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)

      console.log(data.main.temp);
      currenttemp.innerText = data.main.temp + '°';
      hltemp.innerText = 'H/L:  ' + Math.round(data.main.temp_max) + '° / ' + Math.round(data.main.temp_min) + '°';

      currenthumidity.innerText = data.main.humidity;

      console.log(data.wind);
      currentwind.innerText = data.wind.speed + ' mph';
      hlwind.innerText = data.wind.deg + ' deg';

      lat = data.coord.lat;
      lon = data.coord.lon;
      console.log(lat);
      console.log(lon);
  
      forecast();
    });
}
function weathercity3() {
  var weatherapi = 'https://api.openweathermap.org/data/2.5/weather?q=' + cities[2] + '&units=imperial&appid=27b5e63c65752cfa7f1cc398fef6d406';
  citytitle.innerText = cities[2];

  fetch(weatherapi)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)

      console.log(data.main.temp);
      currenttemp.innerText = data.main.temp + '°';
      hltemp.innerText = 'H/L:  ' + Math.round(data.main.temp_max) + '° / ' + Math.round(data.main.temp_min) + '°';

      currenthumidity.innerText = data.main.humidity;

      console.log(data.wind);
      currentwind.innerText = data.wind.speed + ' mph';
      hlwind.innerText = data.wind.deg + ' deg';

      lat = data.coord.lat;
      lon = data.coord.lon;
      console.log(lat);
      console.log(lon);
  
      forecast();
    });
}
function weathercity4() {
  var weatherapi = 'https://api.openweathermap.org/data/2.5/weather?q=' + cities[3] + '&units=imperial&appid=27b5e63c65752cfa7f1cc398fef6d406';
  citytitle.innerText = cities[3];

  fetch(weatherapi)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)

      console.log(data.main.temp);
      currenttemp.innerText = data.main.temp + '°';
      hltemp.innerText = 'H/L:  ' + Math.round(data.main.temp_max) + '° / ' + Math.round(data.main.temp_min) + '°';

      currenthumidity.innerText = data.main.humidity;

      console.log(data.wind);
      currentwind.innerText = data.wind.speed + ' mph';
      hlwind.innerText = data.wind.deg + ' deg';

      lat = data.coord.lat;
      lon = data.coord.lon;
      console.log(lat);
      console.log(lon);
  
      forecast();
    });
}
function weathercity5() {
  var weatherapi = 'https://api.openweathermap.org/data/2.5/weather?q=' + cities[4] + '&units=imperial&appid=27b5e63c65752cfa7f1cc398fef6d406';
  citytitle.innerText = cities[4];

  fetch(weatherapi)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)

      console.log(data.main.temp);
      currenttemp.innerText = data.main.temp + '°';
      hltemp.innerText = 'H/L:  ' + Math.round(data.main.temp_max) + '° / ' + Math.round(data.main.temp_min) + '°';

      currenthumidity.innerText = data.main.humidity;

      console.log(data.wind);
      currentwind.innerText = data.wind.speed + ' mph';
      hlwind.innerText = data.wind.deg + ' deg';

      lat = data.coord.lat;
      lon = data.coord.lon;
      console.log(lat);
      console.log(lon);
  
      forecast();
    });
}