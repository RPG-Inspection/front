import React, { useEffect, useState } from 'react';
import './App.css';
import Body from './component/Body';
import Header from './component/Header';
import Footer from './component/Footer';
import { initializeLocalStorage } from '../src/component/initializeLocalStorage.js';


function App() {
  const [selectedOptions, setSelectedOptions] = useState({
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
  });

  const [apiMode, setApiMode] = useState(false);

  useEffect(() => {
    initializeLocalStorage();
  }, []);

  return (
    <div className="App">
        <Header setApiMode={setApiMode} />
        <Body selectedOptions={selectedOptions} apiMode={apiMode}  />
        <Footer />
    </div>
  );
}

export default App;
