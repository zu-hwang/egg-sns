import * as React from 'react';
import * as css from 'styles/theme';
import * as antd from '@ant-design/icons';
import styled from 'styled-components';

const ComingSoon: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Board>
      <LoadingOutlined />
      <p>
        <strong>{children}</strong> 페이지는 준비중입니다.
      </p>
    </Board>
  );
};
const Board = styled.div`
  width: 100%;
  padding-top: ${css.gutter + 'px'};
  ${css.flexCenter}
  flex-direction:column;
  & > p {
    line-height: 1.8em;
    font-size: 14px;
    color: ${({ theme }) => theme.secondaryText};
    & > strong {
      font-weight: 500;
    }
  }
`;

const LoadingOutlined = styled(antd.LoadingOutlined)`
  color: ${({ theme }) => theme.secondaryText};
  margin: 30px;
`;

export default ComingSoon;
