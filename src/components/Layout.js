import MenuTab from './MenuTab';
import SelectRegion from './SelectRegion';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

const layout = (props) => {
  return (
    <>
      <ContentContainer className="display-width">
        <Outlet />
      </ContentContainer>
      <MenuTab onTabClick={props.onTabClick} />
      <SelectRegion onTabClick={props.onTabClick} />
    </>
  );
}

export default layout;

const ContentContainer = styled.main`
  height: calc(100vh - 70px);
`;