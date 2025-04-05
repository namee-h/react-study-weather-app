import { useEffect, useState, useRef } from 'react'
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
  const [cities, setCities] = useState(["paris","new york","tokyo","seoul","Hanoi"]);
  const searchInputRef = useRef(null);
  let url = new URL(`https://api.weatherapi.com/v1/`)

  useEffect(() => {
    const savedCities = localStorage.getItem("cities");
    if (savedCities) {
      setCities(JSON.parse(savedCities));
    }
    localStorage.clear()
  }, []);

  useEffect(()=>{
    city===""? getCurrentLocation():getWeatherByCity()
  },[city])

  useEffect(() => {
    
  }, [cities]);

  // 현재위치 위도 경도 받아오기
  const getCurrentLocation=()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = Math.floor(position.coords.latitude*10000)/10000
      let lon = Math.floor(position.coords.longitude*10000)/10000
      // console.log(lat,lon)
      getWeatherByCurrentLocation(lat,lon)
    })
  }
  const getWeatherData = async (url) => {
    try {
      setLoading(true);
      const res = await fetch(url);
      // 응답이 정상적인지 체크 (res.ok가 false이면 에러 발생)
      if (!res.ok) {
        throw new Error(`네트워크 응답 오류: ${res.status}`);
      }
      const data = await res.json();
      setWeather(data);
    } catch (error) {
      console.error("날씨 데이터를 가져오는 중 오류 발생:", error);
      // 에러 메시지를 상태에 저장하거나 사용자에게 알리는 로직 추가 가능
    } finally {
      setLoading(false);
    }
  };
  const getWeatherByCurrentLocation=async(lat,lon)=>{
    url = new URL(`https://api.weatherapi.com/v1/current.json?q=${lat},${lon}&lang=ko&key=${VITE_API_KEY}`)
    getWeatherData(url);
  }

  const getWeatherByCity=async()=>{
    console.log("ccc",city)
    url = new URL(`https://api.weatherapi.com/v1/current.json?q=${city}&lang=ko&key=${VITE_API_KEY}`)
    getWeatherData(url);
  }

  const handleCitySearch = async () => {
    const query = searchInputRef.current.value;
    if (!query) 
      alert("검색하고 싶은 도시명을 입력해주세요")
      return;
    setLoading(true)
    const searchUrl = `https://api.weatherapi.com/v1/search.json?key=${VITE_API_KEY}&q=${query}`;
    try {
      const res = await fetch(searchUrl);
      if (!res.ok) throw new Error("네트워크 응답 오류");
      const data = await res.json();
      console.log("검색 결과:", data);
      if (data.length === 0) {
        alert("해당하는 도시 정보가 없습니다.");
        return;
      }
      const newCities = data.map(item => item.name);
      const combinedCities = Array.from(new Set([...cities, ...newCities]));
      setCities(combinedCities);
      if (newCities.length > 0) {
        setCity(newCities[0]);
      }
    } catch (error) {
      console.error("도시 검색 오류:", error);
    } finally{
      setLoading(false)
    }
  };

  

  return (
    <>
    <div className='container'>
      <Loading loading={loading} />
      <WeatherBox weather={weather} loading={loading}/>
      <div className="search-area">
      <input 
          type="text"
          placeholder="도시 검색"
          ref={searchInputRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault(); // 기본 폼 제출 막기
              handleCitySearch();
            }
          }}
        />
        <button onClick={handleCitySearch}>🔍</button>
      </div>
      <WeatherButton cities={cities} setCity={setCity}/>
    </div>
    </>
  )
}

export default App
