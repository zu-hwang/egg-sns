import * as React from 'react';
import * as S from 'styled-components';
import * as css from 'styles/theme';
import * as saga from 'redux-saga';
import * as store from 'store';
import * as next from 'next';
import type * as app from 'next/app';
import Head from 'next/head';
import GlobalStyle from 'styles/global-style';

// 마이앱 == 리액트 함수컴포넌트 타입
// 마이앱의 매개변수들은 <AppPeops> 타입을 갖음.

const MyApp: React.FC<app.AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>egg sns</title>
      </Head>
      <S.ThemeProvider theme={css.theme.light}>
        <GlobalStyle />
        <Component {...pageProps} />
      </S.ThemeProvider>
    </>
  );
};

//type RootReducer = (state: StoreState | undefined, action: AnyAction) => any
export const getServerSideProps: next.GetServerSideProps = store.wrapper.getServerSideProps(
  async ({ store, req, res, ...etc }) => {
    store.dispatch(saga.END);
    await store.sagaTask.toPromise();
  },
);

export default store.wrapper.withRedux(MyApp);
