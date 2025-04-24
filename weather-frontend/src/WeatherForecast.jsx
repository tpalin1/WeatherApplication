import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getWeather, getWeatherForecast } from './WeatherService';

export const WeatherDetailPage = () => {
  const { cityName } = useParams();
  const [weather, setWeather] = useState(null);

  const [forecast, setForecast] = useState([]);


  // Temporary hourly data
  const hourlyData = [
    { hour: "6 AM", temp: 15, condition: "Cloudy", icon: "🌥️" },
    { hour: "9 AM", temp: 18, condition: "Sunny", icon: "☀️" },
    { hour: "12 PM", temp: 20, condition: "Sunny", icon: "☀️" },
    { hour: "3 PM", temp: 22, condition: "Partly Cloudy", icon: "⛅" },
    { hour: "6 PM", temp: 18, condition: "Clear", icon: "🌤️" },
    { hour: "9 PM", temp: 16, condition: "Clear", icon: "🌙" },
    { hour: "12 AM", temp: 14, condition: "Clear", icon: "🌙" },
    { hour: "3 AM", temp: 13, condition: "Cloudy", icon: "🌥️" },
  ];

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getWeather(cityName);
      if (data) {
        setWeather({
          name: data.name,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          condition: data.weather[0].description,
        });
      }
    };

    const fetchForecast = async () => {
        const data = await getWeatherForecast(cityName);
        const formattedForecast = data.list.map(item => {
            const date = new Date(item.dt * 1000);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const formattedTime = `${day}/${month} ${hours}:${minutes}`;
        
            return {
              time: formattedTime,
              temp: Math.round(item.main.temp -273.15),
              icon: item.weather[0].icon,
              condition: item.weather[0].description,
            };
          });
        
          
          console.log(formattedForecast); // now has readable time strings
    };

    fetchForecast();
    
    fetchWeather();
  }, [cityName]);






  if (!weather) return <div>Loading...</div>;

  return (
    <div className="weather-detail">
      <div className="city-name">{weather.name}</div>
      <div className="weather-info">
        <div className="temperature">{Math.round(weather.temp)}°C</div>
        <div className="condition">{weather.condition}</div>
      </div>

      {/* Hourly Forecast Carousel */}
      <div className="hourly-carousel">
        {hourlyData.map((hourData, index) => (
          <div key={index} className="hourly-card">
            <div className="hour">{hourData.hour}</div>
            <div className="icon">{hourData.icon}</div>
            <div className="temperature">{hourData.temp}°C</div>
            <div className="condition">{hourData.condition}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
