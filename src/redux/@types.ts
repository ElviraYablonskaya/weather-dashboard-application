export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeather {
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
  grnd_level?: number;
  sea_level?: number;
}


export interface Wind {
  speed: number;
  deg: number;
  gust?: number;
}

export interface Coord {
  lat: number;
  lon: number;
}

export interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherApiResponse {
  id: number;
  name: string;
  coord: Coord;
  timezone: number;
  dt: number;
  main: MainWeather;
  wind: Wind;
  clouds: { all: number };
  visibility: number;
  weather: Weather[];
  base: string;
  sys: Sys;
}