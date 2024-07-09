import "./WeatherCard.css";
import React, { useContext } from "react";
import {
  weatherOptions,
  defaultWeatherOptions,
} from "../../utils/constants.js";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";

function WeatherCard({ weatherData }) {
  const weatherOption =
    weatherOptions.find((option) => {
      return (
        option.day === weatherData.isDay &&
        option.condition === weatherData.condition
      );
    }) || defaultWeatherOptions[weatherData.isDay ? "day" : "night"];

  const weatherOptionUrl = weatherOption.url;

  const weatherOptionCondition = weatherOption.condition;

  const {currentTemperatureUnit} = useContext(CurrentTemperatureUnitContext)

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{currentTemperatureUnit === 'F' ? `${weatherData.temp.F}°F` : `${weatherData.temp.C}°C`}</p>
      <img
        src={weatherOptionUrl }
        alt={`Card showing ${weatherOptionCondition} weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
