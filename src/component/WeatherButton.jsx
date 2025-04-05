import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const WeatherButton = ({ cities, setCity }) => {
  const [arrowPosition, setArrowPosition] = useState({ x: 0, y: 0 });
  const [showArrow, setShowArrow] = useState(false);

  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    setArrowPosition({ x: offsetX, y: offsetY });
  };

  return (
    <div>
      <div 
        className="button-area"
        style={{ position: 'relative' }} // 이 부분은 여전히 inline으로 주어야 전체 영역이 relative가 됩니다.
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setShowArrow(true)}
        onMouseLeave={() => setShowArrow(false)}
      >
        {showArrow && (
          <span 
            className="arrow-follow"
            style={{
              '--arrow-left': arrowPosition.x + 10 + 'px',
              '--arrow-top': arrowPosition.y + 'px'
            }}
          >
            ➡️
          </span>
        )}
        <Button onClick={() => setCity("")} variant="light">
          Current Location
        </Button>
        {cities.slice().reverse().map((item, index) => (
          <Button variant="light" key={index} onClick={() => setCity(item)}>
            {item}
          </Button>
        ))}
      </div>
      <label className="scroll-label">
        옆으로 스크롤 가능합니다
      </label>
    </div>
  );
};

export default WeatherButton;
