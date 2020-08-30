import * as React from 'react';
import * as css from 'styles/theme';
import Link from 'next/link';
import styled from 'styled-components';

import logoText from 'public/static/images/svg/logo-text.svg';
import LoginForm from 'src/components/account/LoginForm';
import PhoneAnimation from 'src/components/account/PhoneAnimation';
import AppDownloadLinkBox from 'src/components/ui/AppDownloadLinkBox';

const Login = () => {
  return (
    <CenterBox>
      <PhoneAnimation />
      <div>
        <FormBox>
          <Logo src={logoText} />
          <LoginForm></LoginForm>
        </FormBox>
        <SignUpNoticeBox>
          <p>계정이 없으신가요?</p>
          <Link href='/account/sign-up' as='sign-up'>
            <span>가입하기</span>
          </Link>
        </SignUpNoticeBox>
        <AppDownloadLinkBox />
      </div>
    </CenterBox>
  );
};

const CenterBox = styled.div`
  ${css.flexCenter}
`;

const Logo = styled.img`
  height: 45px;
  display: block;
  margin: 20px 0 30px;
`;
const FormBox = styled.div`
  ${css.flexCenter}
  flex-direction:column;
  width: 350px;
  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.border};
  padding: 20px;
  background-color: ${({ theme }) => theme.mainBackground};
  margin-bottom: 10px;
`;
const SignUpNoticeBox = styled.div`
  width: 100%;
  border-radius: 2px;
  padding: 30px 0;
  ${css.flexCenter}
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.mainBackground};
  p {
    font-size: 14px;
    font-weight: 300;
    padding-right: 10px;
  }
  span {
    cursor: pointer;
    border: none;
    background: transparent;
    ${css.fontBold}
    font-size:14px;
    padding: 0;
    margin: 0;
    color: ${({ theme }) => theme.blue};
  }
`;

export default Login;
