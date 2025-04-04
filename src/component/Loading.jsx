import React from 'react'
import spinner from "../assets/Spinner.gif"

const Loading = ({loading}) => {

  return (
    <div className={`loading-area ${loading? "": "display-none"}`}>
        <div>잠시만 기다려주세요</div>
        <img src={spinner} alt="로딩"/>
    </div>

    
  )
}

export default Loading
