// 광역 미세먼지 데이터 리듀서.
const metropolitanData = (state = {}, action) => {
  switch(action.type)
  {
    case "SET_DATA":
      state = action.value;
      break;
  }
  return state;
}

export default metropolitanData;