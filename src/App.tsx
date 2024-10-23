import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WeatherSelector, getWeather } from './redux/reducers/weatherSlice';
import Loader from './components/Loader/Loader';

const App: React.FC = () => {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const weatherData = useSelector(WeatherSelector.getWeather);
  const loading = useSelector(WeatherSelector.getLoading);
  const error = useSelector(WeatherSelector.getError)

  const handleSearch = () => {
    dispatch(getWeather(city));
    setCity('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Weather Dashboard</h1>
      <div className="w-full max-w-md">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className={`w-full mt-4 p-3 text-white rounded-lg transition duration-200 
            ${city ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
          disabled={!city}
        >
          Search
        </button>
      </div>
      {loading && (
        <div className="flex justify-center items-center mt-4">
          <Loader />
        </div>
      )}
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : weatherData ? (
        <div className="mt-8 bg-white shadow-md rounded-lg p-4 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Current Weather in {weatherData.name}
          </h2>
          <p className="text-lg text-gray-600">
            Temperature: <span className="font-bold">{weatherData.main.temp}°C</span>
          </p>
          <p className="text-lg text-gray-600">
            Humidity: <span className="font-bold">{weatherData.main.humidity}%</span>
          </p>
          <p className="text-lg text-gray-600">
            Wind Speed: <span className="font-bold">{weatherData.wind.speed} m/s</span>
          </p>
          <p className="text-lg text-gray-600">
            Condition: <span className="font-bold">{weatherData.weather[0].main}</span>
          </p>
        </div>
      ) : null}

    </div>
  );
};

export default App;
