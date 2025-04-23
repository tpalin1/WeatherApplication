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

const App = () => {
  const [selectedCity, setSelectedCity] = useState(initialCities[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState([]);

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
     console.log(data);
    } catch (error) {
      console.error(error.message);
    }
  };
  const toggleFavorite = (city) => {
    const isAlreadyFav = favorites.some((fav) => fav.name === city.name);
    if (isAlreadyFav) {
      setFavorites(favorites.filter((fav) => fav.name !== city.name));
    } else {
      setFavorites([...favorites, city]);
    }
  };

  const isFavorite = (cityName) => favorites.some((c) => c.name === cityName);

  return (
    
    <div className="app">
       <button onClick={fetchWeather}>Get Weather</button>
      {/* Top Bar */}
      <header className="top-bar">
        <input
          className="search-input"
          placeholder="Search city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown = {(e) => {
            if (e.key === 'Enter') {
              fetchWeather(searchTerm);
              setSearchTerm('');
              
            }}
          }
        />
        <div className="buttons">
          <button className="btn favorite-btn" onClick={() => setShowFavorites(!showFavorites)}>
            Favorites
          </button>
          <button className="btn login-btn">Login</button>
        </div>
      </header>

      {/* Sidebar */}
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

      {/* Main Content */}
      <main className="main">
        <div className="weather-card">
          <h1>{selectedCity.name}</h1>
          <div className="icon">{selectedCity.icon}</div>
          <h2>{selectedCity.temp}°C</h2>
          <p>{selectedCity.condition}</p>
        </div>

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
              <p>{city.temp}°C</p>
              <small>{city.condition}</small>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
