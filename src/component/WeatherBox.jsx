import React from "react";

const WeatherBox = ({weather,loading}) => {
  
  console.log("weather?",weather)  
  return <div className="weather-box">
    <div className={`weather-box-info ${loading?"hidden":""}`}>
      <h4>{weather?.location.name}</h4>
      <h2>{weather?.current.temp_c} <span>℃</span> / {weather?.current.temp_f} <span>℉</span></h2>
      <div className="weather-conditions">
        <img src={weather?.current.condition.icon}/>
        <div>{weather?.current.condition.text}</div>
      </div>
      <div className="wind-area">
        <div>
          <div>풍속</div>
          <h3>{weather?.current.wind_kph}<span> kph</span></h3>
        </div>
        <div>
          <div>강수량</div>
          <h3>{weather?.current.precip_mm}<span> mm</span></h3>
        </div>
        <div>
          <div>습도</div>
          <h3>{weather?.current.wind_kph}<span> %</span></h3>
        </div>
      </div>
    </div>
  </div>;
};

export default WeatherBox;
