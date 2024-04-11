import MenuTab from './MenuTab';
import SelectRegion from './SelectRegion';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <ContentContainer className="display-width">
        <Outlet />
      </ContentContainer>
      <MenuTab />
      <SelectRegion />
    </>
  );
}

export default Layout;

const ContentContainer = styled.main`
  height: calc(100vh - 70px);
`;