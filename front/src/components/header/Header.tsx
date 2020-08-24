import React from 'react';
import styled from 'styled-components';
import GBN from './GBN';
import { flexCenter } from '../../styles/theme';

const Header = ({}) => {
  return (
    <Container>
      <CenterBox>
        <GBN />
      </CenterBox>
    </Container>
  );
};

const Container = styled.div`
  ${flexCenter}
  color: ${(props) => props.theme.title};
  border-bottom: 1px solid ${(props) => props.theme.border};
  width:100%;
  position:fixed;
z-index: 999;
  top:0;
  background-color:${(props) => props.theme.mainBackground}
`;
const CenterBox = styled.div`
  width: ${(props) => props.theme.response.web + 'px'};
`;
export default Header;
