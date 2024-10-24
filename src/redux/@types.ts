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

interface ForecastWeatherData {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
}

export interface ForecastApiResponse {
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
  cnt: number;
  cod: string;
  list: ForecastWeatherData[];
}