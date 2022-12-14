import { ICoordinates, TCities, TWeatherCondition } from "./types";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faCloud } from '@fortawesome/free-solid-svg-icons/faCloud';
import { faSun } from '@fortawesome/free-solid-svg-icons/faSun';
import { faCloudRain } from '@fortawesome/free-solid-svg-icons/faCloudRain';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons/faSnowflake';

export const API_KEYS = [
  'a50d45ca-774f-11ed-b59d-0242ac130002-a50d4624-774f-11ed-b59d-0242ac130002',
  '01fdecd4-77f1-11ed-a138-0242ac130002-01fdedb0-77f1-11ed-a138-0242ac130002',
  '34a82f18-77fc-11ed-b59d-0242ac130002-34a82f86-77fc-11ed-b59d-0242ac130002',
  'aa156dc2-77fe-11ed-bc36-0242ac130002-aa156e3a-77fe-11ed-bc36-0242ac130002',
  'c35806e6-77fe-11ed-bce5-0242ac130002-c3580786-77fe-11ed-bce5-0242ac130002'
];

export const cities: Record<TCities, ICoordinates> = {
  ottawa: {
    lat: 45.421532,
    lng: -75.697189
  },
  moscow: {
    lat: 55.755825,
    lng: 37.617298
  },
  tokyo: {
    lat: 35.689487,
    lng: 139.691711
  },
};

export const weatherConditionIcons: Record<TWeatherCondition, IconDefinition> = {
  cloud: faCloud,
  sun: faSun,
  snow: faSnowflake,
  rain: faCloudRain,
};


export const weatherConditionNames: Record<TWeatherCondition, string> = {
  cloud: 'Cloudy',
  sun: 'Sunny',
  snow: 'Snow',
  rain: 'Rain',
};

