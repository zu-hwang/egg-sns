import * as React from 'react';
import * as next from 'next';
import * as route from 'next/router';
import * as redux from 'src/hooks/customRedux';
import * as saga from 'redux-saga';
import * as store from 'store';
import * as egg from 'store/types';
import * as feed from 'store/feed/';
import * as account from 'store/account/';
import * as nav from 'store/nav/';

import API from 'src/util/api';
import Login from 'src/components/account/Login';
import Footer from 'src/components/sidebar/Footer';
import FeedCard from 'src/components/feedCard/FeedCard';
import StorySlide from 'src/components/storyCard/StorySlide';
import LoginUserInfo from 'src/components/sidebar/LoginUserInfo';
import RecommandList from 'src/components/sidebar/RecommandList';
import NewFeedButton from 'src/components/sidebar/NewFeedButton';
import AccountLayout from 'src/layout/AccountLayout';
import Alert from 'src/components/ui/Alert';
import Layout from 'src/layout';
import styled from 'styled-components';

const FeedList: React.FC = () => {
  const router = route.useRouter();
  const dispatch = redux.useDispatch();
  const paging = redux.useSelector((s) => {
    return s.feed.paging;
  });
  const pagingAlert = redux.useSelector((s) => s.feed.pagingAlert);
  const loading = redux.useSelector((s) => s.feed.loading);
  const homeFeedList = redux.useSelector((s) => s.feed.homeFeedList);
  const logInSuccess = redux.useSelector((s) => s.account.logInSuccess);
  const user = redux.useSelector((s) => s.account.user);
  React.useEffect(() => {
    logInSuccess && user && router.push('account/onetap');
    if (user === null) {
      console.log('유저정보 없음 세로고침하자!');
      console.log(user);
      router.push('/'); // 로그인 정보 날라가면 새로고침
    }
  }, [logInSuccess, user]);
  React.useEffect(() => {
    const onScrollDown = () => {
      if (window && document && homeFeedList) {
        if (
          window.scrollY + document.documentElement.clientHeight >
          document.documentElement.scrollHeight - 300
        ) {
          !paging && dispatch(feed.setAlertAutoOn('paging')); // 더이상 불러올 페이지가 없습니다 경고창 출력!최하단에 띄우기
          homeFeedList &&
            !loading && // 로딩중이 아닐때
            paging &&
            dispatch(feed.requestHomeFeedList(paging));
        }
      }
    };
    window && window.addEventListener('scroll', onScrollDown);
    return () => {
      window && window.removeEventListener('scroll', onScrollDown);
    };
  }, [homeFeedList, loading, paging]);
  return (
    <>
      {!user && (
        <AccountLayout>
          <Login />
        </AccountLayout>
      )}
      {!logInSuccess && user !== null && (
        <Layout>
          <Container>
            <Main>
              <StorySlide mode={'small'} />
              <StorySlide mode={'large'} />
              {homeFeedList.length > 0 &&
                (homeFeedList as egg.IFeed[]).map((feed: egg.IFeed) => (
                  <FeedCard key={feed.id} feed={feed} />
                ))}
            </Main>
            <Aside>
              <LoginUserInfo />
              <NewFeedButton />
              <RecommandList />
              <Footer />
            </Aside>
          </Container>
          {pagingAlert && (
            <AlertWrapper>
              <Alert>더 이상 불러올 게시글이 없습니다 😵</Alert>
            </AlertWrapper>
          )}
        </Layout>
      )}
    </>
  );
};
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;
const Main = styled.section`
  flex-grow: 1;
  padding-top: 60px;
  max-width: 614px;
`;

const Aside = styled.aside`
  width: 320px;
  margin-left: 28px;
  margin-top: 60px;
  align-items: start;
  color: ${(props) => props.theme.primaryText};
`;
const AlertWrapper = styled.div`
  position: absolute;
  bottom: 60px;
  right: 18px;
`;

//! Next에서 redux를 사용할때 getXXXProps에서 문제가 생김 그러므로, next-redux-wrapper를 사용하여  getXXXProps를 사용.. 한다함.. 음
export const getServerSideProps: next.GetServerSideProps = store.wrapper.getServerSideProps(
  async (context) => {
    try {
      const cookie = context.req.headers.cookie || '';
      if (context.req && cookie) API.defaults.headers.Cookie = cookie;
      context.store.dispatch(feed.setPaging(null)); //초기화
      context.store.dispatch(account.requestUserData());
      context.store.dispatch(feed.requestHomeFeedList());
      context.store.dispatch(account.requestRecommand()); // 추천계정
      context.store.dispatch(nav.setSelectNav('home'));
      context.store.dispatch(saga.END);
      await context.store.sagaTask.toPromise();
    } catch (error) {
      // console.log(error.response);
    }
  },
);

export default FeedList;
