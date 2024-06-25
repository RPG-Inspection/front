import React, { useState, useRef, useEffect } from 'react';
import adapter from 'webrtc-adapter';
import '../CSS/RTC.css';
import { captureScreen } from './OCR/CaptureScreen';
import { runOCR } from './OCR/OCR';

const RTC = ({ onTextExtracted }) => {
  const [isSharing, setIsSharing] = useState(false);
  const [error, setError] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const outputRef = useRef(null);
  const [extractedText, setExtractedText] = useState([]);
  const [canvasDimensions, setCanvasDimensions] = useState({ width: '0', maxWidth: '0', display: 'none' });

  useEffect(() => {
    if (adapter.browserDetails.browser === 'firefox') {
      adapter.browserShim.shimGetDisplayMedia(window, 'screen');
    }

    if (navigator.mediaDevices && 'getDisplayMedia' in navigator.mediaDevices) {
      document.getElementById('toggleButton').disabled = false;
    } else {
      setError('getDisplayMedia is not supported');
    }
  }, []);

  const handleSuccess = (stream) => {
    setIsSharing(true);
    videoRef.current.srcObject = stream;

    stream.getVideoTracks()[0].addEventListener('ended', () => {
      setError('The user has ended sharing the screen');
      setIsSharing(false);
    });
  };

  const handleError = (error) => {
    setError(`getDisplayMedia error: ${error.name}`);
    console.error(error);
  };

  const startSharing = () => {
    const options = { audio: false, video: true };

    navigator.mediaDevices.getDisplayMedia(options)
      .then(handleSuccess)
      .catch(handleError);
  };

  const stopSharing = () => {
    if (videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsSharing(false);
  };

  const toggleSharing = () => {
    if (isSharing) {
      stopSharing();
    } else {
      startSharing();
    }
  };

  const captureAndExtract = async () => {
    captureScreen(videoRef, canvasRef, setCanvasDimensions);
    const result = await runOCR(canvasRef, outputRef);
    setExtractedText(result);
    if (onTextExtracted) {
      onTextExtracted(result);
    }
  };

  return (
    <div className="rtc-container">
      <div className="top-buttons">
        <button id="toggleButton" onClick={toggleSharing}>
          {isSharing ? '공유 중지' : '공유 시작'}
        </button>
        <button className="capture-and-extract-button" onClick={captureAndExtract}>캡처 및 닉네임 추출</button>
      </div>
      <div className="video-container">
        <video ref={videoRef} autoPlay playsInline className="rtc-video"></video>
        <canvas
          ref={canvasRef}
          className="selection-canvas"
          style={canvasDimensions}
        ></canvas>
      </div>
      
      {/* 인식완료시 "텍스트 인식 완료" 출력 */}
      <div ref={outputRef} id="outputText" className="output-text"></div>
      {/* 닉네임 출력 */}
      <div className="extracted-text-container"> 
        {extractedText.map((text, index) => ( 
          <p key={index}>{text}</p>
        ))}
      </div>

      {error && <div id="errorMsg">{error}</div>}
    </div>
  );
};

export default RTC;
