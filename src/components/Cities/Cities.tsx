import React from "react";
import withRouter, { IWithRouterProps } from "../../hocs/withRouter";
import "./Cities.css";
import { Day } from "../Day";
import moment from "moment";
import { TWeatherData, TCities } from "../../types";
import { getCondition, getWeather } from "../../utils";

export interface ICitiesProps extends IWithRouterProps<{ city?: TCities }> {}

export interface ICityState {
  isLoading: boolean;
  data: TWeatherData;
  error: string;
  currentHour: number;
}

const DEFAULT_CITY: TCities = "ottawa";

class Cities extends React.Component<ICitiesProps, ICityState> {
  state = {
    isLoading: false,
    data: {} as TWeatherData,
    error: "",
    currentHour: parseInt(moment.utc().format("H"), 10),
  };

  private timer: any = null;

  get city() {
    const {
      params: { city = DEFAULT_CITY },
    } = this.props;
    return city;
  }

  updateHour = () => {
    this.setState({ currentHour: parseInt(moment.utc().format("H"), 10) });

    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.updateHour();
    }, 1000 * 60 * 60);
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidMount() {
    this.fetchWeather();

    const endOfTheHour = moment.utc().endOf("hour");
    this.timer = setTimeout(() => {
      this.updateHour();
    }, endOfTheHour.diff(moment.utc(), "milliseconds"));
  }

  componentDidUpdate(prevProps: Readonly<ICitiesProps>) {
    const prevCity = prevProps.params.city || DEFAULT_CITY;
    if (prevCity !== this.city) {
      this.fetchWeather();
    }
  }

  fetchWeather = async () => {
    this.setState({ isLoading: true, error: '' });

    try {
      const data = await getWeather(this.city);
      console.log("data in component", data)
      this.setState({ data, isLoading: false });
    } catch (e: any) {
      this.setState({ error: e.message, isLoading: false });
    }
  };

  renderData() {
    const { data, isLoading, currentHour, error } = this.state;

    if (isLoading) {
      return <div className="loading">Loading...</div>;
    }

    if (error) {
      return <div className="error">{error}</div>;
    }

    return Object.keys(data).map((dayKey) => {
      const { isToday, hourly, avgTemperature, condition } = data[dayKey];

      if (!isToday) {
        return (
          <Day
            key={dayKey}
            dayOfWeek={dayKey}
            degree={avgTemperature}
            condition={condition}
          />
        );
      }

      const { temperature, cloudCover, precipitation } = hourly[currentHour];

      return (
        <Day
          key={dayKey}
          dayOfWeek={dayKey}
          degree={temperature}
          condition={getCondition(temperature, cloudCover, precipitation)}
          today
        />
      );
    });
  }

  render() {
    return (
      <div className="city-root">
        <div className="weather-container">
          {this.renderData()}
        </div>
      </div>
    );
  }
}

export default withRouter<ICitiesProps>(Cities);
