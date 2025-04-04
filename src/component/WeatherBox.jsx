import React from "react";

const WeatherBox = ({weather}) => {
  console.log("weather?",weather)
  return <div className="weather-box">
    <div>{weather?.location.name}</div>
    <div>{weather?.current.temp_c} ℃</div>
    <div>{weather?.current.temp_f} ℉</div>
    <img src={weather.current.condition.icon}/>
    <div>{weather?.current.condition.text}</div>
  </div>;
};

export default WeatherBox;
