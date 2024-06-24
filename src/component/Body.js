import React, { useState, useEffect } from 'react';
import '../CSS/Body.css';
import RTC from './RTC';
import Party from './Party';
import { initializeLocalStorage } from './initializeLocalStorage';

const Body = ({ selectedOptions, apiMode }) => {
  const [capturedNicknames, setCapturedNicknames] = useState([]);

  const handleTextExtracted = (text) => {
    setCapturedNicknames(text);
  };

  useEffect(() => {
    initializeLocalStorage();
  }, []);

  return (
    <div className="body-container">
      <div className="rtc-wrapper">
        <RTC onTextExtracted={handleTextExtracted} />
      </div>
      <div className="party-wrapper">
        <Party selectedOptions={selectedOptions} apiMode={apiMode} capturedNicknames={capturedNicknames} />
      </div>
    </div>
  );
};

export default Body;
