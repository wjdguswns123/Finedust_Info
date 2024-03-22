import './MainDisplay.css';
import './common.css';
import styled from 'styled-components';
import SelectRegionDisplay from './SelectRegionDisplay';
import BookmarkCard from './BookmarkCard';
import { useSelector } from 'react-redux';
import { getBookmark } from '../datas/localStorageDatas';
import { getPM10State } from '../utils';

function MainDisplay({ tabIndex }) {
  const metropolitanData = useSelector(state => state.metropolitanData);

  /// 전국 지도 그리기. //////////

  // 전국 지도의 해당 지역 수치에 맞는 이미지 반환.
  function getRegionImg(region, value) {
    return `https://wjdguswns123.github.io/Finedust_Info/images/${region + getPM10State(value)}.png`;
  }

  // 전국 지도의 해당 지역 그리기.
  function drawRegion(region, name, value) {
    return (
      <div>
        <img className={`map-image ${region}`} src={getRegionImg(region, value)}></img>
        <div className={`map-banner ${region}`}>
          <div className="region-name">{name}</div>
          <PMValue state={getPM10State(value)} className="pm-value">{value}</PMValue>
        </div>
      </div>
    );
  }

  // 전국 지도 그리기.
  function drawMetropolitanTab() {
    return (
      <div className="map-background">
        {drawRegion("seoul", "서울", metropolitanData.seoul)}
        {drawRegion("incheon", "인천", metropolitanData.incheon)}
        {drawRegion("gyeonggi", "경기", metropolitanData.gyeonggi)}
        {drawRegion("gangwon", "강원", metropolitanData.gangwon)}
        {drawRegion("chungbuk", "충북", metropolitanData.chungbuk)}
        {drawRegion("chungnam", "충남", metropolitanData.chungnam)}
        {drawRegion("daejeon", "대전", metropolitanData.daejeon)}
        {drawRegion("sejong", "세종", metropolitanData.sejong)}
        {drawRegion("gyeongbuk", "경북", metropolitanData.gyeongbuk)}
        {drawRegion("daegu", "대구", metropolitanData.daegu)}
        {drawRegion("gyeongnam", "경남", metropolitanData.gyeongnam)}
        {drawRegion("busan", "부산", metropolitanData.busan)}
        {drawRegion("ulsan", "울산", metropolitanData.ulsan)}
        {drawRegion("jeonbuk", "전북", metropolitanData.jeonbuk)}
        {drawRegion("jeonnam", "전남", metropolitanData.jeonnam)}
        {drawRegion("gwangju", "광주", metropolitanData.gwangju)}
        {drawRegion("jeju", "제주", metropolitanData.jeju)}
      </div>
    );
  }

  //////////////

  // 즐겨찾기 그리기.
  function drawBookmarkTab() {
    const bookmarks = getBookmark();

    if (bookmarks !== null && bookmarks.length > 0) {
      return (<ul className="bookmark-cards">
        {bookmarks.map((bookmark, index) => {
          return (
            <BookmarkCard bookmark={bookmark} index={index} />);
        })}
      </ul>);
    }
    else {
      return (
        <div className="no-bookmark">
          즐겨찾기 한 지역이 없습니다.
        </div>);
    }
  }

  // 선택 탭에 따라 메인 화면 출력.
  function drawMainDisplay(tabIndex) {
    switch (tabIndex) {
      case 1:
        return <SelectRegionDisplay />;
      case 2:
        return drawMetropolitanTab();
      case 3:
        return (
          <div className="bookmark-background">
            {drawBookmarkTab()}
          </div>
        );
      case 4:
        return <SelectRegionDisplay />;
    }
  }

  return (
    <ContentContainer className="display-width">
      {drawMainDisplay(tabIndex)}
    </ContentContainer>
  );
}

export default MainDisplay;

const ContentContainer = styled.main`
  height: calc(100vh - 70px);
`;

const PMValue = styled.div`
  background-color: ${(props) => {
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