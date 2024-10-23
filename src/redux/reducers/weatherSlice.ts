import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeatherApiResponse } from '../@types';
import { RootState } from '../store';


interface WeatherState {
    weatherData: WeatherApiResponse | null;
    loading: boolean;
    error: string | null;
    favoriteCities: string[]
}

const initialState: WeatherState = {
    weatherData: null,
    loading: false,
    error: null,
    favoriteCities: [],
};

const weatherSlice = createSlice({
    name: 'weatherReducer',
    initialState,
    reducers: {
        getWeather: (state, _: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
            state.weatherData = null;
        },
        fetchWeatherSuccess: (state, action: PayloadAction<WeatherApiResponse>) => {
            state.loading = false;
            state.weatherData = action.payload;
        },
        fetchWeatherFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        addFavoriteCity: (state, action: PayloadAction<string>) => {
            if (!state.favoriteCities.includes(action.payload)) {
                state.favoriteCities.push(action.payload);
                localStorage.setItem('favoriteCities', JSON.stringify(state.favoriteCities));
            }
        },
        removeFavoriteCity: (state, action: PayloadAction<string>) => {
            state.favoriteCities = state.favoriteCities.filter(city => city !== action.payload);
            localStorage.setItem('favoriteCities', JSON.stringify(state.favoriteCities));
        }
    },
});

export const { getWeather, fetchWeatherSuccess, fetchWeatherFailure, addFavoriteCity, removeFavoriteCity } = weatherSlice.actions;

export const WeatherSelector = {
    getWeather: (state: RootState) => state.weather.weatherData,
    getLoading: (state: RootState) => state.weather.loading,
    getError: (state: RootState) => state.weather.error,
    getFavoriteCities: (state: RootState) => state.weather.favoriteCities
}
export default weatherSlice.reducer;