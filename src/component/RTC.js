import React, { useState, useRef, useEffect } from 'react';
import adapter from 'webrtc-adapter'; // webrtc-adapter를 import 합니다.
import '../CSS/RTC.css'; // 스타일 파일을 import 합니다.

const RTC = () => {
  const [isSharing, setIsSharing] = useState(false);
  const [error, setError] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selection, setSelection] = useState({ startX: 0, startY: 0, width: 0, height: 0 });

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
    const options = { audio: true, video: true }; // 기본 화면 공유 옵션

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

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    setIsDragging(true);
    setSelection({ startX: e.clientX - rect.left, startY: e.clientY - rect.top, width: 0, height: 0 });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const rect = canvasRef.current.getBoundingClientRect();
      const width = e.clientX - rect.left - selection.startX;
      const height = e.clientY - rect.top - selection.startY;
      setSelection({ ...selection, width, height });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (selection.width && selection.height) {
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.strokeRect(selection.startX, selection.startY, selection.width, selection.height);
    }
  }, [selection]);

  return (
    <div className="rtc-container">
      <div className="top-buttons">
        <button id="toggleButton" onClick={toggleSharing}>
          {isSharing ? '캡처 중지' : '캡처 시작'}
        </button>
        <button className="adjust-position-button">위치 조정</button>
        <button className="settings-button">설정</button>
        <button className="performance-button">성능표</button>
      </div>  
      <div className="video-container">
        <video ref={videoRef} autoPlay playsInline className="rtc-video"></video>
        <canvas
          ref={canvasRef}
          className="selection-canvas"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        ></canvas>
      </div>

      {error && <div id="errorMsg">{error}</div>}
    </div>
  );
};

export default RTC;
