import { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox'
import WeatherButton from './component/WeatherButton';
import Loading from './component/Loading';
const VITE_API_KEY = import.meta.env.VITE_API_KEY

// 1. 앱이 실행되자마자 현재 위치 날씨가 보인다
// 2. 날씨 정보에는 도시, 섭씨, 화씨, 날씨상태정보가 들어간다.
// 3. 아래에는 5개의 버튼이 있다.
// 4. 1개는 현재위치 4개는 다른 도시
// 5. 버튼을 누르면 다른 도시의 정보를 볼수 있고 커런트버튼을 누르면 다시 현재위치 기반으로 돌아온다
// 6. 버튼을 클릭해서 데이터가 로딩되는 중간에 로딩스피너가 존재한다.
// 7. 날씨 상태에 따라 날씨정보가 표시되는 박스의 이미지가 달라진다.(해보자굿)

function App() {
  const [weather,setWeather] =useState(null)
  const [city,setCity]=useState("")
  const [loading,setLoading]=useState(false)
  const cities =[
    "paris","new york","tokyo","seoul"
  ]
  // 현재위치 위도 경도 받아오기
  const getCurrentLocation=()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = Math.floor(position.coords.latitude*10000)/10000
      let lon = Math.floor(position.coords.longitude*10000)/10000
      // console.log(lat,lon)
      getWeatherByCurrentLocation(lat,lon)
    })
  }
  
  const getWeatherByCurrentLocation=async(lat,lon)=>{
    let url = new URL(`https://api.weatherapi.com/v1/current.json?q=${lat},${lon}&lang=ko&key=${VITE_API_KEY}`)
    setLoading(true)
    let res = await fetch(url)
    let data = await res.json()
    setWeather(data)
    setLoading(false)
  }

  const getWeatherByCity=async()=>{
    let url = new URL(`https://api.weatherapi.com/v1/current.json?q=${city}&lang=ko&key=${VITE_API_KEY}`)
    setLoading(true)
    let res = await fetch(url)
    let data = await res.json();
    setWeather(data)
    setLoading(false)
  }
  useEffect(()=>{
    city===""? getCurrentLocation():getWeatherByCity()
   
  },[city])
  

  return (
    <>
    <div className='container'>
      <Loading loading={loading} />
      <WeatherBox weather={weather} loading={loading}/>
      <WeatherButton cities={cities} setCity={setCity}/>
    </div>
    </>
  )
}

export default App
