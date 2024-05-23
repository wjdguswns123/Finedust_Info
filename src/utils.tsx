// pm10 미세먼지 수치의 등급 분류.
export function getPM10State(value: number) {
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

// 날짜 문자열 객체로 분리.
export function stringToDate(text: string) {
  const temp1 = text.split(" ");
  const date = temp1[0].split("-");
  const time = temp1[1].split(":");

  const dateTime = { 
    year: Number(date[0]),
    month: Number(date[1]),
    date: Number(date[2]),
    hour: Number(time[0]),
    minute: Number(time[1])
   };

  return dateTime; 
}

// export function isCurrentHour(dateTime) {
//   const now = new Date();
//   console.log(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours());
//   if(now.getFullYear() === dateTime.year 
//     && now.getMonth() === dateTime.month 
//     && now.getDate() === dateTime.date
//     && now.getHours() === dateTime.hour)
//   {
//     return true;
//   }

//   return false;
// }