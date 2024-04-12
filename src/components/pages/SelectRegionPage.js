import { useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBookmark, getIsBookmarked, getMyRegion, getIsMyRegion, setMyRegion } from '../../datas/localStorageDatas';

import _ from 'lodash';
import { gsap } from "gsap";
import styled from 'styled-components';
import { getPM10State } from '../../utils';

import './SelectRegionPage.css';

// 현재 선택 지역 미세먼지 정보 출력.
function SelectRegionPage() {
  const [bookmarked, SetBookmarked] = useState(false);
  const [baseRegioned, SetbaseRegioned] = useState(false);

  const dispatch = useDispatch();
  const currentLocalRegion = useSelector(state => state.currentLocalRegion);
  const localDatas = useSelector(state => state.localData);

  useLayoutEffect(() => {
    gsap.to(sunRef.current, 4, {
      rotation: "+=360",
      repeat: -1,
    });

    gsap.to(carRef.current, 1, {
      height: "+=15",
      y: "-=18",
      repeat: -1,
      yoyo: 1,
    });

    gsap.to(state3CloudRef.current, 2, {
      scale: 1.5,
      repeat: -1,
      yoyo: 1,
    });

    gsap.to(state4SmogRef.current, 5, {
      x: "-=100",
      opacity: 0,
      repeat: -1,
    });
  });

  // 현재 선택 지역이 없으면, 내 지역 정보 보기.
  if (_.isEmpty(currentLocalRegion)) {
    const myRegion = getMyRegion();
    const data = localDatas.find(data => data.sidoName === myRegion.metro && data.cityName === myRegion.local);
    dispatch({ type: "SELECT_REGION", value: data });
  }

  // 현재 지역이 즐겨찾기 한 지역인지 확인.
  const isBookmarked = getIsBookmarked(currentLocalRegion);
  if (bookmarked !== isBookmarked) {
    SetBookmarked(isBookmarked);
  }

  // 현재 지역이 내 지역인지 확인.
  const isMyRegion = getIsMyRegion(currentLocalRegion);
  if (baseRegioned !== isMyRegion) {
    SetbaseRegioned(isMyRegion);
  }

  const state = getPM10State(currentLocalRegion.pm10Value);
  let stateText = "";
  switch (state) {
    case 0:
      stateText = "청명한 하늘이에요~";
      break;
    case 1:
      stateText = "날이 적당하네요!";
      break;
    case 2:
      stateText = "먼지가 많아요...";
      break;
    case 3:
      stateText = "나가지 않도록 해요";
      break;
  }

  const sunRef = useRef();
  const carRef = useRef();
  const state3CloudRef = useRef();
  const state4SmogRef = useRef();
  function drawStateImage () {
    switch (state) {
      case 0:
        return (
          <div>
            <img className="state0-img-sun" src="https://wjdguswns123.github.io/Finedust_Info/images/base_state0_sun.png" ref={sunRef} />
            <img className="state0-img-etc" src="https://wjdguswns123.github.io/Finedust_Info/images/base_state0_1.png" />
          </div>
        );
      case 1:
        return (
          <div>
            <img className="state1-img-car" src="https://wjdguswns123.github.io/Finedust_Info/images/base_state1_car.png" ref={carRef} />
            <img className="state1-img-etc" src="https://wjdguswns123.github.io/Finedust_Info/images/base_state1_1.png" />
          </div>
        );
      case 2:
        return (
          <div>
            <img className="state2-img-cloud" src="https://wjdguswns123.github.io/Finedust_Info/images/base_state2_cloud.png" ref={state3CloudRef} />
            <img className="state2-img-etc" src="https://wjdguswns123.github.io/Finedust_Info/images/base_state2_1.png" />
          </div>
        );
      case 3:
        return (
          <div>
            <img className="state3-img-smog" src="https://wjdguswns123.github.io/Finedust_Info/images/base_state3_smog.png" ref={state4SmogRef} />
            <img className="state3-img-etc" src="https://wjdguswns123.github.io/Finedust_Info/images/base_state3_1.png" />
          </div>
        );
    }
  }

  return (
    <div>
      <BackgroundColor $state={state} className="select-region-background">
        <span className="select-region-name">{currentLocalRegion.cityName}</span>
        <span className="select-region-value">{currentLocalRegion.pm10Value}</span>
        <StateImage alt="">
          {drawStateImage()}
        </StateImage>
        <span className="select-region-state-text">{stateText}</span>
        <div className="button-group">
          <BookmarkButton $bookmarked={isBookmarked} onClick={() => {
            setBookmark(!bookmarked, currentLocalRegion.sidoName, currentLocalRegion.cityName);
            SetBookmarked(!bookmarked);
          }}>
            <BookmarkButtonImage className="material-symbols-outlined bookmark-star">kid_star</BookmarkButtonImage>
          </BookmarkButton>
          <MyRegionButton $myRegion={isMyRegion} className="base-button" onClick={() => {
            if (!isMyRegion) {
              setMyRegion(currentLocalRegion.sidoName, currentLocalRegion.cityName);
              SetbaseRegioned(true);
            }
          }}>내 지역</MyRegionButton>
        </div>
      </BackgroundColor>
    </div>
  );
}

export default SelectRegionPage;

// 선택한 지역에 따른 배경 색 설정.
const BackgroundColor = styled.div`
  background-image: ${(props) => {
    switch (props.$state) {
      case 0:
        return "linear-gradient(to top, #71dfff, #def1fd)";
      case 1:
        return "linear-gradient(to top, #98f67b, #ebffe0)";
      case 2:
        return "linear-gradient(to bottom, #ffe589, #998337)";
      case 3:
        return "linear-gradient(to bottom, #a58f69, #6d6355)";
    }
  }};
`;

// 미세먼지 수치에 따른 이미지 출력.
const StateImage = styled.div`
  height: 350px;
  position: relative;
  top: -30px;
`;

// 즐겨찾기 버튼.
const BookmarkButton = styled.button`
  margin-right: 10px;

  width: 150px;
  height: 60px;

  background-color: ${props => props.$bookmarked ? "#fde69b" : "#fff"};
  border: 5px solid ${props => props.$bookmarked ? "#6f4d12" : "#777"};
  border-radius: 8px;
`;

// 즐겨찾기 버튼 내부 이미지.
const BookmarkButtonImage = styled.span`
  font-size: 2rem;
  opacity: 0.6;
`;

// 내 지역 버튼.
const MyRegionButton = styled.button`
  margin-left: 10px;

  width: 150px;
  height: 60px;

  font-size: 1rem;
  font-weight: 700;
  color: #333;

  background-color: ${props => props.$myRegion ? "#fde69b" : "#fff"};
  border: 5px solid ${props => props.$myRegion ? "#6f4d12" : "#777"};
  border-radius: 8px;
`;