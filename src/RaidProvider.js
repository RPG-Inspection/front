// 리액트와 함께 createContext를 import 해주기
import React, { createContext } from "react";

// UserContext라는 이름으로 context api를 생성
export const UserContext = createContext();

// UserStore라는 이름으로 어떤 데이터를 만들지 생성
const UserStore = (props) => {
    const users = {
        raidname : "baltan"
      }

    return (
      // Provider를 사용해서 감싸주기
      <UserContext.Provider value={users}>
        {props.children}
      </UserContext.Provider>
    );
};

export default UserStore;