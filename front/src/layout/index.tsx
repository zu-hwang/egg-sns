import React from 'react';
import styled from 'styled-components';
import Header from 'src/components/header/Header';
import { flexCenter } from 'src/styles/theme';

const Layout = ({ children }) => {
  return (
    <Container>
      {/* 유저정보가 있으면 해더 보이기, 없으면 로그인 페이지 보이기 */}
      <Header />
      <CenterBox>{children}</CenterBox>
    </Container>
  );
};

const Container = styled.div`
  ${flexCenter}
  flex-direction:column;
  width: 100%;
  background-color: ${(props) => props.theme.tableHeader};
  color: ${(props) => props.theme.primaryText};
`;

const CenterBox = styled.div`
  width: ${(props) => props.theme.response.web + 'px'};
  ${flexCenter}
  padding: 0 20px;
  justify-content: space-between;
  /* border-right: 1px solid ${(props) => props.theme.border}; */
  /* border-left: 1px solid ${(props) => props.theme.border}; */
  margin-top: 70px;
`;

export default Layout;
