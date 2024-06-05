import React, { useState } from 'react';
import '../CSS/AbyssRaid.css'; // 스타일 파일을 import

const AbyssRaid = () => {
  const [activeTab, setActiveTab] = useState('abyss1');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="tab-container">
      <div className="tab-menu">
        <button onClick={() => handleTabClick('abyss1')} className={activeTab === 'abyss1' ? 'active' : ''}>어비스 1</button>
        <button onClick={() => handleTabClick('abyss2')} className={activeTab === 'abyss2' ? 'active' : ''}>어비스 2</button>
        <button onClick={() => handleTabClick('abyss3')} className={activeTab === 'abyss3' ? 'active' : ''}>어비스 3</button>
      </div>

      <div className="tab-content">
      
      </div>
    </div>
  );
};

const ContentAbyss1 = () => {
  return (
    <div id="content-abyss1" className="content">
      <h2>어비스 1 설정</h2>
      <p>어비스 1 캐릭터 설정 화면</p>
    </div>
  );
};

const ContentAbyss2 = () => {
  return (
    <div id="content-abyss2" className="content">
      <h2>어비스 2 설정</h2>
      <p>어비스 2 캐릭터 설정 화면</p>
    </div>
  );
};

const ContentAbyss3 = () => {
  return (
    <div id="content-abyss3" className="content">
      <h2>어비스 3 설정</h2>
      <p>어비스 3 캐릭터 설정 화면</p>
    </div>
  );
};

export default AbyssRaid;
