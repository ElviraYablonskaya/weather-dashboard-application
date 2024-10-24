import { useDispatch, useSelector } from 'react-redux';
import { WeatherSelector, removeFavoriteCity } from '../../redux/reducers/weatherSlice';

const FavoriteCities: React.FC = () => {
    const dispatch = useDispatch();
    const favoriteCities = useSelector(WeatherSelector.getFavoriteCities);

    const handleRemoveFavorite = (city: string) => {
        dispatch(removeFavoriteCity(city));
    };

    return (
        <div className="mt-10 w-full max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Favorite Cities</h2>
            {favoriteCities.length === 0 ? (
                <p className="text-gray-500">Choose your favorite cities</p>
            ) : (
                <ul className="grid grid-cols-1 gap-4">
                    {favoriteCities.map((city) => (
                        <li key={city} className="bg-white rounded-lg p-4 flex justify-between items-center border">
                            <span className="text-lg text-gray-800">{city}</span>
                            <button
                                onClick={() => handleRemoveFavorite(city)}
                                className="text-red-500 hover:text-red-700 transition"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FavoriteCities;