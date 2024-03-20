// pm10 미세먼지 수치의 등급 분류.
export function getPM10State(value) {
  if(value <= 30)
  {
    return 0;
  }
  else if(value <= 80)
  {
    return 1;
  }
  else if(value <= 150)
  {
    return 2;
  }
  return 3;
}

// 임의 설정 내 지역. 로컬에 저장된 지역이 없을 때 사용.
export function getInitMyRegion() {
  return {
    metro: "서울",
    local: "관악구"
  };
}