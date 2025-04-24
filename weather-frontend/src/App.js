// App.jsx
import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { getWeather } from './WeatherService';
import { HomePage } from './HomePage';
import { WeatherDetailPage } from './WeatherForecast';

const initialCities = [
  { name: 'London', temp: 14, icon: '🌧️', condition: 'Rainy' },
  { name: 'New York', temp: 18, icon: '☀️', condition: 'Sunny' },
  { name: 'Tokyo', temp: 22, icon: '⛅', condition: 'Cloudy' },
  { name: 'Sydney', temp: 25, icon: '🌤️', condition: 'Clear' },
  { name: 'Dubai', temp: 34, icon: '🔥', condition: 'Hot' },
];

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [tempUnit, setTempUnit] = useState('C');

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const toggleFavorite = (city) => {
    const isFav = favorites.some((fav) => fav.name === city.name);
    setFavorites(isFav ? favorites.filter((f) => f.name !== city.name) : [...favorites, city]);
  };

  const isFavorite = (name) => favorites.some((f) => f.name === name);

  const fetchWeather = async () => {
    try {
      const data = await getWeather(searchTerm);
      if (!data) throw new Error('City not found!');
      
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
            fetchWeather={fetchWeather}
            tempUnit={tempUnit}
            setTempUnit={setTempUnit}
            favorites={favorites}
            showFavorites={showFavorites}
            setShowFavorites={setShowFavorites}
            toggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
            initialCities={initialCities}
          />
        }
      />
      <Route path="/weather/:cityName" element={<WeatherDetailPage />} />
    </Routes>
    </BrowserRouter>
  );
};

export default App;
