import * as React from 'react';
import { useSelector } from 'react-redux';
import Footer from 'src/components/sidebar/Footer';
import Header from 'src/components/header/Header';
import * as store from 'store';
import styled from 'styled-components';
import { flexCenter } from 'styles/theme';

interface AccountLayoutProps {
  children: React.ReactNode;
}
const AccountLayout: React.FC<AccountLayoutProps> = ({ children }) => {
  const user = useSelector((state: store.RootState) => state.account.user);
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
  ${flexCenter}
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
