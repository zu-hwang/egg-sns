import * as React from 'react';
import * as css from 'styles/theme';
import styled from 'styled-components';

interface IAlert {
  children: React.ReactNode;
}
const Alert: React.FC<IAlert> = ({ children }) => {
  return (
    <Container>
      <Title>{children}</Title>
    </Container>
  );
};

const Container = styled.div`
  ${css.flexCenter}
  border: ${({ theme }) => theme.border};
  padding: 24px 36px;
  width: 300px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.mainBackground};
  box-shadow: 0px 0px 5px ${({ theme }) => theme.border};
`;
const Title = styled.h2`
  text-align: center;
  ${css.fontBold}
  font-size:14px;
  color: ${({ theme }) => theme.red};
`;
export default Alert;
