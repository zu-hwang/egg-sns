import React from 'react';
import styled from 'styled-components';
import { flexCenter, fontBold } from 'src/styles/theme';

const BlueButton = ({
  children,
  name,
  disabled = false,
  onClick,
}: {
  children: any;
  name?: string;
  disabled?: boolean;
  onClick?: (e) => void;
}) => {
  return (
    <Button disabled={disabled} name={name} onClick={onClick}>
      {children}
    </Button>
  );
};
const Button = styled.button.attrs(({ disabled }) => ({
  // disabled: disabled,
  disabled: disabled,
}))<{ disabled: boolean }>`
  cursor: pointer;
  border: none;
  padding: 6px;
  margin-top: 8px;
  width: 100%;
  border-radius: 4px;
  ${fontBold}
  font-size: 14px;
  color: ${({ theme }) => theme.mainBackground};
  background-color: ${({ theme }) => theme.blue};
  ${flexCenter}
  & > div {
    ${({ name }) =>
      name === 'facebook' && `background-position: -364px -329px;`}
  }
  &:disabled {
    cursor: not-allowed;
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  }
`;

export default BlueButton;
