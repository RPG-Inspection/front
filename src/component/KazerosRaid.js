import React, { useState, useEffect } from 'react';
import '../CSS/Raid.css';
import ekiImg from '../image/baltan.jpg';

const KazerosRaid = () => {
  const [activeTab, setActiveTab] = useState('eki');
  const [radioValue, setRadioValue] = useState('default');

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

  useEffect(() => {
    const defaultOptions = {};
    Object.keys(options).forEach(category => {
      if (radioValue === 'default') {
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
            defaultOptions[category] = ['10'];
            break;
          case 'card':
            defaultOptions[category] = ['세구빛 30'];
            break;
          case 'elixir':
            defaultOptions[category] = ['엘릭서 40'];
            break;
          case 'transcendence':
            defaultOptions[category] = ['초월 100'];
            break;
          default:
            defaultOptions[category] = [options[category][0]];
            break;
        }
      } else {
        defaultOptions[category] = [options[category][0]];
      }
    });
    setSelectedOptions(defaultOptions);
    // eslint-disable-next-line
  }, [radioValue]);


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

    if (value === 'default') {
      const defaultOptions = {};
      Object.keys(options).forEach(category => {
        if (category === 'battleLevel') {
          defaultOptions[category] = ['60'];
        } else if (category === 'characteristic') {
          defaultOptions[category] = ['2300 이상'];
        } else if (category === 'abilityStone') {
          defaultOptions[category] = '고대 IV';
        } else if (category === 'skillPoint') {
          defaultOptions[category] = ['420'];
        } else if (category === 'engraving') {
          defaultOptions[category] = ['333331'];
        } else if (category === 'equipmentSetEffect') {
          defaultOptions[category] = ['3레벨'];
        } else if (category === 'gem') {
          defaultOptions[category] = ['10'];
        } else if (category === 'card') {
          defaultOptions[category] = ['세구빛 30'];
        } else if (category === 'elixir') {
          defaultOptions[category] = ['엘릭서40'];
        } else if (category === 'transcendence') {
          defaultOptions[category] = ['초월 100'];
        } else {
          defaultOptions[category] = [options[category][0]];
        }
      });
      setSelectedOptions(defaultOptions);
    }
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
                      disabled={radioValue === 'default'} // 기본 설정일 때 체크박스 비활성화
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
        <input type='radio' id='default' name='difficult' value='default' onChange={handleRadioChange} checked={radioValue === 'default'} />
        <label htmlFor="default">기본 설정</label>
        <input type='radio' id='user' name='difficult' value='user' onChange={handleRadioChange} checked={radioValue === 'user'} />
        <label htmlFor="user">사용자 설정</label>
        {renderTabContent(activeTab)}
      </div>
    </div>
  );
};
export default KazerosRaid;
