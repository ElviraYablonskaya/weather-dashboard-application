import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WeatherSelector, getWeather, addFavoriteCity, getForecast } from './redux/reducers/weatherSlice';
import Loader from './components/Loader/Loader';
import FavoriteCities from './components/FavoriteCities/FavoriteCities';
import ForecastWeather from './components/ForecastWeather/ForecastWeather';

const App: React.FC = () => {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const weather = useSelector(WeatherSelector.getWeather);
  const loading = useSelector(WeatherSelector.getLoading);
  const error = useSelector(WeatherSelector.getError);
  const getIconUrl = (icon: string) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

  useEffect(() => {
    const storedCities = localStorage.getItem('favoriteCities');
    if (storedCities) {
      const citiesArray = JSON.parse(storedCities);
      citiesArray.forEach((city: string) => {
        dispatch(addFavoriteCity(city));
      });
    }
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(getWeather(city));
    dispatch(getForecast(city));
    setCity('');
  };

  const handleAddFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (weather && weather.name) {
      dispatch(addFavoriteCity(weather.name));
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-start p-6">
      <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full text-center mr-6 border">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Weather Dashboard</h1>
        <div className="mb-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleSearch}
          className={`w-full p-3 text-white rounded-lg transition duration-200 ${city ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
          disabled={!city}
        >
          Search
        </button>
        {loading && (
          <div className="flex justify-center items-center mt-6">
            <Loader />
          </div>
        )}

        {weather && weather.weather && weather.weather.length > 0 ? (
          <div className="mt-8 bg-white border rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
              {weather.name}
            </h2>
            <div className='flex justify-center'>
              <img
                src={getIconUrl(weather.weather[0].icon)}
                alt="Weather icon"
                className="w-22 h-22 hover:scale-110 transition-transform drop-shadow-lg"
              />
            </div>
            <div className='flex justify-between'>
              <div className="text-lg text-gray-600">
                <p>Temp: <span className="font-bold">{weather.main.temp}°C</span></p>
                <p>Humidity: <span className="font-bold">{weather.main.humidity}%</span></p>
              </div>
              <div className="text-lg text-gray-600">
                <p>Wind: <span className="font-bold">{weather.wind.speed} m/s</span></p>
                <p>Condition: <span className="font-bold">{weather.weather[0].main}</span></p>
              </div>
            </div>
            <button
              onClick={handleAddFavorite}
              className="mt-4 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200 w-full"
            >
              Add to Favorites
            </button>
          </div>
        ) : (
          <p className="text-red-500 mt-4">{error}</p>
        )}
        <FavoriteCities />
      </div>
      <ForecastWeather />
    </div>
  );
};

export default App;
