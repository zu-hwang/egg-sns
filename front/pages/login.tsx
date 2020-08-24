import React from 'react';
import styled from 'styled-components';
import { flexCenter } from 'src/styles/theme';
import Footer from 'src/components/sidebar/Footer';
import PhoneAnimation from 'src/components/account/PhoneAnimation';
import LoginBox from 'src/components/account/LoginBox';

const Login = () => {
  return (
    <Container>
      <CenterBox>
        <PhoneAnimation />
        <LoginBox />
      </CenterBox>
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
const CenterBox = styled.div`
  ${flexCenter}
`;
const FooterBox = styled.div`
  position: fixed;
  bottom: 0;
  margin: 50px 0;
`;

export default Login;
