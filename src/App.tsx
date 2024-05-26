import _ from "lodash";
import './App.css';
import Layout from './components/Layout'
import SelectRegionPage from './components/pages/SelectRegionPage';
import WholeCountryPage from './components/pages/WholeCountryPage';
import BookmarkPage from './components/pages/BookmarkPage';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLocalData } from './actions/fetchData';
import { getMyRegion, setMyRegion } from './datas/localStorageDatas';
import { getInitMyRegion } from './utils';
import { Route, Routes } from 'react-router-dom';
import { LocalData } from "./types";
import { RootState } from "./reducers";

function App() {
  const [currentTab, SetCurrentTab] = useState(0);

  const dispatch = useDispatch();
  const localDatas = useSelector((state: RootState) => state.localData);

  useEffect(() => {
    // 내 지역으로 설정한 지역의 데이터 받아오기.
    let myRegion = getMyRegion();
    if (myRegion === null || myRegion.local === "") {
      // 로컬에 저장된 내 지역이 아직 없을 때, 임의로 지정.
      myRegion = getInitMyRegion();
      setMyRegion(myRegion.metro, myRegion.local);
    }
    const data = localDatas.find((data: LocalData) => data.sidoName === myRegion.metro && data.cityName === myRegion.local);

    if (_.isEmpty(data)) {
      getLocalData(myRegion.metro, (data) => {
        const newDatas = [...localDatas, ...data];
        dispatch({ type: "ADD_DATA", value: newDatas });
        SetCurrentTab(1);
      });
    }
  }, []);

  return (
    <div className="App">
      {currentTab !== 0 && (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<SelectRegionPage />} />
            <Route path="wholeCountryPage" element={<WholeCountryPage />} />
            <Route path="bookmarkPage" element={<BookmarkPage />} />
          </Route>
        </Routes>
      )}
    </div>
  );
}

export default App;