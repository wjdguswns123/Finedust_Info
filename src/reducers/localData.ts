import { LocalData } from "../types";

// 액션 매개변수 타입.
type paramAction = {
  type: string,
  value: LocalData[]
};

// 세부 지역 미세먼지 데이터 리듀서.
const localData = (state: LocalData[] = [], action: paramAction) => {
  switch(action.type)
  {
    case "ADD_DATA":
      let currentDataTime = "";
      let newDatas: LocalData[] = [];
      action.value.map((data) => {
        if(currentDataTime === "")
        {
          currentDataTime = data.dataTime;
        }
        
        if(data.dataTime === currentDataTime)
        {
          newDatas = [...newDatas, data];
        }
      });
      state = newDatas;
      break;
  }
  return state;
}

export default localData;