// src/component/apiService.js

export async function fetchCharacterProfile(characterName) {
  const jwtToken = localStorage.getItem('API-User');
  if (!jwtToken) {
      throw new Error('JWT 토큰이 로컬 스토리지에 저장되어 있지 않습니다.');
  }

  const response = await fetch(`https://developer-lostark.game.onstove.com/armories/characters/${characterName}/profiles`, {
      headers: {
          'Authorization': `bearer ${jwtToken}`
      }
  });

  if (!response.ok) {
      throw new Error(`Error fetching profile for ${characterName}: ${response.statusText}`);
  }

  const data = await response.json();

  if (!data) {
      throw new Error(`Profile data is null for ${characterName}`);
  }

  // 필요한 데이터만 추출
  const {
      CharacterName,
      CharacterClassName,
      CharacterLevel,
      TotalSkillPoint,
      Stats,
      AbilityStone,
      Engraving,
      EquipmentSetEffect,
      Gem,
      Card,
      Elixir,
      Transcendence
  } = data;

  const totalCharacteristic = Stats
      .filter(stat => ["제압", "인내", "숙련", "치명", "신속", "특화"].includes(stat.Type))
      .reduce((sum, stat) => sum + parseInt(stat.Value), 0);

  return {
      CharacterName,
      CharacterClassName,
      CharacterLevel,
      TotalSkillPoint,
      Stats,
      AbilityStone,
      Engraving,
      EquipmentSetEffect,
      Gem,
      Card,
      Elixir,
      Transcendence,
      totalCharacteristic
  };
}

export async function fetchPartyProfiles(characterNames) {
  const profiles = await Promise.all(
      characterNames.map(name => 
          fetchCharacterProfile(name).catch(err => {
              console.error(`Error fetching profile for ${name}: ${err.message}`);
              return null;
          })
      )
  );

  // null이 아닌 프로필만 반환
  return profiles.filter(profile => profile !== null);
}
