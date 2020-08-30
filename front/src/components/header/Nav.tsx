import * as React from 'react';
import * as css from 'styles/theme';
import styled from 'styled-components';
import send from 'public/static/images/svg/send.svg';
import heart from 'public/static/images/svg/heart.svg';
import myPage from 'public/static/images/svg/myPage.svg';

const Nav: React.FC = () => {
  return (
    <>
      <Icon src={send} />
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
`;
export default Nav;
