import React from 'react';
import _ from "lodash";
import { getPM10State } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getMetropolitanData } from '../../actions/fetchData';

const WholeCountryPage = () => {
  const dispatch = useDispatch();
  const metropolitanData = useSelector(state => state.metropolitanData);

  // 전국 지도의 해당 지역 수치에 맞는 이미지 반환.
  function getRegionImg(region, value) {
    return `/images/${region + getPM10State(value)}.png`;
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

  if (_.isEmpty(metropolitanData)) {
    // 전국 미세먼지 데이터가 스토어에 없으면, 데이터 요청.
    getMetropolitanData((data) => {
      dispatch({ type: "SET_DATA", value: data[0] });
    });
  }
  else {
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
}

export default WholeCountryPage;

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