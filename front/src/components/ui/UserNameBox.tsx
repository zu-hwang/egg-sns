import React from 'react';
import styled from 'styled-components';
import { flexCenter, fontBold } from 'src/styles/theme';
const UserNamebox = ({ username }: { username: string }) => {
  return (
    <Container>
      <UserName>{username}</UserName>
      {/* <UserName>{username}</UserName> */}
    </Container>
  );
};

const Container = styled.div`
  margin-left: 15px;
`;
const UserName = styled.p`
  ${fontBold}
  color: ${(props) => props.theme.primaryText};
`;

export default UserNamebox;
