//Today's Card Variables:
let today = document.getElementById("today");
let todayDate = document.getElementById("today-date");
let citylocation = document.getElementById("location");
// let todayDegree = document.getElementById("todaydegree");
let toDegree = document.getElementById("todegree");
let todayIcon = document.getElementById("today-icon");
let description = document.getElementById("today-description");
let humidty = document.getElementById("humidty");
let wind = document.getElementById("wind");
let compass = document.getElementById("compass");
let search = document.getElementById("search-bar");

//Next Days Variables:

let nextday = document.getElementsByClassName("nextday");
let nextDayIcon = document.getElementsByClassName("next-day");
let maxDegree = document.getElementsByClassName("max-degree");
let minDegree = document.getElementsByClassName("min-degree");
let nextDayDescription = document.getElementsByClassName("nextDay-description");
let currentCity = "Cairo";
let monthName = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Spet",
  "Oct",
  "Nov",
  "Dec",
];
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

async function getWeatherData() {
  responsedata = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=6cfaad492f6b4cb488e161318232407&q=${currentCity}&days=3`);
  response = await responsedata.json();
  console.log(response);
  displayWeather();
  displayNext();
}
getWeatherData();

let date = new Date();
function displayWeather() {
  today.innerHTML = days[date.getDay()];
  todayDate.innerHTML = `${date.getDate()} ${monthName[date.getMonth()]}`;
  citylocation.innerHTML = response.location.name;
//   todayDegree.innerHTML = response.current.temp_c ; 
// todayDegree.innerHTML= response.current.temp_c;
toDegree.innerHTML= response.current.temp_c;
todayIcon.setAttribute("src",`https:${response.current.condition.icon}`);
description.innerHTML=response.current.condition.text;
humidty.innerHTML=  response.current.humidity;
wind.innerHTML = response.current.wind_kph;
compass.innerHTML = response.current.wind_dir;
}


function displayNext(){
    for(let i=0 ; i<nextday.length ; i++){
        nextday[i].innerHTML=days[new Date(response.forecast.forecastday[i+1].date).getDay()];
        nextDayIcon[i].setAttribute("src",`https:${response.forecast.forecastday[i+1].day.condition.icon}`);
        maxDegree[i].innerHTML=response.forecast.forecastday[i+1].day.maxtemp_c;
        minDegree[i].innerHTML=response.forecast.forecastday[i+1].day.mintemp_c;
        nextDayDescription[i].innerHTML=response.forecast.forecastday[i+1].day.condition.text;

    }
}

search.addEventListener("keyup",function(){
    currentCity = search.value ;
    
    console.log(currentCity);
    if(currentCity.length >=3){
      console.log("true")
         getWeatherData(currentCity);
    }

})