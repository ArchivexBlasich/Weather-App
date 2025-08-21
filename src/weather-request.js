import { events } from "./events";

const API_KEY = "2YCQHA4SHJ4Y3C8GXUD4QT65A";
const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

const weatherController = (() => {
  // bind events
  events.on("cityEntered", weatherRequest);

  async function weatherRequest(city) {
    try {
      events.emit("startApiRequest");
      let response = await fetch(
        `${BASE_URL}${city}?key=${API_KEY}&unitGroup=metric`,
        { mode: "cors" },
      );
      if (!response.ok) {
        response.status === 400
          ? events.emit("weatherApiRespond", "error")
          : console.error("Error, status received:" + response.status);
        return;
      }
      let weather = await parseJSON(response);
      events.emit("weatherApiRespond", weather);
    } catch (error) {
      events.emit("weatherApiRespond", "error");
      console.log(error);
    }
  }

  const parseJSON = async (response) => {
    let weather = await response.json();
    let currentConditions = weather.currentConditions;
    return {
      city: weather.address,
      description: weather.description,
      temp: currentConditions.temp,
      conditions: currentConditions.conditions,
      feelslike: currentConditions.feelslike,
      humidity: currentConditions.humidity,
      precipprob: currentConditions.precipprob,
      windspeed: currentConditions.windspeed,
      uvIndex: currentConditions.uvindex,
      unitGroup: "metric",
    };
  };
})();

export default weatherController;
