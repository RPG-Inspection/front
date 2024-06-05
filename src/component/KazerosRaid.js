import React, { useState } from 'react';
import '../CSS/LegionRaid.css';
import ekiImg from '../image/baltan.jpg';

const KazerosRaid = () => {
  const [activeTab, setActiveTab] = useState('eki');
  const [selectedOptions, setSelectedOptions] = useState({
    battleLevel: [],
    characteristic: [],
    abilityStone: [],
    skillPoint: [],
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
      const currentOptions = prevState[category];
      const isSelected = currentOptions.includes(option);
      let newOptions = [];

      if (isSelected) {
        newOptions = currentOptions.filter(item => item !== option);
      } else {
        newOptions = [option];
      }

      return { ...prevState, [category]: newOptions };
    });
  };

  const options = {
    battleLevel: ['50', '55', '60'],
    characteristic: ['2100 이상', '2200 이상', '2300 이상'],
    abilityStone: ['유물', '고대 I', '고대 II', '고대 III', '고대 IV'],
    skillPoint: ['390', '400', '410', '420'],
    engraving: ['3333', '33333', '333331', '333332'],
    equipmentSetEffect: ['1레벨', '2레벨', '3레벨'],
    gem: ['5', '7', '9', '10'],
    card: ['알고보면 12', '알고보면 18', '알고보면 30', '남바절 12', '세구빛 12', '세구빛 18', '세구빛 30', '암구빛 12', '암구빛 18', '암구빛 30'],
    elixir: ['엘릭서0', '엘릭서 35', '엘릭서 40'],
    transcendence: ['초월 x', '초월 25', '초월 50', '초월 75', '초월 100', '초월 125']
  };

  const renderTabContent = (tabId) => {
    const content = {
      eki: { title: '에키드나 스펙 설정' }
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
        <button onClick={() => handleTabClick('eki')} className={activeTab === 'eki' ? 'active' : ''}>
          <img src={ekiImg} alt="에키드나" />
          에키드나
        </button>
      </div>

      <div className="tab-content">
        {renderTabContent(activeTab)}
      </div>
    </div>
  );
};
export default KazerosRaid;
