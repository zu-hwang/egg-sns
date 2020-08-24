import React from 'react';
import styled from 'styled-components';
import { fontBold, font } from 'src/styles/theme';

const UserNameBox = ({
  username,
  content,
}: {
  username: string;
  content?: string;
}) => {
  return (
    <Container>
      <Name>{username}</Name>
      {content && <ContentOrHashTag>{content}</ContentOrHashTag>}
    </Container>
  );
};

const Container = styled.div`
  margin-left: 15px;
  &:last-child {
    font-weight: normal;
  }
`;
const Name = styled.p`
  ${fontBold}
  font-size :15px;
  color: ${(props) => props.theme.primaryText};
`;
const ContentOrHashTag = styled.p`
  ${font}
  font-size:12px;
  font-weight: normal;
  color: ${(props) => props.theme.midtoneText};
  margin-top: 3px;
`;

export default UserNameBox;
