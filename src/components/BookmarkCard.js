import './BookmarkCard.css';
import styled from 'styled-components';
import { getPM10State } from '../utils';
import { useSelector } from 'react-redux';

// 지역 정보 카드 출력.
const BookmarkCard = ({ bookmark, index }) => {
  const localDatas = useSelector(state => state.localData);

  const data = localDatas.find(data => data.sidoName === bookmark.metro && data.cityName === bookmark.local);

  // 미세먼지 상태 텍스트.
  const state = getPM10State(data.pm10Value);
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
        return "/images/state_icon0.png";
      case 1:
        return "/images/state_icon1.png";
      case 2:
        return "/images/state_icon2.png";
      case 3:
        return "/images/state_icon3.png";
    }
  }

  return (
    <li key={index} className="bookmark-card">
      <div className="metro-name">{data.sidoName}</div>
      <div className="local-name">{data.cityName}</div>
      <StateText state={state} className="dust-value">{data.pm10Value}</StateText>
      <img src={getStateIcon()} alt="" className="state-img"></img>
      <StateText state={state} className="state-text">{getStateText(data.pm10Value)}</StateText>
    </li>
  );
}

export default BookmarkCard;

const StateText = styled.div`
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