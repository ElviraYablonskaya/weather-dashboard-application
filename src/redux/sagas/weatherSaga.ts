import { all, takeLatest, call, put } from "redux-saga/effects";
import axios, { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { getWeather, fetchWeatherSuccess, fetchWeatherFailure, getForecast, fetchFiveDayForecastSuccess, fetchFiveDayForecastFailure } from '../reducers/weatherSlice';
import { ForecastApiResponse, WeatherApiResponse } from '../@types';

const API_KEY = 'fac5c17d940d499f46f12ef24305fc11';

// Функция для запроса данных о погоде
function fetchWeatherFromAPI(city: string): Promise<AxiosResponse<WeatherApiResponse>> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    return axios.get<WeatherApiResponse>(url);
}

// Сага для выполнения запроса к API
function* getWeatherWorker(action: PayloadAction<string>) {
    try {
        const response: AxiosResponse<WeatherApiResponse> = yield call(fetchWeatherFromAPI, action.payload);
        yield put(fetchWeatherSuccess(response.data));
    } catch (error: any) {
        yield put(fetchWeatherFailure((error.response?.data?.message || 'Failed to fetch weather data')));
    }
}

// Функция для запроса данных о 5-дневном прогнозе погоды
function fetchFiveDayForecastFromAPI(city: string): Promise<AxiosResponse<ForecastApiResponse>> {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    return axios.get<ForecastApiResponse>(url);
}

// Сага для получения прогноза
function* getFiveDayForecastWorker(action: PayloadAction<string>) {
    try {
        const response: AxiosResponse<ForecastApiResponse> = yield call(fetchFiveDayForecastFromAPI, action.payload);
        yield put(fetchFiveDayForecastSuccess(response.data));
    } catch (error: any) {
        yield put(fetchFiveDayForecastFailure((error.response?.data?.message || 'Failed to fetch 5-day weather forecast')));
    }
}

// Вотчер-сага
function* weatherSaga() {
    yield all([
        takeLatest(getWeather, getWeatherWorker),
        takeLatest(getForecast, getFiveDayForecastWorker),
    ]);
}

export default weatherSaga;