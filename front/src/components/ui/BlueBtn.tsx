import * as React from 'react';
import styled from 'styled-components';
import { flexCenter, fontBold } from 'styles/theme';

interface BlueButtonProps {
  children: any;
  name?: string;
  disabled?: boolean;
  invert?: boolean;
  onClick?: (e: any) => void; // e의 타입 설정하기 , 돔 이벤트 객체 타입!
}
const BlueButton: React.FC<BlueButtonProps> = ({
  children,
  name,
  disabled = false,
  onClick,
  invert = false,
}) => {
  return (
    <Button invert={invert} disabled={disabled} name={name} onClick={onClick}>
      {children}
    </Button>
  );
};
const Button = styled.button.attrs(({ disabled }) => ({
  // disabled: disabled,
  disabled: disabled,
}))<{ disabled: boolean; invert: boolean }>`
  cursor: pointer;
  border: none;
  padding: 6px;
  margin-top: 8px;
  width: 100%;
  border-radius: 4px;
  ${fontBold}
  font-size: 14px;
  color: ${({ theme, invert }) => (invert ? theme.blue : theme.mainBackground)};
  background-color: ${({ theme, invert }) =>
    invert ? theme.mainBackground : theme.blue};
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
