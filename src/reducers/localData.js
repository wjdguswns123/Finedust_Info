// 세부 지역 미세먼지 데이터 리듀서.
const localData = (state = [], action) => {
  switch(action.type)
  {
    case "ADD_DATA":
      let currentDataTime = "";
      let newDatas = [];
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