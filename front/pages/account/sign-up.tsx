import * as React from 'react';
// import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import * as types from 'store/types';
import AccountLayout from 'src/layout/AccountLayout';
import SignUpForm from 'src/components/account/SignUpForm';
import AppDownloadLinkBox from 'src/components/ui/AppDownloadLinkBox';

import styled from 'styled-components';
import { flexCenter, fontBold } from 'styles/theme';

// import API from 'src/util/api';
// import wapper from 'store';

const SignUp = () => {
  const router = useRouter();
  const signUpSuccess = useSelector(
    (state: types.StoreState) => state.account.signUpSuccess,
  );
  // const onClickMoveBtn = React.useCallback(() => {
  //   router.push('/');
  // }, []);

  React.useEffect(() => {
    signUpSuccess && router.push('/');
  }, [signUpSuccess]);
  return (
    <AccountLayout>
      <CenterBox>
        <SignUpForm />
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
  ${flexCenter}
  flex-direction:column;
`;

const LoginNoticeBox = styled.div`
  width: 100%;
  border-radius: 2px;
  margin-top: 10px;
  padding: 30px 0;
  ${flexCenter}
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
    ${fontBold}
    font-size:14px;
    padding: 0;
    margin: 0;
    color: ${({ theme }) => theme.blue};
  }
`;

// export const getServerSideProps: GetServerSideProps = wapper.getServerSideProps(
//   async (context) => {
//     try {
//       const cookie = context.req.headers.cookie
//         ? context.req.headers.cookie
//         : '';
//       if (cookie) API.defaults.headers.Cookie = cookie;
//       context.store.dispatch(store.requestUserData());
//     } catch (error) {
//       console.log(error);
//     }
//   },
// );

export default SignUp;
