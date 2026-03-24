import { startClock } from "./clock.mjs";
import { getOutfitByTemperature } from "./outfit_engine.mjs";

export function renderWeather(container, data) {
  container.replaceChildren();

  if (!data || !data.weather || !data.weather[0]) {
    console.error("Invalid weather data:", data);
    const error = document.createElement("p");
    error.textContent = "Invalid weather data";
    container.appendChild(error);
    return;
  }

  const {
    name,
    timezone,
    main: { temp, humidity },
    weather: [{ description, id }]
  } = data;

  startClock("clock", timezone);

  const wrapper = document.createElement("div");
  wrapper.className = "card";

  const cityEl = document.createElement("h2");
  cityEl.textContent = name;

  const tempEl = document.createElement("p");
  tempEl.textContent = `${(temp - 273.15).toFixed(1)}°C`;

  const humidityEl = document.createElement("p");
  humidityEl.textContent = `Humidity: ${humidity}%`;

  const descEl = document.createElement("p");
  descEl.textContent = description;

  const emojiEl = document.createElement("p");
  emojiEl.textContent = getWeatherEmoji(id);
  emojiEl.className = "weatherEmoji";

  wrapper.append(cityEl, tempEl, humidityEl, descEl, emojiEl);
  container.appendChild(wrapper);

  const tempC = temp - 273.15;
  const outfit = getOutfitByTemperature(tempC);

  document.getElementById("layer-top").src = outfit[0];
  document.getElementById("layer-pants").src = outfit[1];
  document.getElementById("layer-accessory").src = outfit[2];

  document.getElementById("weather-background").style.backgroundImage =
    `url(${outfit[3]})`;
}

function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "🌩️";
    case weatherId >= 300 && weatherId < 600:
      return "🌧️";
    case weatherId >= 600 && weatherId < 700:
      return "🌨️";
    case weatherId >= 700 && weatherId < 800:
      return "🌫️";
    case weatherId === 800:
      return "☀️";
    case weatherId > 800:
      return "☁️";
    default:
      return "❓";
  }
}