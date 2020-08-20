import React from 'react';
import styled from 'styled-components';
import Header from 'src/components/header/Header';
import { flexCenter } from 'src/styles/theme';

const Layout = ({ children }) => {
  return (
    <Container>
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
  padding: 20px;
  justify-content: space-between;
  border-right: 1px solid ${(props) => props.theme.border};
  border-left: 1px solid ${(props) => props.theme.border};
  margin-top: 70px;
`;

export default Layout;
