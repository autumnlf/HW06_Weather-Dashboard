var key = '27b5e63c65752cfa7f1cc398fef6d406';
var currentDate = moment().format("dddd MMMM Do, YYYY");
var currentTime = moment().format("hh:mm a")
console.log(currentDate);
console.log(currentTime);

var date = document.getElementById("date");
var time = document.getElementById("time");

date.innerText = currentDate;
time.innerText = currentTime;

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
var hlhumidity = document.getElementById("hlhumidity");
var hluv = document.getElementById("hluv");

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

function weathersearch() {
    var weatherapi = 'https://api.openweathermap.org/data/2.5/weather?q=' + cities[0] + '&units=imperial&appid=27b5e63c65752cfa7f1cc398fef6d406';
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
      });
}


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
    });
}