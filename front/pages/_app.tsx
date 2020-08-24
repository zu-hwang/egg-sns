import React, { FC } from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
// import type { AppContext } from 'next/app';
import wrapper from 'redux/store';
import withReduxSaga from 'next-redux-saga';
import { ThemeProvider } from 'styled-components';
import { theme } from 'src/styles/theme';
import GlobalStyle from 'src/styles/global-style';

// 마이앱 == 리액트 함수컴포넌트 타입
// 마이앱의 매개변수들은 <AppPeops> 타입을 갖음.
const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>egg sns</title>
      </Head>
      <ThemeProvider theme={theme.light}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

// SSR(넥스트)의 redux 설정을 돕는 HOC로 감싸기
export default wrapper.withRedux(withReduxSaga(MyApp));
