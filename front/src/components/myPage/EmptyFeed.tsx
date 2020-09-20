import * as React from 'react';
import * as css from 'styles/theme';
import styled from 'styled-components';

const EmptyFeed: React.FC = () => {
  return (
    <Board>
      <p>게시물이 없습니다.</p>
    </Board>
  );
};
const Board = styled.div`
  ${css.flexCenter}
  flex-direction: column;
  width: 100%;
  padding-top: 76px;
  & > p {
    line-height: 1.8em;
    font-size: 14px;
    color: ${({ theme }) => theme.secondaryText};
  }
`;

export default EmptyFeed;
