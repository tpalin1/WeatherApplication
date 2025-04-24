// components/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // optional, keep styles clean

const convertTemp = (temp, unit) => unit === 'C' ? temp : Math.round((temp * 9) / 5 + 32);

export const HomePage = ({
  searchTerm, handleSearchChange, fetchWeather, tempUnit, setTempUnit,
  favorites, showFavorites, setShowFavorites, toggleFavorite, isFavorite,
  initialCities
}) => {
  const navigate = useNavigate();


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
              <li key={i} onClick={() => navigate(`/weather/${city.name}`)}>
                {city.name}
              </li>
            ))}
          </ul>
        )}
      </aside>

      <main className="main centered">
        <div className="search-section">
          <input
            className="search-input"
            placeholder="Search for a city..."
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                fetchWeather();
                if (searchTerm) {
                  navigate(`/weather/${searchTerm}`);
                } 
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

        <h3 className="section-title">Popular Cities</h3>
        <div className="carousel">
          {initialCities.map((city, index) => (
            <div key={index} className="carousel-card">
              <div className="top-row">
                <span onClick={() => toggleFavorite(city)} className="star">
                  {isFavorite(city.name) ? '⭐' : '☆'}
                </span>
              </div>
              <div className="icon" onClick={() => navigate(`/weather/${city.name}`)}>
                {city.icon}
              </div>
              <h4 onClick={() => navigate(`/weather/${city.name}`)}>{city.name}</h4>
              <p>{convertTemp(city.temp, tempUnit)}°{tempUnit}</p>
              <small>{city.condition}</small>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
