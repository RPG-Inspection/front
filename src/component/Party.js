import React, { useState, useEffect, useContext } from 'react';
import { fetchPartyProfiles } from './apiService';
import reroding from '../image/reroding.png'
import '../CSS/Party.css';

const synergyData = {
  "치명타 적중률": ["배틀마스터", "건슬링어", "아르카나", "데빌헌터", "스트라이커", "기상술사"],
  "받는 피해 증가": ["소울이터", "소서리스", "버서커", "데모닉", "호크아이", "브레이커", "인파이터", "슬레이어"],
  "공격력 증가": ["기공사", "스카우터", "홀리나이트", "바드", "도화가"],
  "방어력 감소": ["워로드", "서머너", "블래스터", "디스트로이어", "리퍼"],
  "백헤드 피해 증가": ["워로드", "블레이드"],
  "치명타 피해량 증가": ["창술사"],
  "낙인": ["바드", "홀리나이트", "도화가"],
};





const Party = ({ selectedOptions = {}, apiMode, capturedNicknames }) => {
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState(null);
  const [raidkey,setRaidKey] = useState("");

  useEffect(() => {
    console.log('Captured Nicknames:', capturedNicknames); // 디버깅 로그

    if (capturedNicknames && capturedNicknames.length > 0) {
      const validNicknames = capturedNicknames.filter(name => name.length >= 3); // 유효한 닉네임 필터링
      if (validNicknames.length > 0) {
        const loadProfiles = async () => {
          try {
            const data = await fetchPartyProfiles(validNicknames);
            console.log('Fetched Profiles:', data); // 디버깅 로그
            setProfiles(data);
          } catch (err) {
            console.error('Error fetching profiles:', err.message); // 에러 디버깅
            setError(err.message);
          }
        };

        loadProfiles();
      }
    }
  }, [capturedNicknames, selectedOptions]);
  useEffect(() => {
    setRaidKey(localStorage.getItem("raidSelectedVal"));
  }, [])

  const renderRows = () => {
    if (!profiles || profiles.length === 0) {
      return (
        <tr>
          <td colSpan="5">No data available</td>
        </tr>
      );
    }
    return profiles.map((profile, index) => {
      const synergyList = Object.keys(synergyData).reduce((acc, key) => {
        if (synergyData[key].includes(profile.CharacterClassName)) {
          acc.push(key);
        }
        return acc;
      }, []).join(', ');



      const passStatus = determinePassStatus(profile, selectedOptions);
      const position = isSupportClass(profile.CharacterClassName) ? "서포터" : "딜러";

      return (
        <tr key={index}>
          <td>{profile.CharacterName}</td>
          <td>{profile.CharacterClassName}</td>
          <td>{position}</td>
          <td>{passStatus}</td>
          <td>{synergyList}</td>
        </tr>
      );
    });
  };

  const determinePassStatus = (profile) => {
    const RaidUser = {
      "baltan": ["이세상사과", "구실순", "YWKAH", "하늘빚라떼", "아미파파", "야발넘","윤권님","퓨어슈슈아","탄압","EQQuUEE"],
      "biakis": ["이세상사과", "구실순", "YWKAH", "하늘빚라떼", "아미파파", "찬조만띄우는바드", "아미마마","야발넘","윤권님","퓨어슈슈아","탄압","EQQuUEE"],
      "kuxseiten": ["이세상사과", "구실순", "YWKAH","윤권님","퓨어슈슈아","하늘빚라떼", "아미파파", "찬조만띄우는바드", "아미마마","탄압","EQQuUEE"],
      "avrelshud": ["이세상사과", "구실순", "YWKAH", "하늘빚라떼", "아미파파", "찬조만띄우는바드", "아미마마", "윤권님","퓨어슈슈아","탄압"],
      "ilyakan": ["이세상사과", "구실순", "YWKAH", "하늘빚라떼", "아미파파", "아미마마","윤권님","퓨어슈슈아","탄압"],
      "kame": ["이세상사과", "소서리스", "아미마마", "하늘빚라떼","퓨어슈슈아"],
      "kayangel": ["이세상사과", "찬조만띄우는바드", "아미파파", "하늘빚라떼", "아미마마","윤권님","퓨어슈슈아"],
      "ivorytower": ["이세상사과", "소서리스", "버서커", "하늘빚라떼", "아미마마", "윤권님","퓨어슈슈아"],
      "eki": ["이세상사과", "하늘빚라떼", "퓨어슈슈아"],
      "Behemoth": ["이세상사과", "하늘빚라떼"]
    };
  
  
    const nicknames = RaidUser[raidkey];
    if (nicknames.includes(profile.CharacterName)) {
      return "O";
    } else {
      return "X";
    }
  };

  const onRefresh = () => {
    setRaidKey(localStorage.getItem("raidSelectedVal"));
  }

  return (
    <div className="party-container">
      <button onClick={onRefresh} style={{ margin: '5px', display: 'flex', justifyContent: 'left' }}>
  <     img src={reroding} style={{ width: '25px', height: '25px' }} />
    </button>
  
      <h2>군장 검사</h2>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>닉네임</th>
            <th>클래스</th>
            <th>포지션</th>
            <th>합/불 여부</th>
            <th>시너지</th>
          </tr>
        </thead>
        <tbody>
          {renderRows()}
        </tbody>
      </table>
    </div>
  );
};

export default Party;


const isSupportClass = (characterClass) => {
  const supportClasses = ["홀리나이트", "바드", "도화가"];
  return supportClasses.includes(characterClass);
};

