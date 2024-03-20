import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import MainDisplay from './components/MainDisplay'
import MenuTab from './components/MenuTab'
import SelectRegion from './components/SelectRegion'
import { getMetropolitanData } from './actions/fetchData';
import { getLocalData } from './actions/fetchData';
import { getBookmark, getMyRegion, setMyRegion } from './datas/localStorageDatas';
import { getInitMyRegion } from './utils';

function App() {
  const [currentTab, SetCurrentTab] = useState(0);

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
          const data = localDatas.find(data => data.sidoName === myRegion.metro && data.cityName === myRegion.local);
          dispatch({ type: "SELECT_REGION", value: data });
          renderCallback();
        }
        break;
      case 2:
        {
          // 전국 지도 보기.
          getMetropolitanData((data) => {
            setMetropolitanData(data);
            renderCallback();
          });
        }
        break;
      case 3:
        {
          // 즐겨찾기 등록된 지역의 데이터가 store에 없으면 데이터 요청.
          const bookmarks = getBookmark();
          let newDatas = [...localDatas];
          if (bookmarks !== null && bookmarks.length > 0) {
            let count = 0;
            bookmarks.map((bookmark) => {
              const data = localDatas.find(data => data.sidoName === bookmark.metro && data.cityName === bookmark.local);
              if (data === undefined) {
                count += 1;
                getLocalData(bookmark.metro, (data) => {
                  newDatas = [...newDatas, ...data];
                  count -= 1;

                  // 요청한 데이터가 모두 왔으면, store에 데이터 업데이트.
                  if (count === 0) {
                    dispatch({ type: "ADD_DATA", value: newDatas });
                    renderCallback();
                  }
                });
              }
            });

            // 요청한 데이터가 없으면, 바로 리렌더링.
            if (count === 0) {
              renderCallback();
            }
          }
          else {
            // 즐겨찾기한 지역이 없으면, 바로 리렌더링.
            renderCallback();
          }
        }
        break;
      case 4:
        {
          // 선택 지역 보기.
          renderCallback();
        }
        break;
    }
  }

  // 광역 미세먼지 데이터 설정.
  function setMetropolitanData(data) {
    dispatch({ type: "SET_DATA", value: data[0] });
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
