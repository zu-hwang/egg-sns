import * as React from 'react';
import * as redux from 'src/hooks/customRedux';
import * as css from 'styles/theme';
import * as account from 'store/account';
import * as store from 'store';
import * as route from 'next/router';
import * as next from 'next';
import * as saga from 'redux-saga';
import API from 'src/util/api';
import Link from 'next/link';
import styled from 'styled-components';
import SignUpBox from 'src/components/account/SignUpBox';
import AccountLayout from 'src/layout/AccountLayout';
import AppDownloadLinkBox from 'src/components/ui/AppDownloadLinkBox';

const SignUp = () => {
  const router = route.useRouter();
  const signUpSuccess = redux.useSelector(
    (state) => state.account.signUpSuccess,
  );
  const user = redux.useSelector((state) => state.account.user);
  React.useEffect(() => {
    signUpSuccess && user && router.push('/account/onetap');
  }, [signUpSuccess, user]);

  return (
    <AccountLayout>
      <CenterBox>
        <SignUpBox />
        <LoginNoticeBox>
          <p>계정이 있으신가요?</p>
          <Link href='/'>
            <span>로그인</span>
          </Link>
        </LoginNoticeBox>
        <AppDownloadLinkBox />
      </CenterBox>
    </AccountLayout>
  );
};

const CenterBox = styled.div`
  ${css.flexCenter}
  flex-direction:column;
`;

const LoginNoticeBox = styled.div`
  width: 100%;
  border-radius: 2px;
  margin-top: 10px;
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

//! Next에서 redux를 사용할때 getXXXProps에서 문제가 생김 그러므로, next-redux-wrapper를 사용하여  getXXXProps를 사용.. 한다함.. 음
export const getServerSideProps: next.GetServerSideProps = store.wrapper.getServerSideProps(
  async (context) => {
    try {
      console.log('메인 페이지 입니다');
      const cookie = context.req ? context.req.headers.cookie : '';
      if (context.req && cookie) API.defaults.headers.Cookie = cookie;
      context.store.dispatch(account.requestUserData());
      context.store.dispatch(saga.END);
      await context.store.sagaTask.toPromise();
    } catch (error) {
      console.log('메인페이지 SSR 에러:', error);
    }
  },
);

export default SignUp;
