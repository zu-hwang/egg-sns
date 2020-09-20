import * as React from 'react';
// import * as route from 'next/router';
// import * as css from 'styles/theme';
import styled from 'styled-components';

interface INotificationBox {
  children?: React.ReactNode;
}
const NotificationBox: React.FC<INotificationBox> = ({ children }) => {
  return (
    <Container>
      <ContentBox>
        <div>{children}</div>
      </ContentBox>
      <Wrapper>
        <Triangle></Triangle>
      </Wrapper>
    </Container>
  );
};
const Container = styled.div`
  position: relative;
  background-color: transparent;
`;
const ContentBox = styled.div`
  overflow: auto;
  min-height: 54px;
  max-height: 400px;
  min-width: 180px;
  max-width: 350px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.mainBackground};
  box-shadow: 0px 0px 5px ${({ theme }) => theme.border};
  & > div:first-child {
    position: relative;
    z-index: 1;
  }
`;
const Wrapper = styled.div`
  position: absolute;
  top: 0px;
  width: 100%;
`;
const Triangle = styled.div`
  position: absolute;
  top: -7px;
  right: 25px;
  box-shadow: 0px 0px 5px ${({ theme }) => theme.border};
  transform: rotate(45deg);
  background-color: ${({ theme }) => theme.mainBackground};
  width: 16px;
  height: 16px;
`;
export default NotificationBox;
