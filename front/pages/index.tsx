import * as React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import wapper from 'store';
import API from 'src/util/api';
import * as types from 'store/types';
import * as account from 'store/account/';

import Login from 'src/components/account/Login';
import Footer from 'src/components/sidebar/Footer';
import OneTap from 'src/components/account/OneTap';
import FeedCard from 'src/components/feedCard/FeedCard';
import StorySlide from 'src/components/storyCard/StorySlide';
import LoginUserInfo from 'src/components/sidebar/LoginUserInfo';
import RecommandList from 'src/components/sidebar/RecommandList';
import AccountLayout from 'src/layout/AccountLayout';
import Layout from 'src/layout';

import styled from 'styled-components';
import userImage from 'public/static/images/zuzu/zuzu.jpg';
import imageSlide1 from 'public/static/images/zuzu/1.jpg';

const feed = {
  id: 2,
  author: '____hi_world_',
  authorImage: userImage,
  likes: 22,
  feedImage: [
    imageSlide1,
    // imageSlide2
  ],
  content: '오늘은 날씨가 참 좋네요 🍄',
  comments: [
    {
      id: 1,
      author: 'old_manman',
      content: '날도 좋고 오늘 만나!',
      likes: 1,
    },
    {
      id: 2,
      author: 'buravo.kon',
      content: '요리조리보아도 예쁨',
      likes: 1,
    },
  ],
};
const feedList = [feed, feed, feed];
interface FeedListProps {
  noCookie: boolean;
}
const FeedList: React.FC<FeedListProps> = ({ noCookie }) => {
  const router = useRouter();
  const logInSuccess = useSelector(
    (state: types.StoreState) => state.account.logInSuccess,
  );
  const user = useSelector((state: types.StoreState) => state.account.user);
  return (
    <>
      {user === null && (
        <AccountLayout>
          <Login />
        </AccountLayout>
      )}
      {user && logInSuccess && (
        <AccountLayout>
          <OneTap />
        </AccountLayout>
      )}
      {!logInSuccess && user !== null && (
        <Layout>
          <Container>
            <Main>
              <StorySlide mode={'small'} />
              <StorySlide mode={'large'} />
              {/* <StoryCardL /> */}
              {feedList.map((feed, index) => {
                return <FeedCard key={index} feed={feed} />;
              })}
            </Main>
            <Aside>
              <LoginUserInfo />
              <RecommandList />
              <Footer />
            </Aside>
          </Container>
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

//! Next에서 redux를 사용할때 getXXXProps에서 문제가 생김 그러므로, next-redux-wapper를 사용하여  getXXXProps를 사용.. 한다함.. 음
export const getServerSideProps: GetServerSideProps = wapper.getServerSideProps(
  async (context) => {
    try {
      console.log('메인 페이지 입니다');
      const cookie = context.req ? context.req.headers.cookie : '';
      if (context.req && cookie) API.defaults.headers.Cookie = cookie;
      context.store.dispatch(account.requestUserData());
      context.store.dispatch(END);
      await context.store.sagaTask.toPromise();
    } catch (error) {
      console.log(error);
    }
  },
);

export default FeedList;
