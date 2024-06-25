import React, { useState, useEffect } from 'react';
import '../CSS/RaidStyles.css';
import BehemothImg from '../image/behemoth.png'; // 이미지 파일 경로를 맞게 수정하세요.
import styled from 'styled-components';

const EpicRaid = () => {
  const [activeTab, setActiveTab] = useState('Behemoth-default');
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

  const [presetName, setPresetName] = useState('');
  const [showSavePresetModal, setShowSavePresetModal] = useState(false);
  const [showLoadPresetModal, setShowLoadPresetModal] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const left = '기본';
  const right = '사용자';

  const aliasMap = {
    battleLevel: '전투 레벨',
    characteristic: '특성합',
    abilityStone: '어빌리티 스톤',
    skillPoint: '스킬 포인트',
    engraving: '각인',
    equipmentSetEffect: '장비 세트 효과',
    gem: '보석',
    card: '카드',
    elixir: '엘릭서',
    transcendence: '초월'
  };

  const options = {
    battleLevel: ['50', '55', '60'],
    characteristic: ['2100 이상', '2200 이상', '2300 이상'],
    abilityStone: ['유물', '고대 I', '고대 II', '고대 III', '고대 IV'],
    skillPoint: ['390', '400', '410', '420'],
    engraving: ['3333', '33333', '333331', '333332'],
    equipmentSetEffect: ['1LV', '2LV', '3LV'],
    gem: ['5LV', '7LV', '9LV', '10LV'],
    card: ['알고보면 12', '알고보면 18', '알고보면 30', '남바절 12', '남바절 30', '세구빛 12', '세구빛 18', '세구빛 30', '암구빛 12', '암구빛 18', '암구빛 30', '너다계 18', '너다계 30', '창달 30'],
    elixir: ['엘릭서 0', '엘릭서 35', '엘릭서 40', '엘릭서 40+'],
    transcendence: ['초월 X', '초월 25', '초월 50', '초월 75', '초월 100', '초월 125']
  };

  useEffect(() => {
    localStorage.setItem("raidSelectedVal", 'Behemoth');
    const savedOptions = JSON.parse(localStorage.getItem(activeTab));
    if (savedOptions) {
      setSelectedOptions(savedOptions);
    }
  }, []);

  const handleTabClick = (tabId) => {
    localStorage.setItem("raidSelectedVal",`${tabId}`);
    setActiveTab(`${tabId}-default`);
  };

  const handleOptionClick = (category, option) => {
    if (isChecked) {
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
    }
  };

  const handleToggleChange = () => {
    setIsChecked(prev => {
      const newChecked = !prev;
      if (newChecked) {
        setSelectedOptions({
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
      } else {
        const savedOptions = JSON.parse(localStorage.getItem(activeTab));
        if (savedOptions) {
          setSelectedOptions(savedOptions);
        }
      }
      return newChecked;
    });
  };

  const handleSave = () => {
    if (!isChecked) {
      return; // 기본 모드일 때는 저장하기 버튼이 작동하지 않음
    }
  
    // 각 카테고리별로 하나라도 선택하지 않았으면 기본 옵션들을 모두 선택
    const updatedOptions = { ...selectedOptions };
    Object.keys(options).forEach(category => {
      if (updatedOptions[category].length === 0) {
        updatedOptions[category] = [...options[category]];
      }
    });
  
    setShowSavePresetModal(true);
    setSelectedOptions(updatedOptions);
  };
  
  const savePreset = () => {
    if (presetName.trim() === '') {
      return;
    }
    localStorage.setItem(`${activeTab}-${presetName}`, JSON.stringify(selectedOptions));
    setShowSavePresetModal(false);
  };
  

  const handleReset = () => {
    if (!isChecked) {
      return; // 기본 모드일 때는 초기화 버튼이 작동하지 않음
    }
    setSelectedOptions({
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
  };

  const handleLoadPreset = () => {
    if (selectedPreset) {
      const savedOptions = JSON.parse(localStorage.getItem(selectedPreset));
      if (savedOptions) {
        setSelectedOptions(savedOptions);
        setShowLoadPresetModal(false);
        setIsChecked(true); // 토글을 "상세"로 변경
      }
    }
  };

  const deletePreset = () => {
    if (selectedPreset) {
      localStorage.removeItem(selectedPreset);
      setShowLoadPresetModal(false);
    }
  };

  const renderPresetList = () => {
    const presetKeys = Object.keys(localStorage).filter(key => key.startsWith(activeTab) && !key.endsWith('-default'));
    return presetKeys.map(preset => (
      <div key={preset} className="preset-item" onClick={() => setSelectedPreset(preset)}>
        <span>{preset.replace(`${activeTab}-`, '')}</span>
      </div>
    ));
  };

  const renderTabContent = (tabId) => {
    const content = {
      'Behemoth-default': { title: '베히모스 스펙' }
    };

    const selectedContent = content[tabId];

    return (
      <div className="content active">
        <div className="preset-menu">
          <ToggleWrapper>
            <CheckBox
              type="checkbox"
              id="toggle"
              checked={isChecked}
              onChange={handleToggleChange}
            />
            <ToggleSwitch htmlFor="toggle">
              <ToggleCircle className={isChecked ? 'checked' : ''} />
            </ToggleSwitch>
            <ToggleLabels>
              <span className={`toggle-left ${isChecked ? 'inactive' : 'active'}`}>{left}</span>
              <span className={`toggle-right ${isChecked ? 'active' : 'inactive'}`}>{right}</span>
            </ToggleLabels>
          </ToggleWrapper>
          <button onClick={handleReset}>초기화</button>
          <div className="preset-dropdown">
            <button onClick={() => setShowLoadPresetModal(true)}>불러오기</button>
            <button onClick={handleSave}>저장하기</button>
          </div>
        </div>
        {showSavePresetModal && (
          <div className="modal-overlay-save">
            <div className="modal-content save-modal">
              <h2>프리셋 저장</h2>
              <input
                type="text"
                placeholder="프리셋 이름"
                value={presetName}
                onChange={(e) => setPresetName(e.target.value)}
              />
              <button onClick={savePreset}>저장</button>
              <button onClick={() => setShowSavePresetModal(false)}>취소</button>
            </div>
          </div>
        )}
        {showLoadPresetModal && (
          <div className="modal-overlay-reloading">
            <div className="modal-content load-modal">
              <h2>프리셋 불러오기</h2>
              <div className="preset-list">{renderPresetList()}</div>
              <div className="preset-actions">
                <button onClick={handleLoadPreset} disabled={!selectedPreset}>적용</button>
                <button onClick={deletePreset} disabled={!selectedPreset}>삭제</button>
                <button onClick={() => setShowLoadPresetModal(false)}>취소</button>
              </div>
            </div>
          </div>
        )}
        <div className="spec-card">
          {Object.keys(options).map(category => (
            <div key={category} className="spec-row">
              <label>{aliasMap[category]}</label>
              <div className={`checkbox-wrapper ${!isChecked ? 'disabled' : ''}`}>
                {options[category].map(option => (
                  <div key={option} className="checkbox-container">
                    <input
                      type="checkbox"
                      id={`${category}-${option}`}
                      checked={selectedOptions[category].includes(option)}
                      onChange={() => handleOptionClick(category, option)}
                      disabled={!isChecked} // 비활성화 설정
                      className={!isChecked ? 'disabled-checkbox' : ''}
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
          <button onClick={() => handleTabClick('Behemoth')} className={activeTab === 'Behemoth-default' ? 'active' : ''}>
            <img src={BehemothImg} alt="베히모스" className='RaidImg' />
            베히모스
          </button>
        </div>
    
        <div className="tab-content">
          {renderTabContent(activeTab)}
        </div>
      </div>
    );
    };
    
    export default EpicRaid;

const ToggleWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 150px;
  height: 40px;
  margin-right: 10px;
`;

const CheckBox = styled.input`
  display: none;
`;

const ToggleSwitch = styled.label`
  display: inline-block;
  width: 100%;
  height: 100%;
  background-color: #e5e5e5;
  border-radius: 20px;
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s;

  .toggle-circle {
    display: inline-block;
    width: 50%;
    height: 100%;
    background-color: white;
    border-radius: 20px;
    transition: transform 0.2s;
  }

  .checked + .toggle-circle {
    transform: translateX(100%);
  }
`;


const ToggleCircle = styled.div`
  width: 50%;
  height: 100%;
  background-color: #fff;
  border-radius: 20px;
  position: absolute;
  top: 0;
  left: 0;
  transition: left 0.3s;

  &.checked {
    left: 50%;
  }
`;

const ToggleLabels = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  width: 80%;
  height: 100%;
  top: 0;
  left: 0;
  padding: 0 5px;
  align-items: center;
  pointer-events: none;

  .toggle-left,
  .toggle-right {
    font-weight: bold;
    color: #777;
    transition: color 0.3s;
  }

  .toggle-left.active,
  .toggle-right.active {
    color: #333;
  }

  .toggle-left.inactive,
  .toggle-right.inactive {
    color: #ccc;
  }
`;
