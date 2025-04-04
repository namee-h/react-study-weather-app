import React from 'react'
import { Button } from 'react-bootstrap';



const WeatherButton = ({cities,setCity}) => {
  return (
    <div className='button-area'>
        <Button onClick={()=>{
            setCity("")
        }} variant="light">Current Location</Button>
       
       {cities.map((item,index)=>
        <Button variant='light' key={index} onClick={()=>{
            setCity(item)
        }}>{item}</Button>
       )}
    </div>
  )
}

export default WeatherButton
