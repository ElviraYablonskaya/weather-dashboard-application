import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeatherApiResponse } from '../@types';
import { RootState } from '../store';


interface WeatherState {
    weatherData: WeatherApiResponse | null;
    loading: boolean;
    error: string | null;
}

const initialState: WeatherState = {
    weatherData: null,
    loading: false,
    error: null,
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
    },
});

export const { getWeather, fetchWeatherSuccess, fetchWeatherFailure } = weatherSlice.actions;

export const WeatherSelector = {
    getWeather: (state: RootState) => state.weather.weatherData,
    getLoading:(state: RootState) => state.weather.loading,
    getError:(state:RootState) => state.weather.error
    
}
export default weatherSlice.reducer;