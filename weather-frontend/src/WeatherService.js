const BASE_URL = "https://localhost:7036/WeatherForecast";

export async function getWeather(city) {
  const response = await fetch(`${BASE_URL}/weather?city=${city}`);
  if (!response.ok) {
    throw new Error("Failed to fetch weather");
  }
  return await response.json();
}
