import * as React from 'react';
import styled from 'styled-components';
import Avatar from 'src/components/ui/Avatar';
import { flexCenter } from 'styles/theme';

const Small: React.FC = () => {
  return (
    <Container>
      <Avatar>
        <span>{'username'}</span>
      </Avatar>
    </Container>
  );
};
const Container = styled.div`
  ${flexCenter}
  flex-direction:column;
  padding-left: 12px;
  margin: 0 2px;
  &:last-child {
    padding-right: 10px;
  }
`;

export default Small;
