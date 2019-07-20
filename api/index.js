import axios from "axios";
import { API_KEY } from "./config";

export const fetchWeather = (lat, lon) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
};
