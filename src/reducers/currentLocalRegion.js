// 현재 세부 선택 지역 리듀서.
const currentLocalRegion = (state = {}, action) => {

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