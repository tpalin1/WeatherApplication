import React, { useState } from 'react';
import { getWeather } from './WeatherService.js';
import './App.css';

const initialCities = [
  { name: 'London', temp: 14, icon: '🌧️', condition: 'Rainy' },
  { name: 'New York', temp: 18, icon: '☀️', condition: 'Sunny' },
  { name: 'Tokyo', temp: 22, icon: '⛅', condition: 'Cloudy' },
  { name: 'Sydney', temp: 25, icon: '🌤️', condition: 'Clear' },
  { name: 'Dubai', temp: 34, icon: '🔥', condition: 'Hot' },
];

// Utility function to convert Celsius to Fahrenheit
const convertTemp = (temp, unit) =>
  unit === 'C' ? temp : Math.round((temp * 9) / 5 + 32);

const App = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [tempUnit, setTempUnit] = useState('C'); // 'C' or 'F'

  const fetchWeather = async () => {
    try {
      const data = await getWeather(searchTerm);

      if (!data) {
        throw new Error('City not found!');
      }
      setSelectedCity({
        name: data.name,
        temp: data.main.temp,
        icon: data.weather[0].icon,
        condition: data.weather[0].description,
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleFavorite = (city) => {
    const isAlreadyFav = favorites.some((fav) => fav.name === city.name);
    setFavorites(isAlreadyFav
      ? favorites.filter((fav) => fav.name !== city.name)
      : [...favorites, city]);
  };

  const isFavorite = (cityName) => favorites.some((c) => c.name === cityName);

  const handleUnitToggle = () => {
    setTempUnit((prev) => (prev === 'C' ? 'F' : 'C'));
  };

  return (
    <div className="app">
      <aside className={`sidebar ${showFavorites ? 'open' : ''}`}>
        <button className="close-btn" onClick={() => setShowFavorites(false)}>&times;</button>
        <h3>Favorites</h3>
        {favorites.length === 0 ? (
          <p>No favorites yet!</p>
        ) : (
          <ul>
            {favorites.map((city, i) => (
              <li key={i} onClick={() => setSelectedCity(city)}>
                {city.name}
              </li>
            ))}
          </ul>
        )}
      </aside>

      <main className={`main ${!selectedCity ? 'centered' : ''}`}>
        <div className="search-section">
          <input
            className="search-input"
            placeholder="Search for a city..."
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                fetchWeather();
                setSearchTerm('');
              }
            }}
          />
          <div className="toggle-container">
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={tempUnit === 'F'}
              onChange={() => setTempUnit((prev) => (prev === 'C' ? 'F' : 'C'))}
            />
            <span className="slider"></span>
          </label>
          <span>{tempUnit === 'C' ? '°C' : '°F'}</span>
        </div>
        </div>

        {selectedCity && (
          <div className="weather-card">
            <h1>{selectedCity.name}</h1>
            <div className="icon">{selectedCity.icon}</div>
            <h2>{convertTemp(selectedCity.temp, tempUnit)}°{tempUnit}</h2>
            <p>{selectedCity.condition}</p>
          </div>
        )}

        <h3 className="section-title">Popular Cities</h3>
        <div className="carousel">
          {initialCities.map((city, index) => (
            <div key={index} className="carousel-card">
              <div className="top-row">
                <span onClick={() => toggleFavorite(city)} className="star">
                  {isFavorite(city.name) ? '⭐' : '☆'}
                </span>
              </div>
              <div className="icon" onClick={() => setSelectedCity(city)}>
                {city.icon}
              </div>
              <h4 onClick={() => setSelectedCity(city)}>{city.name}</h4>
              <p>{convertTemp(city.temp, tempUnit)}°{tempUnit}</p>
              <small>{city.condition}</small>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
