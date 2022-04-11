var key = '27b5e63c65752cfa7f1cc398fef6d406';
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

date.innerText = currentDate;
time.innerText = currentTime;
day1.innerText = moment().add(1, 'day').format('MM/DD');
day2.innerText = moment().add(2, 'day').format('MM/DD');
day3.innerText = moment().add(3, 'day').format('MM/DD');
day4.innerText = moment().add(4, 'day').format('MM/DD');
day5.innerText = moment().add(5, 'day').format('MM/DD');

var cities = ['Knoxville', 'Pigeon Forge', 'Atlanta', 'Milledgeville', 'Dublin'];
console.log(cities);

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

var temp1 = document.getElementById("temp1");
var temp2 = document.getElementById("temp2");
var temp3 = document.getElementById("temp3");
var temp4 = document.getElementById("temp4");
var temp5 = document.getElementById("temp5");


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


var lat = '';
var lon = '';

function weathersearch() {
  var weatherapi = 'https://api.openweathermap.org/data/2.5/weather?q=' + cities[0] + '&units=imperial&appid=' + key;
  citytitle.innerText = cities[0];

  fetch(weatherapi)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data)

    console.log(data.main.temp);
    currenttemp.innerText = data.main.temp + '°';
    hltemp.innerText = 'H/L: ' + data.main.temp_max + '°/' + data.main.temp_min + '°';

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


function forecast(){
  var forecastapi = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + key;
  
  fetch(forecastapi)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data)

    console.log(data.current.uvi);
    currentuv.innerText = data.current.uvi;

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


    temp1.innerText = Math.round(data.daily[0].temp.day) + '°';
    temp2.innerText = Math.round(data.daily[1].temp.day) + '°';
    temp3.innerText = Math.round(data.daily[2].temp.day) + '°';
    temp4.innerText = Math.round(data.daily[3].temp.day) + '°';
    temp5.innerText = Math.round(data.daily[4].temp.day) + '°';


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
      hltemp.innerText = 'H/L: ' + data.main.temp_max + '°/' + data.main.temp_min + '°';

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
      hltemp.innerText = 'H/L: ' + data.main.temp_max + '°/' + data.main.temp_min + '°';

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
      hltemp.innerText = 'H/L: ' + data.main.temp_max + '°/' + data.main.temp_min + '°';

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
      hltemp.innerText = 'H/L: ' + data.main.temp_max + '°/' + data.main.temp_min + '°';

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
      hltemp.innerText = 'H/L: ' + data.main.temp_max + '°/' + data.main.temp_min + '°';

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