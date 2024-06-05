import React, { useState } from 'react';
import '../CSS/EpicRaid.css'; // 스타일 파일을 import

const EpicRaid = () => {
  const [activeTab, setActiveTab] = useState('epic1');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="tab-container">
      <div className="tab-menu">
        <button onClick={() => handleTabClick('epic1')} className={activeTab === 'epic1' ? 'active' : ''}>에픽 1</button>
        <button onClick={() => handleTabClick('epic2')} className={activeTab === 'epic2' ? 'active' : ''}>에픽 2</button>
        <button onClick={() => handleTabClick('epic3')} className={activeTab === 'epic3' ? 'active' : ''}>에픽 3</button>
      </div>

      <div className="tab-content">
        
      </div>
    </div>
  );
};

const ContentEpic1 = () => {
  return (
    <div id="content-epic1" className="content">
      <h2>에픽 1 설정</h2>
      <p>에픽 1 캐릭터 설정 화면</p>
    </div>
  );
};

const ContentEpic2 = () => {
  return (
    <div id="content-epic2" className="content">
      <h2>에픽 2 설정</h2>
      <p>에픽 2 캐릭터 설정 화면</p>
    </div>
  );
};

const ContentEpic3 = () => {
  return (
    <div id="content-epic3" className="content">
      <h2>에픽 3 설정</h2>
      <p>에픽 3 캐릭터 설정 화면</p>
    </div>
  );
};

export default EpicRaid;
