import React from 'react';
import '../CSS/UpdateLog.css';

const UpdateLog = ({ onClose }) => {
  const logs = [
    { date: '24.06.15', content: 'AWS 서비스 등록 이후 테스트 시작' },
    { date: '24.06.20', content: '기본 동작 재테스트, 닉네임 인식 오류 수정' },
    { date: '24.06.23', content: 'OCR 인식 전처리 추가' },
    { date: '24.06.25', content: 'Guide Update!' },
    { date: '24.06.25', content: '현재 카드 스펙 부분 미적용 알림(API 오류)' },
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>업데이트 로그</h2>
        <button className="close-button" onClick={onClose}>닫기</button>
        <div className="log-entries">
          {logs.map((log, index) => (
            <div key={index} className="log-entry">
              <strong>{log.date}</strong>
              <p>{log.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpdateLog;
