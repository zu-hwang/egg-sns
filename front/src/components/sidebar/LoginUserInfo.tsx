import * as React from 'react';
import styled from 'styled-components';
import { flexCenter } from 'styles/theme';
import Avatar from 'src/components/ui/Avatar';
import UserNameBox from 'src/components/ui/UserNameBox';
import userImage from 'public/static/images/zuzu/zuzu.jpg';

const userInfo = {
  id: 1,
  // username: '____hi_world_',
  username: 'zuzu',
  userImage: userImage,
  content: '.... 🕳',
};
const LoginUserInfo: React.FC = ({}) => {
  return (
    <Container>
      <Avatar url={userInfo.userImage} />
      <UserNameBox username={userInfo.username} content={userInfo.content} />
    </Container>
  );
};
const Container = styled.div`
  ${flexCenter}
  justify-content:flex-start;
  /* border: 1px solid tomato; */
  width: 100%;
  padding: 16px 0;
`;

export default LoginUserInfo;
