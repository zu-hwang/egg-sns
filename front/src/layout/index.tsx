import * as React from 'react';
import * as css from 'styles/theme';
import styled from 'styled-components';
import Header from 'src/components/header/Header';
import Footer from 'src/components/sidebar/Footer';
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      <div></div>
      <Header />
      <CenterBox>{children}</CenterBox>
      <FooterBox>
        <Footer position={'bottom'} />
      </FooterBox>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  ${css.flexCenter}
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.tableHeader};
  color: ${(props) => props.theme.primaryText};
`;

const CenterBox = styled.div`
  ${css.flexCenter}
  width: ${(props) => props.theme.response.web + 'px'};
  padding: 0 20px;
  /* min-height: 100vh; */
  justify-content: space-between;
  /* border-right: 1px solid ${(props) => props.theme.border}; */
  /* border-left: 1px solid ${(props) => props.theme.border}; */
  margin-top: 70px;
`;
const FooterBox = styled.div`
  margin: 20px 0;
`;

export default Layout;
