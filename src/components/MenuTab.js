import './MenuTab.css';
import './common.css';

// 하단 메뉴 탭 출력.
const MenuTab = ({onTabClick}) => {
  return (
    <div className="menu-tab">
      <button className="menu-tab-button" onClick={ () => onTabClick(1) }>내 지역</button>
      <button className="menu-tab-button" onClick={ () => onTabClick(2) }>전국 미세먼지</button>
      <button className="menu-tab-button" onClick={ () => onTabClick(3) }>즐겨찾기</button>
    </div>
  );
}

export default MenuTab;