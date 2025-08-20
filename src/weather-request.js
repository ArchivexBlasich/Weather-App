const API_KEY = "2YCQHA4SHJ4Y3C8GXUD4QT65A";
const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

const weatherRequest = (async () => {
  let city = prompt("City:", "london");
  try {
    let response = await fetch(
      `${BASE_URL}${city}?key=${API_KEY}&unitGroup=metric`,
      { mode: "cors" },
    );
    if (!response.ok) {
      response.status === 400
        ? console.error("City not found")
        : console.error("Error, status received:" + response.status);
      return;
    }
    let weather = await parseJSON(response);
    console.log(weather);
  } catch (error) {
    console.log(error);
  }
})();

const parseJSON = async (response) => {
    let weather = await response.json();
    let currentConditions = weather.currentConditions;
    return {
        city: weather.address,
        description: weather.description,
        temp: currentConditions.temp,
        feelslike: currentConditions.feelslike,
        humidity: currentConditions.humidity,
        precipprob: currentConditions.precipprob,
        windspeed: currentConditions.windspeed,
        uvIndex: currentConditions.uvindex,
        unitGroup: "metric",
    }
}

export default weatherRequest;
