import React from 'react';
import styled from 'styled-components';
import { flexCenter } from 'src/styles/theme';

const SideBar = () => {
  return <Container>사이드바</Container>;
};

const Container = styled.div`
  ${flexCenter}
  align-items:start;
  color: ${(props) => props.theme.primaryText};
`;

export default SideBar;
