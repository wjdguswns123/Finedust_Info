// 광역 미세먼지 데이터 타입.
export interface MetroData {
  busan: number;
  chungbuk: number;
  chungnam: number;
  daegu: number;
  daejeon: number;
  dataGubun: number;
  dataTime: string;
  gangwon: number;
  gwangju: number;
  gyeongbuk: number;
  gyeonggi: number;
  gyeongnam: number;
  incheon: number;
  itemCode: string;
  jeju: number;
  jeonbuk: number;
  jeonnam: number;
  sejong: number;
  seoul: number;
  ulsan: number;
}

// 지역 미세먼지 데이터 타입.
export interface LocalData {
  cityName: string;
  cityNameEng: string;
  coValue: number;
  dataGubun: string;
  dataTime: string;
  districtCode: string;
  districtNumSeq: string;
  itemCode: string;
  khaiValue: number;
  no2Value: number;
  numOfRows: number;
  o3Value: number;
  pageNo: number;
  pm10Value: number;
  pm25Value: number;
  resultCode: string;
  resultMsg: string;
  returnType: string;
  searchCondition: string;
  serviceKey: string;
  sidoName: string;
  so2Value: number;
  totalCount:number;
}

// 북마크 저장 데이터 타입.
export interface BookMark {
  metro: string;
  local: string;
}