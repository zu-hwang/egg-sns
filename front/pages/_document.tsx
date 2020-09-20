import * as React from 'react';
import * as StyledComponent from 'styled-components';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
    // ): Promise<DocumentInitialProps> {
  ) {
    const sheet = new StyledComponent.ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      });
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          // ? enhanceApp 에는 사용하드 스타일 툴을 연결-작성
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });
    } catch (error) {
      console.log({ error });
    } finally {
      // sheet.seal();
      /**
       * finally에서 위치에서 sheet.seal() 호출 한 뒤
       * 리턴에서 스타일을 다시 그리게 되면 스타일 2번 그렸다고 오류난다.
       * 그렇다고 씰 함수만 finally에 두면 ? 빌드할때 리턴없어서 오류남!
       */
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
            {/* 추가되는 ui 가 있다면 예, 메터리얼UI와 같은 */}
          </>
        ),
      };
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href='https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;400;500;900&family=Roboto:wght@100;400;500;900&display=swap'
            rel='stylesheet'
          />
          <link // 파비콘 400 에러 임시해결 -> 프로덕션 설정에서 지우기
            rel='shortcut icon'
            href='data:image/x-icon;,'
            type='image/x-icon'></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
