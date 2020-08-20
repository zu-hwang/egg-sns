import React from 'react';
import styled from 'styled-components';
import { flexCenter } from 'src/styles/theme';
// import SideBar from 'src/components/home/SideBar';
import FeedCard from 'src/components/feedCard/FeedCard';
import StorySlide from 'src/components/storyCard/StorySlide';
import userImage from 'public/static/images/zuzu/zuzu.jpg';
import imageSlide1 from 'public/static/images/zuzu/1.jpg';
import imageSlide2 from 'public/static/images/zuzu/2.jpg';

// 메인화면 피드리스트 보여주기
const userInfo = {
  username: '____hi_world_',
};
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
const FeedList = ({}) => {
  return (
    <Container>
      <Main>
        <StorySlide mode={'small'} />
        <StorySlide mode={'large'} />
        {/* <StoryCardL /> */}
        {feedList.map((feed) => {
          return <FeedCard feed={feed} />;
        })}
      </Main>
      <Aside>
        {/* <MyCard /> */}
        {/* <RecommandList /> */}
        {/* <SideBar /> */}
        {/* <Footer /> */}
      </Aside>
    </Container>
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
  /* border-left: 1px solid ${(props) => props.theme.border}; */
  margin-left: 20px;
`;

export default FeedList;
