import React, { useState } from 'react';

const App = () => {
  const popularCities = [
    { name: 'London', temp: 14, icon: '🌧️', condition: 'Rainy' },
    { name: 'New York', temp: 18, icon: '☀️', condition: 'Sunny' },
    { name: 'Tokyo', temp: 22, icon: '⛅', condition: 'Cloudy' },
    { name: 'Sydney', temp: 25, icon: '🌤️', condition: 'Clear' },
    { name: 'Dubai', temp: 34, icon: '🔥', condition: 'Hot' },
  ];

  const [selectedCity, setSelectedCity] = useState(popularCities[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const favoriteCities = ['Paris', 'Berlin', 'Seoul'];

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #00b4d8, #0077b6);
          color: #fff;
        }

        .app-container {
          display: flex;
          height: 100vh;
          overflow: hidden;
        }

        .sidebar {
          width: 280px;
          background: #023e8a;
          padding: 1.5rem;
          box-shadow: 4px 0 20px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .sidebar h2 {
          margin-top: 0;
          font-size: 2rem;
          color: #fff;
          text-align: center;
        }

        .sidebar input {
          padding: 0.8rem;
          border-radius: 50px;
          border: 1px solid #fff;
          margin-bottom: 1.5rem;
          background: #023e8a;
          color: #fff;
          font-size: 1rem;
          width: 100%;
          transition: 0.3s;
        }

        .sidebar input:focus {
          outline: none;
          border-color: #00b4d8;
          background: #00b4d8;
        }

        .sidebar .favorites {
          margin-top: 1rem;
        }

        .sidebar .favorites li {
          list-style: none;
          padding: 0.3rem 0;
          cursor: pointer;
          font-size: 1.2rem;
          color: #fff;
          transition: 0.3s;
        }

        .sidebar .favorites li:hover {
          color: #00b4d8;
        }

        .sidebar .login-btn {
          margin-top: auto;
          padding: 1rem;
          border: none;
          background: #ff6f61;
          color: white;
          border-radius: 50px;
          cursor: pointer;
          font-size: 1.2rem;
          transition: 0.3s;
        }

        .sidebar .login-btn:hover {
          background: #ff4e39;
        }

        .main {
          flex: 1;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
        }

        .main-card {
          background: #ffffff;
          padding: 2rem;
          border-radius: 1.5rem;
          text-align: center;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
          margin-bottom: 2rem;
          transition: 0.3s;
        }

   
        .main-card h1 {
          font-size: 2.5rem;
          color: #023e8a;
        }

        .main-card .icon {
          font-size: 4rem;
          margin-top: 1rem;
        }

        .main-card h2 {
          font-size: 2rem;
          margin-top: 0.5rem;
        }

        .main-card p {
          font-size: 1.2rem;
          color: #888;
        }

        .carousel {
          display: flex;
          overflow-x: auto;
          gap: 1.5rem;
          padding-bottom: 2rem;
          margin-top: 1rem;
          scroll-behavior: smooth;
        }

        
        .carousel-card {
          min-width: 180px;
          background: #fff;
          padding: 1.5rem;
          border-radius: 1.2rem;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: 0.3s;
          transform: scale(1);
        }

     

        .carousel-card .icon {
          font-size: 3rem;
        }

        .carousel-card h4 {
          font-size: 1.5rem;
          margin-top: 0.5rem;
          color: #023e8a;
        }

        .carousel-card p {
          font-size: 1.1rem;
          color: #888;
        }

      `}</style>

      <div className="app-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2>My Weather</h2>
          <input
            type="text"
            placeholder="Search city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="favorites">
            <h4>Favorites</h4>
            <ul>
              {favoriteCities.map((city, i) => (
                <li key={i} onClick={() => setSelectedCity({ name: city, temp: '--', icon: '❓', condition: 'Loading...' })}>
                  {city}
                </li>
              ))}
            </ul>
          </div>
          <button className="login-btn">Login</button>
        </aside>

        {/* Main */}
        <main className="main">
          {/* Main Weather Card */}
          <div className="main-card">
            <h1>{selectedCity.name}</h1>
            <div className="icon">{selectedCity.icon}</div>
            <h2>{selectedCity.temp}°C</h2>
            <p>{selectedCity.condition}</p>
          </div>

          {/* Carousel */}
          <h3>Popular Cities</h3>
          <div className="carousel">
            {popularCities.map((city, index) => (
              <div
                className="carousel-card"
                key={index}
                onClick={() => setSelectedCity(city)}
              >
                <div className="icon">{city.icon}</div>
                <h4>{city.name}</h4>
                <p>{city.temp}°C</p>
                <small>{city.condition}</small>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default App;
