import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { flexCenter, fontBold } from 'src/styles/theme';
import Footer from 'src/components/sidebar/Footer';
import SignUpForm from 'src/components/account/SignUpForm';
import AppDownloadLinkBox from 'src/components/ui/AppDownloadLinkBox';

const SignUp = () => {
  return (
    <Container>
      <CenterBox>
        <SignUpForm />
        <LoginNoticeBox>
          <p>계정이 있으신가요?</p>
          <Link href='/login'>
            <span>로그인</span>
          </Link>
        </LoginNoticeBox>
        <AppDownloadLinkBox />
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
  flex-direction:column;
`;
const FooterBox = styled.div`
  position: fixed;
  bottom: 0;
  margin: 50px 0;
`;

const LoginNoticeBox = styled.div`
  width: 100%;
  border-radius: 2px;
  margin-top:10px;
  padding: 30px 0;
  ${flexCenter}
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.mainBackground};
  p {
    font-size:14px;
    font-weight:300;
    padding-right:10px;
  }
  span {
    cursor: pointer;
    border:none;
    background:transparent;
    ${fontBold}
    font-size:14px;
    padding:0;
    margin:0;
    color:${({ theme }) => theme.blue};
  }
`;

export default SignUp;
