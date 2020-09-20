import * as React from 'react';
import * as css from 'styles/theme';
import styled from 'styled-components';
import GBN from 'src/components/header/GBN';

const Header: React.FC = ({}) => {
  return (
    <Container>
      <CenterBox>
        <GBN />
      </CenterBox>
    </Container>
  );
};
const Container = styled.div`
  ${css.flexCenter}
  color: ${(props) => props.theme.title};
  border-bottom: 1px solid ${(props) => props.theme.border};
  width: 100%;
  position: fixed;
  z-index: 2;
  top: 0;
  background-color: ${(props) => props.theme.mainBackground};
`;
const CenterBox = styled.div`
  width: ${(props) => props.theme.response.web + 'px'};
`;

export default Header;
