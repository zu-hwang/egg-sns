import * as React from 'react';
// import { GetServerSideProps } from 'next';
import Head from 'next/head';
import type { AppProps /* AppContext*/ } from 'next/app';
import wapper from 'store';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';
import GlobalStyle from 'styles/global-style';
// import { END } from 'redux-saga';

// 마이앱 == 리액트 함수컴포넌트 타입
// 마이앱의 매개변수들은 <AppPeops> 타입을 갖음.

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
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

// Component: NextComponentType<NextPageContext>;
// AppTree: AppTreeType;
// ctx: NextPageContext;
// router: R;

// export const getServerSideProps: GetServerSideProps = store.default.getServerSideProps(
//   async ({ ...appContext }) => {
//     // console.log('_APP 에서 호출 ');
//     // regular stuff
//     // ...
//     // end the saga
//     appContext.store.dispatch(END);
//     await appContext.store.sagaTask.toPromise();
//   },
// );
// SSR(넥스트)의 redux 설정을 돕는 HOC로 감싸기
export default wapper.withRedux(MyApp);
