import React, { useState, useEffect } from 'react';
import '../CSS/Raid.css';
import kayangelImg from '../image/baltan.jpg';
import ivoryTowerImg from '../image/biakis.jpg';

const AbyssRaid = () => {
  const [activeTab, setActiveTab] = useState('kayangel');
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

    // 로컬 스토리지에서 사용자 설정값을 불러와서 설정 상태를 업데이트하는 함수
    const loadOptionsFromLocalStorage = () => {
      const storedOptions = localStorage.getItem('epicRaidOptions');
      if (storedOptions) {
        setSelectedOptions(JSON.parse(storedOptions));
      }
    };
  
    // 추가된 useEffect 훅: 로컬 스토리지에서 사용자 설정값을 불러와서 설정 상태를 업데이트
  useEffect(() => {
    loadOptionsFromLocalStorage();
  }, []);
  const [radioValue, setRadioValue] = useState('default');
  
  useEffect(() => {
    // 초기 렌더링 시에 선택된 탭에 따라 기본 설정 적용
    handleRadioChange({ target: { value: radioValue } });
  }, [activeTab]); // activeTab 값이 변경될 때마다 호출

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleOptionClick = (category, option) => {
    if (radioValue === 'default') return;
  
    setSelectedOptions(prevState => {
      const currentOptions = prevState[category];
      const isSelected = currentOptions.includes(option);
      let newOptions = [];
  
      if (isSelected) {
        // 이미 선택된 옵션이면 해당 옵션을 제거
        newOptions = currentOptions.filter(item => item !== option);
      } else {
        // 선택되지 않은 옵션이면 해당 옵션을 추가
        newOptions = [...currentOptions, option];
      }
  
      return { ...prevState, [category]: newOptions };
    });
  };
  

  const handleRadioChange = (event) => {
    const value = event.target.value;
    setRadioValue(value);
    const defaultOptions = {};

    Object.keys(options).forEach(category => {
      // 카양겔의 기본 설정값
      if (activeTab === 'kayangel') {
        switch (category) {
          case 'battleLevel':
            defaultOptions[category] = ['50'];
            break;
          case 'characteristic':
            defaultOptions[category] = ['2100 이상'];
            break;
          case 'abilityStone':
            defaultOptions[category] = ['유물'];
            break;
          case 'skillPoint':
            defaultOptions[category] = ['400'];
            break;
          case 'engraving':
            defaultOptions[category] = ['33333'];
            break;
          case 'equipmentSetEffect':
            defaultOptions[category] = ['1레벨'];
            break;
          case 'gem':
            defaultOptions[category] = ['5'];
            break;
          case 'card':
            defaultOptions[category] = ['알고보면 18'];
            break;
          case 'elixir':
            defaultOptions[category] = ['엘릭서 0'];
            break;
          case 'transcendence':
            defaultOptions[category] = ['초월 x'];
            break;
          default:
            defaultOptions[category] = [options[category][0]];
            break;
        }
      } else if (activeTab === 'ivoryTower') { // 상아탑의 기본 설정값
        switch (category) {
          case 'battleLevel':
            defaultOptions[category] = ['60'];
            break;
          case 'characteristic':
            defaultOptions[category] = ['2300 이상'];
            break;
          case 'abilityStone':
            defaultOptions[category] = ['고대 IV'];
            break;
          case 'skillPoint':
            defaultOptions[category] = ['420'];
            break;
          case 'engraving':
            defaultOptions[category] = ['333331'];
            break;
          case 'equipmentSetEffect':
            defaultOptions[category] = ['3레벨'];
            break;
          case 'gem':
            defaultOptions[category] = ['9'];
            break;
          case 'card':
            defaultOptions[category] = ['세구빛 30'];
            break;
          case 'elixir':
            defaultOptions[category] = ['엘릭서 0'];
            break;
          case 'transcendence':
            defaultOptions[category] = ['초월 x'];
            break;
          default:
            defaultOptions[category] = [options[category][0]];
            break;
        }
      } else {
        defaultOptions[category] = [options[category][0]]; // 그 외의 경우 기본값 설정
      }
    });
    setSelectedOptions(defaultOptions);
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
      kayangel: { title: '카양겔 스펙 설정' },
      ivoryTower: { title: '상아탑 스펙 설정' }
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
        <button onClick={() => handleTabClick('kayangel')} className={activeTab === 'kayangel' ? 'active' : ''}>
          <img src={kayangelImg} alt="카양겔" />
          카양겔
        </button>
        <button onClick={() => handleTabClick('ivoryTower')} className={activeTab === 'ivoryTower' ? 'active' : ''}>
          <img src={ivoryTowerImg} alt="상아탑" />
          상아탑
        </button>
      </div>

      <div className="tab-content">
        <input type='radio' id='default' name='difficult' value='default' onChange={handleRadioChange} checked={radioValue === 'default'} />
        <label htmlFor="default">기본 설정</label>
        <input type='radio' id='user' name='difficult' value='user' onChange={handleRadioChange} checked={radioValue === 'user'} />
        <label htmlFor="user">사용자 설정</label>
        {renderTabContent(activeTab)}
      </div>
    </div>
  );
};
export default AbyssRaid;
