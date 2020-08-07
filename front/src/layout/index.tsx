import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = ({ children }) => {
  return (
    <Container>
      <h1>테마적용하기🎨</h1>
      {/* <Header />
      {children}
      <Footer /> */}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  background-color: ${(props) => props.theme.mainBackground};
  color: ${(props) => props.theme.primaryText};
`;
export default Layout;
