import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WeatherSelector, getWeather } from './redux/reducers/weatherSlice';

const App: React.FC = () => {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const weatherData = useSelector(WeatherSelector.getWeather);

  const handleSearch = () => {
    dispatch(getWeather(city));
    setCity('');
  };

  return (
    <div>
      <h1>Weather Dashboard</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={handleSearch}>Search</button>

      {weatherData && (
        <div>
          <h2>Current Weather in {weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>Condition: {weatherData.weather[0].main}</p>
        </div>
      )}
    </div>
  );
};

export default App;
