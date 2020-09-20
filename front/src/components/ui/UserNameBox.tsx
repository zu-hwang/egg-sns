import * as React from 'react';
import * as css from 'styles/theme';
import styled from 'styled-components';

interface UserNameBoxProps {
  username?: string | null;
  content?: string | null;
}
const UserNameBox: React.FC<UserNameBoxProps> = ({ username, content }) => {
  return (
    <Container>
      <Name>{username}</Name>
      {content && <ContentOrHashTag>{content}</ContentOrHashTag>}
    </Container>
  );
};

UserNameBox.defaultProps = {
  username: '',
  content: '',
};

const Container = styled.div`
  margin-left: 15px;
  &:last-child {
    font-weight: normal;
  }
`;
const Name = styled.p`
  ${css.fontBold}
  font-size :15px;
  color: ${(props) => props.theme.primaryText};
`;
const ContentOrHashTag = styled.p`
  ${css.font}
  font-size:12px;
  font-weight: normal;
  color: ${(props) => props.theme.midtoneText};
  margin-top: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default UserNameBox;
