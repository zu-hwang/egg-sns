import * as React from 'react';
import styled from 'styled-components';
import * as css from 'styles/theme';

const OrDivider: React.FC = () => {
  return (
    <Devider>
      <div></div>
      <span>또는</span>
      <div></div>
    </Devider>
  );
};
const Devider = styled.div`
  ${css.flexCenter}
  margin: 20px 0;
  width: 100%;
  div {
    width: 100%;
    border-top: 1px solid ${(props) => props.theme.border};
  }
  span {
    width: 100%;
    text-align: center;
    ${css.fontBold}
    font-size:13px;
    color: ${({ theme }) => theme.secondaryText};
  }
`;
export default OrDivider;
