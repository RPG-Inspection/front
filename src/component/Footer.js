import React, { useState, useEffect } from 'react';
import '../CSS/Footer.css';

import LegionRaid from './LegionRaid';
import AbyssRaid from './AbyssRaid';
import KazerosRaid from './KazerosRaid';
import EpicRaid from './EpicRaid';

const Footer = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedRaidType, setSelectedRaidType] = useState("Legion");
  const [userSpec, setUserSpec] = useState(null); // 사용자 스펙 상태 추가

  useEffect(() => {
    // 로컬 스토리지에서 사용자 스펙 가져오기
    const userSpecFromLocalStorage = localStorage.getItem('userSpec');
    if (userSpecFromLocalStorage) {
      setUserSpec(JSON.parse(userSpecFromLocalStorage));
    }
  }, []);

  const toggleSize = () => {
    setExpanded(!expanded);
  };

  const handleRadioChange = (event) => {
    setSelectedRaidType(event.target.value);
  };

  const renderRaidContent = () => {
    switch(selectedRaidType) {
      case 'Legion':
        return <LegionRaid userSpec={userSpec} />;
      case 'Abyss':
        return <AbyssRaid userSpec={userSpec} />;
      case 'Kazeros':
        return <KazerosRaid userSpec={userSpec} />;
      case 'Epic':
        return <EpicRaid userSpec={userSpec} />;
      default:
        return null;
    }
  };

  const footerClass = expanded ? "footer-expanded" : "footer-normal";
  const icon = expanded ? "∨" : "∧";

  return (
    <footer className={footerClass}>
      <p className="RaidSettingsName">레이드 설정</p>
      <button className="toggle-button" onClick={toggleSize}>
        <span className="icon">{icon}</span>
      </button>
      <div className="Raid-button-group">
        <div className="select">
          <input type="radio" id="LegionRaid" name="RaidSetting" value="Legion" onChange={handleRadioChange} checked={selectedRaidType === 'Legion'} />
          <label htmlFor="LegionRaid">군단장 레이드</label>
          <input type="radio" id="AbyssRaid" name="RaidSetting" value="Abyss" onChange={handleRadioChange} checked={selectedRaidType === 'Abyss'} />
          <label htmlFor="AbyssRaid">어비스 레이드</label>
          <input type="radio" id="KazerosRaid" name="RaidSetting" value="Kazeros" onChange={handleRadioChange} checked={selectedRaidType === 'Kazeros'} />
          <label htmlFor="KazerosRaid">카제로스 레이드</label>
          <input type="radio" id="EpicRaid" name="RaidSetting" value="Epic" onChange={handleRadioChange} checked={selectedRaidType === 'Epic'} />
          <label htmlFor="EpicRaid">에픽<br/>레이드</label>
        </div>
      </div>
      {renderRaidContent()}
    </footer>
  );
};

export default Footer;
