import * as React from 'react';
import * as saga from 'redux-saga';
import * as account from 'store/account';
import * as store from 'store';
import * as next from 'next';
import API from 'src/util/api';
import Layout from 'src/layout';
import OneTap from 'src/components/account/OneTap';

const OneTapPage: React.FC = () => {
  return (
    <Layout>
      <OneTap></OneTap>
    </Layout>
  );
};

export const getServerSideProps: next.GetServerSideProps = store.wrapper.getServerSideProps(
  async (context) => {
    try {
      console.log('쿠키저장 안내 페이지 입니다');
      // const cookie = context.req ? context.req.headers.cookie : '';
      const cookie = context.req.headers.cookie || '';
      console.log('쿠키는 ?', { cookie });
      if (context.req && cookie) API.defaults.headers.Cookie = cookie;
      context.store.dispatch(account.requestUserData());
      context.store.dispatch(saga.END);
      await context.store.sagaTask.toPromise();
    } catch (error) {
      console.log('쿠키안내 페이지 SSR 에러:', error);
    }
  },
);
export default OneTapPage;
