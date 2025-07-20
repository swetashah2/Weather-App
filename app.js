const ApiKey = "eefb18dac344907b648061a13f57de21";
const ApiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherPic = document.querySelector(".weather_icon");

async function getWeather(city) {
  const response = await fetch(ApiUrl + city + `&appid=${ApiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
  } else {
    var data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".description").innerHTML =
      data.weather[0].description;

    document.querySelector(".humid").innerHTML = data.main.humidity + "%";
    document.querySelector(".speed").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      weatherPic.src = "./images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherPic.src = "./images/clear.png";
    } else if (data.weather[0].main == "Mist") {
      weatherPic.src = "./images/mist.png";
    } else if (data.weather[0].main == "Rain") {
      weatherPic.src = "./images/rain.png";
    } else if (data.weather[0].main == "Snow") {
      weatherPic.src = "./images/snow.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherPic.src = "./images/drizzle.png";
    }

    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  getWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getWeather(searchBox.value);
  }
});
