import * as React from 'react';
import styled from 'styled-components';
import { flexCenter, unit } from 'styles/theme';
import SearchInput from 'src/components/header/SearchInput';
import Nav from 'src/components/header/Nav';
import logo from 'public/static/images/svg/logo.svg';
import logoText from 'public/static/images/svg/logo-text.svg';

const GBN: React.FC = () => {
  return (
    <Container>
      <LogoBox>
        <Logo src={logo} />
        <Divider></Divider>
        <Logo src={logoText} />
      </LogoBox>
      <SearchBox>
        <SearchInput />
      </SearchBox>
      <NavBox>
        <Nav />
      </NavBox>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px 20px;
  display: flex;
  justify-content: space-between;
`;
const LogoBox = styled.div`
  ${flexCenter}
  justify-content:flex-start;
  width: 200px;
  position: relative;
`;

const Logo = styled.img`
  ${(props) =>
    props.src === logo
      ? `height:${6 * unit}px;`
      : `height:${7 * unit}px; position:relative; top:3px`};
`;
// const ReIcon = styled(Icon)``
const Divider = styled.div`
  height: 28px;
  margin: 0 16px;
  width: 1px;
  background-color: ${(props) => props.theme.border};
`;

const SearchBox = styled.div``;

const NavBox = styled.div`
  width: 200px;
  ${flexCenter}
  justify-content: flex-end;
`;

export default GBN;
