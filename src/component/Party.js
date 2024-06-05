import React, { useState, useEffect } from 'react';
import '../CSS/Party.css';

const dummyData = [
  {
    nickname: "유저1",
    class: "배틀마스터",
    position: "딜러",
    pass: "O"
  },
  {
    nickname: "유저2",
    class: "소서리스",
    position: "딜러",
    pass: "X"
  },
  {
    nickname: "유저3",
    class: "기공사",
    position: "딜러",
    pass: "O"
  },
  {
    nickname: "유저4",
    class: "워로드",
    position: "딜러",
    pass: "X"
  },
  {
    nickname: "유저5",
    class: "블레이드",
    position: "딜러",
    pass: "O"
  },
  {
    nickname: "유저6",
    class: "홀리나이트",
    position: "서포터",
    pass: "X"
  },
  {
    nickname: "유저7",
    class: "홀리나이트",
    position: "서포터",
    pass: "O"
  },
  {
    nickname: "유저8",
    class: "바드",
    position: "서포터",
    pass: "X"
  }
];

const synergyData = {
  "치명타 적중률": ["배틀마스터", "건슬링어", "아르카나", "데빌헌터", "스트라이커", "기상술사"],
  "받는 피해 증가": ["소울이터", "소서리스", "버서커", "데모닉", "호크아이", "브레이커", "인파이터", "슬레이어"],
  "공격력 증가": ["기공사", "스카우터", "홀리나이트", "바드", "도화가"],
  "방어력 감소": ["워로드", "서머너", "블래스터", "디스트로이어", "리퍼"],
  "백헤드 피해 증가": ["워로드", "블레이드"],
  "치명타 피해량 증가": ["창술사"]
};

const Party = () => {
  const [id, setId] = useState([]);

  useEffect(() => {
    setId(dummyData);
  }, []);

  const renderRows = () => {
    return id.map((member, index) => {
      const synergyList = Object.keys(synergyData).reduce((acc, key) => {
        if (synergyData[key].includes(member.class)) {
          acc.push(key);
        }
        return acc;
      }, []).join(', ');
      
      return (
        <tr key={index}>
          <td>{member.nickname}</td>
          <td>{member.class}</td>
          <td>{member.position}</td>
          <td>{member.pass}</td>
          <td>{synergyList}</td>
        </tr>
      );
    });
  };

  return (
    <div className="party-container">
      <h2>군장 검사</h2>
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
}

export default Party;
