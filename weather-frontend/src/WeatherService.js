const BASE_URL = "https://localhost:7036";

export async function getWeather(city) {
  const response = await fetch(`${BASE_URL}/WeatherForecast/weather?city=${city}`);
  if (!response.ok) {
    throw new Error("Failed to fetch weather");
  }
  return await response.json();
}



export async function getWeatherForecast(city) {
  const response = await fetch(`${BASE_URL}/ForecastController5day/forecast?cityName=${city}`);
  if (!response.ok) {
    throw new Error("Failed to fetch weathershidohaishoidf forecast");
  }
  return await response.json();
}