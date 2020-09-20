import * as React from 'react';
import * as next from 'next';
import * as route from 'next/router';
import * as redux from 'src/hooks/customRedux';
import * as css from 'styles/theme';
import * as store from 'store';
import * as account from 'store/account/';
import * as feed from 'store/feed/';
import * as nav from 'store/nav/';
import * as saga from 'redux-saga';
import API from 'src/util/api';
import styled from 'styled-components';
import Layout from 'src/layout';
import Profile from 'src/components/myPage/Profile';
import TabMenu from 'src/components/myPage/TabMenu';
import FeedBoard from 'src/components/myPage/FeedBoard';
import ComingSoon from 'src/components/myPage/ComingSoon';
import NotExistUserPopup from 'src/components/myPage/NotExistUserPopup';

const MyFeed = () => {
  const router = route.useRouter();
  const dispatch = redux.useDispatch();
  const user = redux.useSelector((s) => s.account.user);
  const loading = redux.useSelector((s) => s.feed.loading);
  const paging = redux.useSelector((s) => s.feed.paging);
  const mypageProfile = redux.useSelector((s) => s.feed.mypageProfile);
  const mypageFeedList = redux.useSelector((s) => s.feed.mypageFeedList);
  type TabSelected = 'feed' | 'igtv' | 'saved' | 'taged';
  const [tabSelected, setTabSelected] = React.useState<TabSelected>('feed');
  const onClickSetTabMenu = (e) => {
    if (e.target.dataset.tabname) setTabSelected(e.target.dataset.tabname);
  };
  React.useEffect(() => {
    if (!user) router.push('/'); // 유저정보 없으면 메인화면으로 읻동
  }, [user]);

  React.useEffect(() => {
    const onScrollDown = () => {
      if (window && document && mypageFeedList) {
        if (
          window.scrollY + document.documentElement.clientHeight >
          document.documentElement.scrollHeight - 300
        ) {
          mypageProfile &&
            !loading && // 로딩중이 아닐때
            paging && // 더 로드할 내용이 있을경우
            dispatch(
              feed.requestMyPageFeedList({
                userName: mypageProfile.userName,
                paging,
              }),
            );
        }
      }
    };
    window && window.addEventListener('scroll', onScrollDown);
    return () => {
      window && window.removeEventListener('scroll', onScrollDown);
    };
  }, [mypageProfile, loading, paging]);
  return (
    <Layout>
      {!mypageProfile && <NotExistUserPopup />}
      {mypageProfile && (
        <Container>
          <Profile />
          {/* 현재 url에 따라 활성메뉴 채크 */}
          <TabMenu tabSelected={tabSelected} onClick={onClickSetTabMenu} />
          {tabSelected === 'feed' && <FeedBoard />}
          {tabSelected === 'igtv' && <ComingSoon>IGTV</ComingSoon>}
          {tabSelected === 'saved' && <ComingSoon>저장됨</ComingSoon>}
          {tabSelected === 'taged' && <ComingSoon>태그됨</ComingSoon>}
        </Container>
      )}
    </Layout>
  );
};
const Container = styled.div`
  width: ${css.col * 3 + css.gutter * 2 + 'px'};
`;

export const getServerSideProps: next.GetServerSideProps = store.wrapper.getServerSideProps(
  async (context) => {
    try {
      const cookie = context.req.headers.cookie || '';
      if (context.req && cookie) API.defaults.headers.Cookie = cookie;
      // ? 로그인 유저데이터가 없으면 {로그인 후 사용하세요} 페이지 띄우기
      const userName = context.query.userName;
      context.store.dispatch(account.requestUserData()); // 로그인 유저 데이터 받아오기
      if (userName !== null && typeof userName === 'string') {
        // 현재 페이지에 필요한 유저데이터 받아오기
        context.store.dispatch(feed.requestMypageProfile(userName));
        context.store.dispatch(feed.requestMyPageFeedList({ userName }));
      }
      context.store.dispatch(nav.setSelectNav(null));
      context.store.dispatch(saga.END);
      await context.store.sagaTask.toPromise();
    } catch (error) {
      console.log(error.response);
    }
  },
);

export default MyFeed;
