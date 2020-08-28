import * as React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Header from 'src/components/header/Header';
import { flexCenter } from 'styles/theme';
import { RootState } from 'store/rootReducer';
import Footer from 'src/components/sidebar/Footer';
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const user = useSelector((state: RootState) => state.account.user);
  return (
    <Container>
      {user && <Header />}
      <CenterBox>{children}</CenterBox>
      <FooterBox>
        <Footer position={'bottom'} />
      </FooterBox>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  ${flexCenter}
  flex-direction:column;
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.tableHeader};
  color: ${(props) => props.theme.primaryText};
`;

const CenterBox = styled.div`
  width: ${(props) => props.theme.response.web + 'px'};
  ${flexCenter}
  padding: 0 20px;
  /* min-height: 100vh; */
  justify-content: space-between;
  /* border-right: 1px solid ${(props) => props.theme.border}; */
  /* border-left: 1px solid ${(props) => props.theme.border}; */
  margin-top: 70px;
`;
const FooterBox = styled.div`
  margin: 50px 0;
`;

export default Layout;
