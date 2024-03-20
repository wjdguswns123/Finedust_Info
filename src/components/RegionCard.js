import './RegionCard.css';
// import tempAlert from "../images/tempAlret.png";
// import tempAlert1 from "../images/tempAlret1.png";

function getStateIcon(value)
{
  if(value > 50)
  {
    return "/images/tempAlret.png";
  }

  return "/images/tempAlret1.png";
}

// 지역 정보 카드 출력.
const RegionCard = ({regionName, value}) => {
  return (
    <div className="region-card">
      <div className="region-name">{regionName}</div>
      <div className="dust-value">{value}</div>
      <img src={getStateIcon(value)} alt="" className="state-img"></img>
    </div>
  );
}

export default RegionCard;