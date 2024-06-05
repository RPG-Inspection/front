import React, { useState } from 'react';
import '../CSS/LegionRaid.css';
import baltanImg from '../image/baltan.jpg';
import biakisImg from '../image/biakis.jpg';
import kuxseitenImg from '../image/kuxseiten.jpg';
import avrelshudImg from '../image/avrelshud.jpg';
import ilyakanImg from '../image/ilyakan.jpg';
import kameImg from '../image/kame.jpg';

const LegionRaid = () => {
  const [activeTab, setActiveTab] = useState('baltan');
  const [selectedOptions, setSelectedOptions] = useState({
    battleLevel: [],
    characteristic: [],
    abilityStone: [],
    tripod: [],
    engraving: [],
    equipmentSetEffect: [],
    gem: [],
    card: [],
    elixir: [],
    transcendence: []
  });

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleOptionClick = (category, option) => {
    setSelectedOptions(prevState => {
      // 현재 선택된 카테고리의 옵션 배열
      const currentOptions = prevState[category];
      // 현재 클릭된 옵션이 이미 선택되어 있는지 확인
      const isSelected = currentOptions.includes(option);
      // 새로운 옵션 배열
      let newOptions = [];
  
      // 현재 클릭된 옵션이 이미 선택되어 있다면 해당 옵션을 제거하고,
      // 아니라면 새로운 배열에 추가
      if (isSelected) {
        newOptions = currentOptions.filter(item => item !== option);
      } else {
        newOptions = [option];
      }
  
      // 다른 카테고리의 옵션들은 유지하고 클릭된 옵션만 업데이트
      return { ...prevState, [category]: newOptions };
    });
  };
  
  

  const options = {
    battleLevel: ['50', '55', '60'],
    characteristic: ['2100 이상', '2200 이상', '2300 이상'],
    abilityStone: ['유물 어빌리티 스톤', '고대 어빌리티 스톤 I', '고대 어빌리티 스톤 II', '고대 어빌리티 스톤 III', '고대 어빌리티 스톤 IV'],
    tripod: ['분쇄의 주먹', '분노의 망치', '부러진 뼈'],
    engraving: ['3333', '33333', '333331', '333322', '333332'],
    equipmentSetEffect: ['1레벨', '2레벨', '3레벨'],
    gem: ['보석 1', '보석 2'],
    card: ['알고보면 18', '알고보면 30', '남바절 12', '남바절 30', '세구빛 18', '세구빛 30', '암구빛 18', '암구빛 30', '창의 달인'],
    elixir: ['엘릭서 X', '엘릭서 35', '엘릭서 40'],
    transcendence: ['초월 1', '초월 2']
  };

  const renderTabContent = (tabId) => {
    const content = {
      baltan: { title: '발탄 스펙 설정' },
      biakis: { title: '비아키스 스펙 설정' },
      kuxseiten: { title: '쿠크세이튼 스펙 설정' },
      avrelshud: { title: '아브렐슈드 스펙 설정' },
      ilyakan: { title: '일리아칸 스펙 설정' },
      kame: { title: '카멘 스펙 설정' }
    };

    const selectedContent = content[tabId];

    return (
      <div className="content active">
        <h2>{selectedContent.title}</h2>
        <div className="spec-card">
          {Object.keys(options).map(category => (
            <div key={category} className="spec-row">
              <label>{category}</label>
              <div className="checkbox-wrapper">
                {options[category].map(option => (
                  <div key={option} className="checkbox-container">
                    <input
                      type="checkbox"
                      id={`${category}-${option}`}
                      checked={selectedOptions[category].includes(option)}
                      onChange={() => handleOptionClick(category, option)}
                    />
                    <label
                      htmlFor={`${category}-${option}`}
                      className={selectedOptions[category].includes(option) ? 'selected' : ''}
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="tab-container">
      <div className="tab-menu">
        <button onClick={() => handleTabClick('baltan')} className={activeTab === 'baltan' ? 'active' : ''}>
          <img src={baltanImg} alt="발탄" />
          발탄
        </button>
        <button onClick={() => handleTabClick('biakis')} className={activeTab === 'biakis' ? 'active' : ''}>
          <img src={biakisImg} alt="비아키스" />
          비아키스
        </button>
        <button onClick={() => handleTabClick('kuxseiten')} className={activeTab === 'kuxseiten' ? 'active' : ''}>
          <img src={kuxseitenImg} alt="쿠크세이튼" />
          쿠크세이튼
        </button>
        <button onClick={() => handleTabClick('avrelshud')} className={activeTab === 'avrelshud' ? 'active' : ''}>
          <img src={avrelshudImg} alt="아브렐슈드" />
          아브렐슈드
        </button>
        <button onClick={() => handleTabClick('ilyakan')} className={activeTab === 'ilyakan' ? 'active' : ''}>
          <img src={ilyakanImg} alt="일리아칸" />
          일리아칸
        </button>
        <button onClick={() => handleTabClick('kame')} className={activeTab === 'kame' ? 'active' : ''}>
          <img src={kameImg} alt="카멘" />
          카멘
        </button>
      </div>

      <div className="tab-content">
        {renderTabContent(activeTab)}
      </div>
    </div>
  );
};

export default LegionRaid;