import axios from 'axios';
import { addLocalData } from '../datas/localStorageDatas';

const baseURL = "http://apis.data.go.kr/B552584/ArpltnStatsSvc/";

// 지역 미세먼지 데이터 요청.
export async function getLocalData(metro, callback) {
  const url = baseURL
    + "getCtprvnMesureSidoLIst?serviceKey=swfXhi%2FmMYSGv5yl4ua%2FtpUmLigJ9BRuI8WCPZvn8ZP2J0z%2BL3Xd7Xe25F7bdDlCtf02Bt%2B4N6iNF8oehfndEQ%3D%3D"
    + "&returnType=json"
    + "&numOfRows=100"
    + "&pageNo=1"
    + "&sidoName=" + metro
    + "&searchCondition=DAILY";

  const result = await fetchPosts(url);
  console.log(result);
  
  let currentDataTime = "";
  let datas = [];
  const items = result.response.body.items;
  
  items.map((item) => {
    if (currentDataTime === "") {
      currentDataTime = item.dataTime;
    }

    if (item.dataTime === currentDataTime) {
      datas = [...datas, item];
    }
  });
  callback(datas);
}

// 광역 미세먼지 데이터 요청.
export async function getMetropolitanData(callback) {
  const url = baseURL
    + "getCtprvnMesureLIst?serviceKey=swfXhi%2FmMYSGv5yl4ua%2FtpUmLigJ9BRuI8WCPZvn8ZP2J0z%2BL3Xd7Xe25F7bdDlCtf02Bt%2B4N6iNF8oehfndEQ%3D%3D"
    + "&returnType=json"
    + "&numOfRows=100"
    + "&pageNo=1"
    + "&itemCode=PM10"
    + "&dataGubun=HOUR"
    + "&searchCondition=WEEK";

  const result = await fetchPosts(url);
  console.log(result);
  callback(result.response.body.items);
}

// 데이터 요청.
async function fetchPosts(url) {
  const response = await axios.get(url);

  return response.data;
}
