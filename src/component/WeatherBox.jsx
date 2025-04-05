import React from "react";

const WeatherBox = ({weather,loading}) => {
  
  // console.log("weather?",weather)  
  return <div className="weather-box">
    <div className={`weather-box-info ${loading?"hidden":""}`}>
      <div className="location-name">{weather?.location.name}</div>
      <div>{weather?.current.temp_c} ℃</div>
      <div>{weather?.current.temp_f} ℉</div>
      <div className="weather-conditions">
        <img src={weather?.current.condition.icon}/>
        <div>{weather?.current.condition.text}</div>
      </div>
    </div>
  </div>;
};

export default WeatherBox;
