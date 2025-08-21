import { events } from "./events";

const domController = (() => {
  initFormController();
  renderWeather();
})();

function renderWeather() {
  // DOM cache
  const weatherContainer = document.querySelector("#weatherContainer");

  // bind events
  events.on("weatherApiRespond", render);

  function render(weather) {
    weatherContainer.innerHTML = "";
    createWeatherElement(weather).forEach((element) => {
      weatherContainer.appendChild(element);
    });

    document.body.className = getWeatherTheme(weather.conditions);
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
    conditions.textContent = weather.conditions;conditions
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
