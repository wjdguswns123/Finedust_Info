import './BookmarkCard.css';
import styled from 'styled-components';
import { getPM10State } from '../utils';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { BookMark } from '../types';

// 지역 정보 카드 출력.
const BookmarkCard = ({ bookmark }: {
  bookmark: BookMark
}) => {
  const localDatas = useSelector((state: RootState) => state.localData);

  const data = localDatas.find(data => data.sidoName === bookmark.metro && data.cityName === bookmark.local);

  // 미세먼지 상태 텍스트.
  const state = getPM10State(data?.pm10Value || 0);
  function getStateText() {
    switch(state)
    {
      case 0:
        return "좋음";
      case 1:
        return "보통";
      case 2:
        return "나쁨";
      case 3:
        return "아주 나쁨";
    }
  }

  // 미세먼지 상태 아이콘.
  function getStateIcon() {
    switch(state)
    {
      case 0:
        return "https://wjdguswns123.github.io/Finedust_Info/images/state_icon0.png";
      case 1:
        return "https://wjdguswns123.github.io/Finedust_Info/images/state_icon1.png";
      case 2:
        return "https://wjdguswns123.github.io/Finedust_Info/images/state_icon2.png";
      case 3:
        return "https://wjdguswns123.github.io/Finedust_Info/images/state_icon3.png";
    }
  }

  return (
    <li className="bookmark-card">
      <div className="metro-name">{data?.sidoName}</div>
      <div className="local-name">{data?.cityName}</div>
      <StateText state={state} className="dust-value">{data?.pm10Value}</StateText>
      <img src={getStateIcon()} alt="" className="state-img"></img>
      <StateText state={state} className="state-text">{getStateText()}</StateText>
    </li>
  );
}

export default BookmarkCard;

const StateText = styled.div<{ state: number }>`
  color: ${(props) => {
    switch (props.state) {
      case 0:
        return "#24afff";
      case 1:
        return "#2cca64";
      case 2:
        return "#e1a10c";
      case 3:
        return "#ff0606";
    }
  }};
`;