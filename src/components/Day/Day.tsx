import React from "react";
import "./Day.css";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { weatherConditionIcons, weatherConditionNames } from "../../constants";
import { TWeatherCondition } from "../../types";

export interface IDayProps {
  degree: number;
  condition: TWeatherCondition;
  dayOfWeek: string;
  today?: boolean;
}
const Day: React.FC<IDayProps> = ({ today = false, dayOfWeek, degree, condition }) => (
  <div className={classNames("day", { today })}>
    <div className="name">{today ? 'Today' : dayOfWeek}</div>
    <div className="info">
      <div className="icon">
        <FontAwesomeIcon size={today ? '8x' : '4x'} icon={weatherConditionIcons[condition]} />
      </div>
      <div className="weather">
        <div className="degree">{degree}&#176;</div>
        {today && <div className="weather-condition">{weatherConditionNames[condition]}</div>}
      </div>
    </div>
  </div>
);

export default Day;
