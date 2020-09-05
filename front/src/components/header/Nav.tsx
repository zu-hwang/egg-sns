import * as React from 'react';
import * as css from 'styles/theme';
import * as feed from 'store/feed/';
import * as redux from 'src/hooks/customRedux';
import styled from 'styled-components';
import send from 'public/static/images/svg/send.svg';
import heart from 'public/static/images/svg/heart.svg';
import myPage from 'public/static/images/svg/myPage.svg';

const Nav: React.FC = () => {
  const dispatch = redux.useDispatch();
  const onClickNewFeedBtn = (e) => {
    // 포스팅 모달 뜨우기
    // 1. 리듀서 작동 > 모달 온
    // 2. 레이아웃(일반) > 최상위에 모달컴포 보이기
    dispatch(feed.setModalNewFeed(true));
  };
  return (
    <>
      <Icon src={send} onClick={onClickNewFeedBtn} />
      <Icon src={heart} />
      <Icon src={myPage} />
    </>
  );
};

const Icon = styled.img`
  height: ${6 * css.unit + 'px'};
  width: ${6 * css.unit + 'px'};
  margin-right: 25px;
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    cursor: pointer;
  }
`;

export default Nav;
