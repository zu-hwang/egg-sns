import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

interface IProps {
  styleTags: Array<React.ReactElement<{}>>;
}
class MyDocument extends Document<IProps> {
  static async getInitialProps(ctx: DocumentContext) {
    // 서버사이드 렌더링 시 스타일 미리 적용시키기 === 스타일 변경 깜빡임 제거됨
    const sheet = new ServerStyleSheet();
    const page = ctx.renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />),
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
    // const initialProps = await Document.getInitialProps(ctx);
    // return initialProps;
  }

  render() {
    return (
      <Html lang='ko'>
        <Head>
          <link
            href='https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;400;500;900&family=Roboto:wght@100;400;500;900&display=swap'
            rel='stylesheet'
          />
          {/* ServerStyleSheet를 사용하여 style element로 요소생성 head안에 삽입 */}
          {this.props.styleTags}
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
