import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import MainDisplay from './components/MainDisplay'
import MenuTab from './components/MenuTab'
import SelectRegion from './components/SelectRegion'
import { getLocalData } from './actions/fetchData';
import { getMyRegion, setMyRegion } from './datas/localStorageDatas';
import { getInitMyRegion } from './utils';
import { useNavigate } from 'react-router-dom';

function App() {
  const [currentTab, SetCurrentTab] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const localDatas = useSelector(state => state.localData);

  // 내 지역으로 설정한 지역의 데이터 받아오기.
  let myRegion = getMyRegion();
  if (myRegion === null) {
    // 로컬에 저장된 내 지역이 아직 없을 때, 임의로 지정.
    myRegion = getInitMyRegion();
    setMyRegion(myRegion.metro, myRegion.local);
  }
  const data = localDatas.find(data => data.sidoName === myRegion.metro && data.cityName === myRegion.local);

  if (data === undefined) {
    getLocalData(myRegion.metro, (data) => {
      const newDatas = [...localDatas, ...data];
      dispatch({ type: "ADD_DATA", value: newDatas });
      SetCurrentTab(1);
    });
  }

  // 데이터 요청.
  function requestData(tabIndex, renderCallback) {
    switch (tabIndex) {
      case 1:
        {
          // 내 지역 보기.
          navigate("/");
          renderCallback();
        }
        break;
      case 2:
        {
          // 전국 지도 보기.
          navigate("/wholeCountryPage");
          renderCallback();
        }
        break;
      case 3:
        {
          // 즐겨찾기 보기.
          navigate("/bookmarkPage");
          renderCallback();
        }
        break;
      case 4:
        {
          // 선택 지역 보기.
          navigate("/");
          renderCallback();
        }
        break;
    }
  }

  // 메뉴 텝 클릭 처리.
  function onTabClick(tabIndex) {
    if (currentTab !== tabIndex) {
      requestData(tabIndex, () => SetCurrentTab(tabIndex));
    }
  }

  return (
      <div className="App">
        <MainDisplay tabIndex={currentTab} />
        <MenuTab onTabClick={onTabClick} />
        <SelectRegion onTabClick={onTabClick} />
      </div>
  );
}

export default App;
