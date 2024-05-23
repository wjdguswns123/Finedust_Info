import { MetroData } from "../types";

// 액션 매개변수 타입.
type paramAction = {
  type: string,
  value: MetroData
};

// state 초기화 데이터.
const initalState = {
  busan: 0,
  chungbuk: 0,
  chungnam: 0,
  daegu: 0,
  daejeon: 0,
  dataGubun: 0,
  dataTime: "",
  gangwon: 0,
  gwangju: 0,
  gyeongbuk: 0,
  gyeonggi: 0,
  gyeongnam: 0,
  incheon: 0,
  itemCode: "",
  jeju: 0,
  jeonbuk: 0,
  jeonnam: 0,
  sejong: 0,
  seoul: 0,
  ulsan: 0
}

// 광역 미세먼지 데이터 리듀서.
const metropolitanData = (state: MetroData = initalState, action: paramAction) => {
  switch(action.type)
  {
    case "SET_DATA":
      state = action.value;
      break;
  }
  return state;
}

export default metropolitanData;