import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getWeather, getWeatherForecast } from './WeatherService';

export const WeatherDetailPage = () => {
  const { cityName } = useParams();
  const [weather, setWeather] = useState(null);

  const [forecast, setForecast] = useState([]);




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
        
          
            setForecast(formattedForecast);
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
        {forecast.map((hourData, index) => (
            <div key={index} className="hourly-card">
                <div className="hour">{hourData.time}</div>
                <div className="icon">{hourData.icon}</div>
                <div className="temp">{Math.round(hourData.temp)}°C</div>
                <div className="condition">{hourData.condition}</div>
            </div>
        ))}
      </div>
    </div>
  );
};
