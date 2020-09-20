import * as React from 'react';
import * as route from 'next/router';
import * as redux from 'src/hooks/customRedux';
import styled from 'styled-components';
import send from 'public/static/images/svg/send.svg';
import sendActive from 'public/static/images/svg/send_active.svg';
import heart from 'public/static/images/svg/heart.svg';
import heartActiveBlack from 'public/static/images/svg/heart_active_black.svg';
import home from 'public/static/images/svg/home.svg';
import homeActive from 'public/static/images/svg/home_active.svg';
import Avatar from 'src/components/ui/Avatar';
import { setSelectNav } from 'store/nav';

const Nav: React.FC = () => {
  const router = route.useRouter();
  const dispatch = redux.useDispatch();
  const user = redux.useSelector((s) => s.account.user);
  const currentNav = redux.useSelector((s) => s.nav.currentNav);
  const currentHomeIcon =
    currentNav === 'home' || router.pathname === '/' ? homeActive : home;
  const currentSendIcon = currentNav === 'message' ? sendActive : send;
  const currentHeartIcon =
    currentNav === 'notification' ? heartActiveBlack : heart;
  const onClickNav = (e) => {
    e.persist();
    // console.log(e.target.dataset.nav);
    dispatch(setSelectNav(e.target.dataset.nav));
    if (e.target.dataset.nav === 'home' && router.pathname !== '/')
      router.push('/');
  };
  return (
    <>
      <Icon data-nav={'home'} src={currentHomeIcon} onClick={onClickNav} />
      <Icon data-nav={'message'} src={currentSendIcon} onClick={onClickNav} />
      <Icon
        data-nav={'notification'}
        src={currentHeartIcon}
        onClick={onClickNav}
      />
      {user && <Avatar data-nav={'my'} size={'xsmall'} onClick={onClickNav} />}
    </>
  );
};

const Icon = styled.img`
  height: 22px;
  width: 22px;
  margin-right: 20px;
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    cursor: pointer;
  }
`;

export default Nav;
