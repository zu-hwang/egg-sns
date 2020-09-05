import * as React from 'react';
import * as css from 'styles/theme';
import * as API from 'src/util/api';
import styled from 'styled-components';
import Nav from 'src/components/header/Nav';
import logo from 'public/static/images/svg/logo.svg';
import logoText from 'public/static/images/svg/logo-text.svg';
import SearchInput from 'src/components/header/SearchInput';

const GBN: React.FC = () => {
  const onClickLogout = async () => {
    const result = await API.logOut();
    console.log('로그아웃 ', { type: typeof result });
  };
  return (
    <Container>
      <LogoBox>
        <Logo src={logo} onClick={onClickLogout} />
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
  ${css.flexCenter}
  justify-content:flex-start;
  width: 200px;
  position: relative;
`;

const Logo = styled.img`
  ${(props) =>
    props.src === logo
      ? `height:${6 * css.unit}px;`
      : `height:${7 * css.unit}px; position:relative; top:3px`};
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
  ${css.flexCenter}
  justify-content: flex-end;
`;

export default GBN;
