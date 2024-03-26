import './MainDisplay.css';
import './common.css';
import styled from 'styled-components';
import SelectRegionPage from './pages/SelectRegionPage';
import { Route, Routes } from 'react-router-dom';
import WholeCountryPage from './pages/WholeCountryPage';
import BookmarkPage from './pages/BookmarkPage';

function MainDisplay({ tabIndex }) {

  // 선택 탭에 따라 메인 화면 출력.
  function drawMainDisplay(tabIndex) {
    switch (tabIndex) {
      case 1:
      case 2:
      case 3:
      case 4:
        return (
          <Routes>
            <Route path="/" element={<SelectRegionPage />} />
            <Route path="/wholeCountryPage" element={<WholeCountryPage />} />
            <Route path="/bookmarkPage" element={<BookmarkPage />} />
          </Routes>
        );
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