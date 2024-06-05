import React from 'react';
import '../CSS/Body.css'; // 스타일 파일을 import
import RTC from './RTC';
import Party from './Party';

const Body = () => {
  return (
    <div className="body-container">
      <div className="rtc-wrapper">
        <RTC />
      </div>
      <div className="party-wrapper">
        <Party />
      </div>
    </div>
  );
}

export default Body;
