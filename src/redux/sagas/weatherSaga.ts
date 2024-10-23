import { call, put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { getWeather, fetchWeatherSuccess, fetchWeatherFailure } from '../reducers/weatherSlice';
import { WeatherApiResponse } from '../@types';

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

// Вотчер-сага (отслеживает действия getWeatherWorker)
function* weatherSaga() {
    yield takeLatest(getWeather, getWeatherWorker);
}

export default weatherSaga;