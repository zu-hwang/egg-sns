import * as React from 'react';
import * as route from 'next/router';
import * as css from 'styles/theme';
import * as nav from 'store/nav/';
import * as redux from 'src/hooks/customRedux';
import styled from 'styled-components';
import Nav from 'src/components/header/Nav';
import logo from 'public/static/images/svg/logo.svg';
import logoText from 'public/static/images/svg/logo-text.svg';
import SearchInput from 'src/components/header/SearchInput';
import NotificationBox from 'src/components/ui/NotificationBox';
import MyMenu from 'src/components/header/MyMenu';

const GBN: React.FC = () => {
  const popRef = React.useRef<HTMLDivElement>(null);
  const router = route.useRouter();
  const dispatch = redux.useDispatch();
  const user = redux.useSelector((s) => s.account.user);
  const currentNav = redux.useSelector((s) => s.nav.currentNav);
  const onClickMoveHome = () => {
    if (router.pathname !== '/') router.push('/');
  };
  const checkCurrentRef = (e) => {
    if (!popRef.current?.contains(e.target)) {
      dispatch(nav.setSelectNav(null));
      window.removeEventListener('mousedown', checkCurrentRef);
    }
  };
  const checkMouseWhellMove = (e) => {
    const wheel = e.wheelDelta;
    // wheelDelta가 음수=스크롤다운/양수=스크롤업/0 움직이지 않음
    if (wheel !== 0) {
      dispatch(nav.setSelectNav(null));
      window.removeEventListener('mousewheel', checkMouseWhellMove);
    }
  };
  React.useEffect(() => {
    if (currentNav && window && popRef.current)
      window.addEventListener('mousedown', checkCurrentRef);
    window.addEventListener('mousewheel', checkMouseWhellMove);
    return () => {
      window.removeEventListener('mousedown', checkCurrentRef);
      window.removeEventListener('mousewheel', checkMouseWhellMove);
    };
  }, [popRef, currentNav]);
  return (
    <Container>
      <LogoBox>
        <Logo src={logoText} onClick={onClickMoveHome} />
      </LogoBox>
      <SearchBox>
        <SearchInput />
      </SearchBox>
      <NavBox>
        <Nav />
        {currentNav === 'my' && user && (
          <Wrapper ref={popRef}>
            <NotificationBox>
              <MyMenu />
            </NotificationBox>
          </Wrapper>
        )}
      </NavBox>
    </Container>
  );
};

const Container = styled.div`
  padding: 12px 20px;
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
  &:hover {
    cursor: pointer;
  }
`;

const SearchBox = styled.div``;

const NavBox = styled.div`
  position: relative;
  width: 200px;
  ${css.flexCenter}
  justify-content: flex-end;
`;

const Wrapper = styled.div`
  position: absolute;
  right: -20px;
  top: 42px;
  /* 하트알람칭은 - (아이콘 크키 + 아이콘 왼쪽 마진 값) 빼주기*/
  /* left: ${(props) => props.theme.response.web + 'px'}; */
  z-index: 1;
`;
export default GBN;
