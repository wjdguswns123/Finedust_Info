import './MenuTab.css';
import './common.css';
import { useNavigate } from 'react-router-dom';

// 하단 메뉴 탭 출력.
const MenuTab = () => {
  const navigate = useNavigate();

  return (
    <div className="menu-tab">
      <button className="menu-tab-button" onClick={ () => navigate("/") }>내 지역</button>
      <button className="menu-tab-button" onClick={ () => navigate("/wholeCountryPage") }>전국 미세먼지</button>
      <button className="menu-tab-button" onClick={ () => navigate("/bookmarkPage") }>즐겨찾기</button>
    </div>
  );
}

export default MenuTab;