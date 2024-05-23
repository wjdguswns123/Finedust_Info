import { LocalData } from "../types";

// 액션 매개변수 타입.
type paramAction = {
  type: string,
  value: LocalData
};

// state 초기화 데이터.
const initalState = {
  cityName: "",
  cityNameEng: "",
  coValue: 0,
  dataGubun: "",
  dataTime: "",
  districtCode: "",
  districtNumSeq: "",
  itemCode: "",
  khaiValue: 0,
  no2Value: 0,
  numOfRows: 0,
  o3Value: 0,
  pageNo: 0,
  pm10Value: 0,
  pm25Value: 0,
  resultCode: "",
  resultMsg: "",
  returnType: "",
  searchCondition: "",
  serviceKey: "",
  sidoName: "",
  so2Value: 0,
  totalCount: 0
}

// 현재 세부 선택 지역 리듀서.
const currentLocalRegion = (state: LocalData = initalState, action: paramAction) => {
  switch(action.type)
  {
    case "SELECT_REGION":
      state = action.value;
      console.log(state);
      break;
  }
  return state;
}

export default currentLocalRegion;