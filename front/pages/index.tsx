import React from 'react';
import styled from 'styled-components';
// import SideBar from 'src/components/home/SideBar';
import FeedCard from 'src/components/feedCard/FeedCard';
import StorySlide from 'src/components/storyCard/StorySlide';
import LoginUserInfo from 'src/components/sidebar/LoginUserInfo';
import RecommandList from 'src/components/sidebar/RecommandList';
import Footer from 'src/components/sidebar/Footer';
import Layout from 'src/layout';
import userImage from 'public/static/images/zuzu/zuzu.jpg';
import imageSlide1 from 'public/static/images/zuzu/1.jpg';
// import imageSlide2 from 'public/static/images/zuzu/2.jpg';

// 메인화면 피드리스트 보여주기
// const userInfo = {
//   id: 1,
//   username: '____hi_world_',
//   userImage: userImage,
//   content: '.... 🕳',
// };
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
export default FeedList;
