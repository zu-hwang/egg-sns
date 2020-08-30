import * as React from 'react';
import * as redux from 'src/hooks/customRedux';
import * as css from 'styles/theme';
import styled from 'styled-components';
import Footer from 'src/components/sidebar/Footer';
import Header from 'src/components/header/Header';

interface AccountLayoutProps {
  children: React.ReactNode;
}
const AccountLayout: React.FC<AccountLayoutProps> = ({ children }) => {
  const user = redux.useSelector((s) => s.account.user);
  return (
    <Container>
      {user && <Header />}
      {children}
      <FooterBox>
        <Footer position={'bottom'} />
      </FooterBox>
    </Container>
  );
};

const Container = styled.section`
  width: 100vw;
  height: 100vh;
  ${css.flexCenter}
  flex-direction:column;
  position: relative;
  background-color: ${({ theme }) => theme.tableHeader};
`;
const FooterBox = styled.div`
  position: fixed;
  bottom: 0;
  margin: 50px 0;
`;

export default AccountLayout;
