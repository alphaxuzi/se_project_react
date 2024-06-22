import "./WeatherCard.css";
import sunnyCard from "../../assets/day/clear.svg";
import {
  weatherOptions,
  defaultWeatherOptions,
} from "../../utils/constants.js";

function WeatherCard({ weatherData }) {
  const weatherOption =
    weatherOptions.find((option) => {
      return (
        option.day === weatherData.isDay &&
        option.condition === weatherData.condition
      );
    }) || defaultWeatherOptions[weatherData.isDay ? "day" : "night"];

  const weatherOptionUrl = weatherOption.url;

  console.log(weatherOptionUrl);
  const weatherOptionCondition = weatherOption.condition;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F}&deg;F</p>
      <img
        src={weatherOptionUrl}
        alt={`Card showing ${weatherOptionCondition} weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
