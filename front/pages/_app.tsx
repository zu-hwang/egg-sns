import type { AppProps } from 'next/app';
// import type { AppContext } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { theme } from './../src/styles/theme';
import GlobalStyle from '../src/styles/global-style';
import Layout from '../src/layout';
// 리덕스 랩퍼
import wrapper from '../src/redux/configureStore';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme.dark}>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//   return { ...appProps };
// };

// 리덕스 랩퍼로 감싸서 내보내깅
// <Provider store={store}></Provider> 사용하지 않는다!
export default wrapper.withRedux(MyApp);
