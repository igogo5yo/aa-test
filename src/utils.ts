import moment from "moment";
import { API_KEY, cities } from "./constants";
import { TWeatherData, TCities, ICloudData, TWeatherCondition } from "./types";

const createUrl = (cityName: TCities) => {
  const city = cities[cityName];
  const end = moment.utc().add(4, "days").endOf("day").format();

  return `https://api.stormglass.io/v2/weather/point?lat=${city.lat}&lng=${city.lng}&params=airTemperature,precipitation,cloudCover&source=noaa&end=${end}`;
};

export const getCondition = (
  temp: number,
  cloudCoverage: number,
  precipitation: number
): TWeatherCondition => {
  switch (true) {
    case temp <= 0 && precipitation > 0:
      return "snow";
    case temp > 0 && precipitation > 0:
      return "rain";
    case cloudCoverage > 0:
      return "cloud";
    default:
      return "sun";
  }
};

const normalizeData = (data: ICloudData): TWeatherData => {
  const res: TWeatherData = {};

  (data.hours || []).forEach((hour, idx) => {
    const day = moment.utc(hour.time).format("ddd");
    if (!res[day]) {
      res[day] = {
        avgTemperature: 0,
        condition: "sun",
        hourly: new Array(24).fill({
          temperature: 0,
          cloudCover: 0,
          precipitation: 0,
        }),
        isToday: idx === 0,
      };
    }

    const h = moment.utc(hour.time).format("H");
    res[day].hourly[parseInt(h, 10)] = {
      temperature: Math.floor(hour.airTemperature.noaa),
      cloudCover: hour.cloudCover.noaa,
      precipitation: hour.precipitation.noaa,
    };
  });

  Object.keys(res).forEach((key) => {
    const [temp, cloud, prec] = res[key].hourly.reduce(
      (sum, h) => [
        sum[0] + h.temperature,
        sum[1] + h.cloudCover,
        sum[2] + h.precipitation,
      ],
      [0, 0, 0]
    );

    res[key].avgTemperature = Math.floor(temp / 24);
    res[key].condition = getCondition(temp, cloud, prec);
  });

  return res;
};
export const getWeather = async (cityName: TCities): Promise<TWeatherData> => {
  const url = createUrl(cityName);
  console.log('CALL:', url);

  // cache added because of API calls are limited by 10 calls per day.
  const cached = localStorage.getItem(url);
  if (cached) {
    console.log('CACHED', cached);
    return JSON.parse(cached);
  }

  const res = await fetch(url, {
    headers: {
      'Authorization': API_KEY
    }
  });

  const data = await res.json();
  if (data.errors) {
    throw new Error(data.errors.key);
  }

  const normalized = normalizeData(data);
  localStorage.setItem(url, JSON.stringify(normalized));
  console.log('FETCHED', normalized);

  return normalized;
};
