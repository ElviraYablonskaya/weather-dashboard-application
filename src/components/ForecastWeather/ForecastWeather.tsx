import { useSelector } from "react-redux";
import { WeatherSelector } from "../../redux/reducers/weatherSlice";
import Loader from "../Loader/Loader";

const ForecastWeather: React.FC = () => {
    const forecast = useSelector(WeatherSelector.getForecast);
    const weather = useSelector(WeatherSelector.getWeather);
    const loading = useSelector(WeatherSelector.getLoading)
    const getIconUrl = (icon: string) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

    const groupedForecast = forecast?.list?.reduce((acc: Record<string, any[]>, item) => {
        const date = new Date(item.dt * 1000).toLocaleDateString(); // Преобразуем время в дату
        if (!acc[date]) acc[date] = []; // Если дата еще не существует в объекте, создаем ее
        acc[date].push(item); // Добавляем элемент к соответствующей дате
        return acc;
    }, {} as Record<string, any[]>);

    return (
        <div className="bg-white shadow-md rounded-xl p-8 w-full border">
            <h2 className="text-3xl font-bold text-gray-800">{weather?.name}</h2>
            {loading ? (
                <div className="flex justify-center items-center">
                    <Loader />
                </div>
            ) : groupedForecast ? (
                <div className='flex justify-between text-center mt-4 max-xl:flex-wrap'>
                    {Object.entries(groupedForecast).map(([date, items]) => {
                        const firstItem = items[0];
                        return (
                            <div key={date} className="mb-4">
                                <h3 className="text-xl font-semibold">{date}</h3>
                                <div className='flex items-center'>
                                    <img
                                        src={getIconUrl(firstItem.weather[0].icon)}
                                        alt="Weather icon"
                                        className="w-10 h-10 mr-2 drop-shadow-md"
                                    />
                                    <p className="text-gray-600">{firstItem.weather[0].main}</p>
                                </div>
                                <p className="text-gray-600">{firstItem.main.temp}°C</p>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="text-gray-500">Forecast data will be displayed here...</p>
            )}
        </div>
    );
};


export default ForecastWeather;