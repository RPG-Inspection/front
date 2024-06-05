import React, { useState } from 'react';
import '../CSS/KazerosRaid.css'; // 스타일 파일을 import

const KazerosRaid = () => {
  const [activeTab, setActiveTab] = useState('kazeros1');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="tab-container">
      <div className="tab-menu">
        <button onClick={() => handleTabClick('kazeros1')} className={activeTab === 'kazeros1' ? 'active' : ''}>카제로스 1</button>
        <button onClick={() => handleTabClick('kazeros2')} className={activeTab === 'kazeros2' ? 'active' : ''}>카제로스 2</button>
        <button onClick={() => handleTabClick('kazeros3')} className={activeTab === 'kazeros3' ? 'active' : ''}>카제로스 3</button>
      </div>

      <div className="tab-content">
        
      </div>
    </div>
  );
};

const ContentKazeros1 = () => {
  return (
    <div id="content-kazeros1" className="content">
      <h2>카제로스 1 설정</h2>
      <p>카제로스 1 캐릭터 설정 화면</p>
    </div>
  );
};

const ContentKazeros2 = () => {
  return (
    <div id="content-kazeros2" className="content">
      <h2>카제로스 2 설정</h2>
      <p>카제로스 2 캐릭터 설정 화면</p>
    </div>
  );
};

const ContentKazeros3 = () => {
  return (
    <div id="content-kazeros3" className="content">
      <h2>카제로스 3 설정</h2>
      <p>카제로스 3 캐릭터 설정 화면</p>
    </div>
  );
};

export default KazerosRaid;
