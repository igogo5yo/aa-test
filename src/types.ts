export type TCities = 'ottawa' | 'moscow' | 'tokyo';
export type TWeatherCondition = 'sun' | 'cloud' | 'rain' | 'snow';

export interface ICoordinates {
  lat: number;
  lng: number;
}

export interface ICloudData {
  hours: {
    airTemperature: {
      noaa: number;
    };
    cloudCover: {
      noaa: number;
    };
    precipitation: {
      noaa: number;
    };
    time: string;
  }[];
  meta: any;
}

export type TWeatherData = Record<string, {
  avgTemperature: number;
  condition: TWeatherCondition;
  isToday: boolean;
  hourly: {
    temperature: number;
    cloudCover: number;
    precipitation: number;
  }[];
}>


