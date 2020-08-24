import React, { useState } from 'react';
import styled from 'styled-components';
import { col, gutter } from 'src/styles/theme';
import Layout from 'src/layout';
import Profile from 'src/components/myPage/Profile';
import TabMenu from 'src/components/myPage/TabMenu';
import image2 from 'public/static/images/zuzu/2.jpg';
import Footer from 'src/components/sidebar/Footer';
import FeedBoard from 'src/components/myPage/FeedBoard';

// 나의 피드목록 보기
const feed = {
  id: 1,
  imageUrl: image2,
};
const data = {
  userInfo: {
    id: 1,
    username: 'zuzu',
    imageUrl: image2,
    content: '이번 달에 취업할수 있을까?',
  },
  feed: [feed, feed, feed, feed, feed],
  followerCount: 245,
  followCount: 1234,
};
const MyFeed = ({}) => {
  const [tabSelected] = useState('feed');
  return (
    <Layout>
      <Container>
        <Profile
          user={data.userInfo}
          feedCount={data.feed.length}
          followerCount={data.followerCount}
          followCount={data.followCount}
        />
        {/* 현재 url에 따라 활성메뉴 채크 */}
        <TabMenu />
        {tabSelected === 'feed' && <FeedBoard />}
        {/* {tabSelected === 'tv' && <IGTVBoard />}
        {tabSelected === 'saved' && <SavedFeedBoard />}
        {tabSelected === 'taged' && <TagedFeedBoard />} */}
        <Footer position={'bottom'} />
      </Container>
    </Layout>
  );
};
const Container = styled.div`
  width: ${col * 3 + gutter * 2 + 'px'};
  & > :last-child {
    /* 푸터 */
    width: 100%;
    padding: 30px 0;
  }
`;

export default MyFeed;
