import { events } from "./events";

const domController = (() => {
  initFormController();
  renderWeather();

  const preloader = document.querySelector(".preloader");
  const toggleTempUnitBtn = document.querySelector("#toggleTempUnit");
  const weatherContainer = document.querySelector("#weatherContainer");

  // bind events
  events.on("startApiRequest", () => {
    preloader.classList.remove("loaded");
  });
  events.on("weatherApiRespond", () => {
    preloader.classList.add("loaded");
  });

  toggleTempUnitBtn.addEventListener("click", toggleTempUnit);

  function toggleTempUnit() {
    if (weatherContainer.innerHTML === "") return;
    events.emit("changeTempUnit");
    if (toggleTempUnitBtn.textContent === "°C") {
       toggleTempUnitBtn.textContent = "°F" 
    } else {
        toggleTempUnitBtn.textContent = "°C"
    }
  }
})();

function renderWeather() {
  // DOM cache
  const weatherContainer = document.querySelector("#weatherContainer");
  let currentWeather;

  // bind events
  events.on("weatherApiRespond", render);
  events.on("changeTempUnit", changeTemp);

  function render(weather) {
    weatherContainer.innerHTML = "";
    currentWeather = weather;
    createWeatherElement(weather).forEach((element) => {
      weatherContainer.appendChild(element);
    });

    document.body.className = getWeatherTheme(weather.conditions);

    const tempContainer = document.querySelector(
      "#weatherContainer > div[data-attr='tempContainer']",
    );
    getGIF().then((img) => tempContainer.appendChild(img));
  }

  function createWeatherElement(weather) {
    const headerContainer = document.createElement("div");
    const city = document.createElement("h1");
    const conditions = document.createElement("h3");
    const description = document.createElement("h5");

    const tempContainer = document.createElement("div");
    const temp = document.createElement("h2");

    const moreDetailsContainer = document.createElement("div");
    const feelslike = document.createElement("p");
    const precipprob = document.createElement("p");
    const humidity = document.createElement("p");
    const windspeed = document.createElement("p");
    const uvIndex = document.createElement("p");

    city.textContent = weather.city;
    description.textContent = weather.description;
    conditions.textContent = weather.conditions;
    conditions;
    temp.textContent = `${weather.temp}${weather.unitGroup === "metric" ? "°C" : "°F"}`;
    feelslike.textContent = `Feels like: ${weather.feelslike}${weather.unitGroup === "metric" ? "°C" : "°F"}`;
    precipprob.textContent = `Precipitation: ${weather.precipprob}%`;
    humidity.textContent = `Humidity: ${weather.humidity}%`;
    windspeed.textContent = `Wind speed: ${weather.windspeed}km/h`;
    uvIndex.textContent = `UV index: ${weather.uvIndex}`;

    city.dataset.attr = "city";
    description.dataset.attr = "description";
    conditions.dataset.attr = "conditions";
    temp.dataset.attr = "temp";
    feelslike.dataset.attr = "feelslike";
    precipprob.dataset.attr = "precipprob";
    humidity.dataset.attr = "humidity";
    windspeed.dataset.attr = "windspeed";
    uvIndex.dataset.attr = "uvIndex";

    headerContainer.appendChild(city);
    headerContainer.appendChild(conditions);
    headerContainer.appendChild(description);
    headerContainer.dataset.attr = "headerContainer";

    tempContainer.appendChild(temp);
    tempContainer.dataset.attr = "tempContainer";

    moreDetailsContainer.appendChild(feelslike);
    moreDetailsContainer.appendChild(precipprob);
    moreDetailsContainer.appendChild(humidity);
    moreDetailsContainer.appendChild(windspeed);
    moreDetailsContainer.appendChild(uvIndex);
    moreDetailsContainer.dataset.attr = "moreDetailsContainer";

    return [headerContainer, tempContainer, moreDetailsContainer];
  }

  function getWeatherTheme(weatherCondition) {
    let condition = weatherCondition.toLowerCase();

    function includeCondition(c) {
      return condition.includes(c);
    }

    if (includeCondition("clear") || includeCondition("sunny")) {
      return "sunny";
    } else if (includeCondition("cloudy") || includeCondition("overcast")) {
      return "cloudy";
    } else if (
      includeCondition("rain") ||
      includeCondition("drizzle") ||
      includeCondition("drizzle") ||
      includeCondition("precipitation") ||
      includeCondition("shower")
    ) {
      return "rainy";
    } else if (
      includeCondition("snow") ||
      includeCondition("ice") ||
      includeCondition("freezing")
    ) {
      return "snowy";
    } else if (
      includeCondition("fog") ||
      includeCondition("mist") ||
      includeCondition("haze") ||
      includeCondition("smoke")
    ) {
      return "foggy";
    } else if (
      includeCondition("thunder") ||
      includeCondition("lightning") ||
      includeCondition("squall") ||
      includeCondition("tornado")
    ) {
      return "stormy";
    } else {
      return "default";
    }
  }

  async function getGIF() {
    const API_KEY = "Sv8ppGyxWpTMsC5PLH90uvD2RvUuM4fF";
    const BASE_URL = `https://api.giphy.com/v1/gifs?api_key=${API_KEY}`;

    const img = document.createElement("img");
    img.setAttribute("style", "max-height: 50%");
    if (document.body.className === "cloudy") {
      let response = await fetch(`${BASE_URL}&ids=dBXNPw0XBdF1n82BBf`, {
        mode: "cors",
      });
      let json = await response.json();
      img.src = json.data[0].images.original.url;
    } else if (document.body.className === "sunny") {
      let response = await fetch(`${BASE_URL}&ids=xThtadpEYo0hmZGMSI`, {
        mode: "cors",
      });
      let json = await response.json();
      img.src = json.data[0].images.original.url;
    } else if (document.body.className === "rainy") {
      let response = await fetch(`${BASE_URL}&ids=W9qCmeTuUoaFG`, {
        mode: "cors",
      });
      let json = await response.json();
      img.src = json.data[0].images.original.url;
    } else if (document.body.className === "snowy") {
      let response = await fetch(`${BASE_URL}&ids=bUb65JMBjPhFjPDrQm`, {
        mode: "cors",
      });
      let json = await response.json();
      img.src = json.data[0].images.original.url;
    } else if (document.body.className === "foggy") {
      let response = await fetch(`${BASE_URL}&ids=KPtOFhewRGWl2`, {
        mode: "cors",
      });
      let json = await response.json();
      img.src = json.data[0].images.original.url;
    } else if (document.body.className === "stormy") {
      let response = await fetch(`${BASE_URL}&ids=3osxYzIQRqN4DOEddC`, {
        mode: "cors",
      });
      let json = await response.json();
      img.src = json.data[0].images.original.url;
    } else {
      let response = await fetch(`${BASE_URL}&ids=jsm7XMcyeTFJE4vHzO`, {
        mode: "cors",
      });
      let json = await response.json();
      img.src = json.data[0].images.original.url;
    }

    return img;
  }

  function changeTemp() {
    function convertCelsiusToFahrenheit(celsius) {
      const fahrenheit = (celsius * 9) / 5 + 32;
      return Math.round(fahrenheit * 100) / 100;;
    }

    function convertFahrenheitToCelsius(fahrenheit) {
      let celsius =  ((fahrenheit - 32) * 5) / 9;
      return Math.round(celsius * 100) / 100;
    }

    let temp = document.querySelector("[data-attr='temp']");
    let feelslike = document.querySelector("[data-attr='feelslike']");

    if (currentWeather.unitGroup === "metric") {
      let tempF = Number(temp.textContent.replace("°C", ""));
      tempF = convertCelsiusToFahrenheit(tempF);
      temp.textContent = `${tempF}°F`;

      let feelslikeF = feelslike.textContent.replace("Feels like: ", "");
      feelslikeF = Number(feelslikeF.replace("°C", ""));
      feelslikeF = convertCelsiusToFahrenheit(feelslikeF);
      feelslike.textContent = `Feels like:  ${feelslikeF}°F`;

      currentWeather.unitGroup = "us";
    } else {
      let tempC = Number(temp.textContent.replace("°F", ""));
      tempC = convertFahrenheitToCelsius(tempC);
      temp.textContent = `${tempC}°C`;

      let feelslikeC = feelslike.textContent.replace("Feels like: ", "");
      feelslikeC = Number(feelslikeC.replace("°F", ""));
      feelslikeC = convertFahrenheitToCelsius(feelslikeC);
      feelslike.textContent = `Feels like:  ${feelslikeC}°C`;

      currentWeather.unitGroup = "metric";
    }
  }
}

function initFormController() {
  // DOM cache
  const city = document.querySelector("#cityName");
  const submitBtn = document.querySelector("#cityName ~ button");

  submitBtn.addEventListener("click", getCityName);
  city.addEventListener("input", checkCity);
  city.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitBtn.click();
    }
  });

  function checkCity() {
    city.setCustomValidity("");
    if (!city.validity.valid) {
      city.value === ""
        ? city.setCustomValidity("Please enter a City Name")
        : city.setCustomValidity("Please Just enter Alphabetical characters");
      city.reportValidity();
    }
  }

  function getCityName(e) {
    city.setCustomValidity("");
    if (!city.validity.valid) {
      city.value === ""
        ? city.setCustomValidity("Please enter a City Name")
        : city.setCustomValidity("Please Just enter Alphabetical characters");
      city.reportValidity();
      return;
    }

    events.emit("cityEntered", city.value);
  }
}

export default domController;
