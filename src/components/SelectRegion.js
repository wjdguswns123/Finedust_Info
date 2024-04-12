import { useState } from 'react';
import './SelectRegion.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getLocalData } from '../actions/fetchData';
import styled from 'styled-components';

const SelectRegion = () => {
  const [isShowDropdownMenu, SetIsShowDropdownMenu] = useState(false);
  const [currentMetro, SetCurrentMetro] = useState("");
  const [currentLocalNames, SetCurrentLocalNames] = useState([]);
  const [currentLocalDatas, SetCurrentLocalDatas] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const localData = useSelector(state => state.localData);

  // 서버에서 내려받은 세부 지역 데이터 스토어에 저장.
  const addLocalData = (data) => {
    const newDatas = [...localData, data];
    dispatch({ type: "ADD_DATA", value: newDatas });
  }

  // 드롭다운 메뉴의 광역 지역 아이템 선택 처리.
  function onSelectMetroRegion(metro) {
    if(metro !== currentMetro)
    {
      getLocalData(metro, (datas) => {
        const tempData = datas.map((data) => {
          return data.cityName;
        });
        const set = new Set(tempData);
        const locals = [...set];
        SetCurrentMetro(metro);
        SetCurrentLocalNames(locals);
        SetCurrentLocalDatas([...datas]);
        addLocalData(datas);
      });
    }
  }

  // 드롭다운 메뉴의 세부 지역 아이템 선택 처리.
  function onSelectRegionItem(region) {
    const selectData = currentLocalDatas.find((data) => data.cityName === region);
    dispatch({ type: "SELECT_REGION", value: selectData });
    SetIsShowDropdownMenu(!isShowDropdownMenu);
    navigate("/");
  }

  // 선택된 광역 지역의 세부 지역 드롭다운 메뉴 출력.
  function drawLocalRegionDropdownList() {
    return (
      <ul className="select-region-dropdown-list">
        {currentLocalNames.map((localName, index) =>
          <li className="dropdown-list-item" key={index} onClick={() => onSelectRegionItem(localName)}>{localName}</li>
        )}
      </ul>);
  }

  // 지역 선택 드롭다운 메뉴 출력.
  function drawSelectRegionDropdownMenu() {
    return (
      <Dropdown $isShow={isShowDropdownMenu}>
        <ul className="select-region-dropdown-list">
          <li className="dropdown-list-item" onClick={() => onSelectMetroRegion("서울")}>서울</li>
          <li className="dropdown-list-item" onClick={() => onSelectMetroRegion("부산")}>부산</li>
          <li className="dropdown-list-item" onClick={() => onSelectMetroRegion("대구")}>대구</li>
          <li className="dropdown-list-item" onClick={() => onSelectMetroRegion("인천")}>인천</li>
          <li className="dropdown-list-item" onClick={() => onSelectMetroRegion("광주")}>광주</li>
          <li className="dropdown-list-item" onClick={() => onSelectMetroRegion("대전")}>대전</li>
          <li className="dropdown-list-item" onClick={() => onSelectMetroRegion("울산")}>울산</li>
          <li className="dropdown-list-item" onClick={() => onSelectMetroRegion("경기")}>경기</li>
          <li className="dropdown-list-item" onClick={() => onSelectMetroRegion("강원")}>강원</li>
          <li className="dropdown-list-item" onClick={() => onSelectMetroRegion("충북")}>충북</li>
          <li className="dropdown-list-item" onClick={() => onSelectMetroRegion("충남")}>충남</li>
          <li className="dropdown-list-item" onClick={() => onSelectMetroRegion("전북")}>전북</li>
          <li className="dropdown-list-item" onClick={() => onSelectMetroRegion("전남")}>전남</li>
          <li className="dropdown-list-item" onClick={() => onSelectMetroRegion("경북")}>경북</li>
          <li className="dropdown-list-item" onClick={() => onSelectMetroRegion("경남")}>경남</li>
          <li className="dropdown-list-item" onClick={() => onSelectMetroRegion("제주")}>제주</li>
          <li className="dropdown-list-item" onClick={() => onSelectMetroRegion("세종")}>세종</li>
        </ul>
        {drawLocalRegionDropdownList()}
      </Dropdown>
    );
  }

  // 지역 선택 드롭다운 메뉴 보기 버튼 클릭 처리.
  function onClickDropdownButton() {
    SetIsShowDropdownMenu(!isShowDropdownMenu);
  }

  return (
    <div className="select-region display-width">
      <button className="show-dropdown-button" onClick={onClickDropdownButton}>
        <span className="material-symbols-outlined">menu</span>
      </button>
      {
        drawSelectRegionDropdownMenu()
      }
    </div>
  );
}

export default SelectRegion;

const Dropdown = styled.div`
  display: ${props => props.$isShow ? "flex" : "none"};
  flex-direction: row;

  margin-top: 3px;

  z-index: 10;
`;