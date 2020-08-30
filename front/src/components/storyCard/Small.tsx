import * as React from 'react';
import * as css from 'styles/theme';
import styled from 'styled-components';
import Avatar from 'src/components/ui/Avatar';

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
  ${css.flexCenter}
  flex-direction:column;
  padding-left: 12px;
  margin: 0 2px;
  &:last-child {
    padding-right: 10px;
  }
`;

export default Small;
