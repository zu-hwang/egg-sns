import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { checkInput } from 'src/util/InputValid';
import { fontBold } from 'src/styles/theme';

export type ForID =
  | 'user-otherContact'
  | 'user-fullname'
  | 'user-name'
  | 'user-password';

const AccountInput = ({
  forId,
  value,
  label,
  type = 'text',
  onChangeValue,
  validIconOnOff = false,
}: {
  forId: ForID;
  value: string;
  label?: string;
  type?: string;
  validIconOnOff?: boolean;
  onChangeValue: (e: any) => void;
}) => {
  const [active, setActive] = useState(false);
  const [reType, setReType] = useState(type);
  const TogglePasswordVisible = useCallback(() => {
    if (reType === 'password') {
      setReType('text');
    } else if (reType === 'text') {
      setReType('password');
    }
  }, [reType]);
  const handleOnFocus = useCallback(() => {
    setActive(true);
  }, []);
  const handleOnBlur = useCallback(() => {
    // console.log({ value });
    if (value.length === 0) {
      setActive(false);
    }
  }, [value]);
  return (
    <Box>
      <RightBox>
        {validIconOnOff ? (
          checkInput(value, forId) ? (
            <ValidPass />
          ) : (
            <ValidError />
          )
        ) : null}
        {type === 'password' && value.length > 0 && (
          <VisiblePasswordBtn onClick={TogglePasswordVisible}>
            {reType === 'password' ? '비밀번호 표시' : '숨기기'}
          </VisiblePasswordBtn>
        )}
      </RightBox>
      <Input
        type={reType}
        id={forId}
        name={forId}
        value={value}
        onChange={onChangeValue}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        isActive={active}
      />
      {label && (
        <Label isActive={active} htmlFor={forId}>
          {label}
        </Label>
      )}
    </Box>
  );
};

const Box = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input<{ isActive: boolean }>`
  padding: 17px 10px 3px;
  margin-bottom: 6px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.tableHeader};
  outline: none;
  transition: 0.2s ease-in-out all;
  color: ${({ theme }) => theme.primaryText};
  &:focus {
    transition: 0.2s ease-in-out all;
    border: 1px solid ${({ theme }) => theme.lightBlue};
  }
  &:focus ~ label {
    ${({ isActive }) =>
      isActive &&
      `
      transition: 0.2s ease-in-out all;
      top: 7px;
      font-size: 10px;
      `}
  }
`;
/* ${인풋}:focus ~ ${라벨} { : 이 방식은 작동 안함.. 왜안뒘..? */

const Label = styled.label<{ isActive: boolean }>`
  color: ${({ theme }) => theme.secondaryText};
  position: absolute;
  text-align: left;
  left: 0;
  width: 100%;
  top: ${({ isActive }) => (isActive ? '7px' : '12px')};
  font-size: ${({ isActive }) => (isActive ? '10px' : '12px')};
  transition: 0.2s ease-in-out all;
  padding-left: 12px;
`;

const RightBox = styled.div`
  position: absolute;
  top: 11px;
  right: 12px;
`;
const VisiblePasswordBtn = styled.span`
  cursor: pointer;
  ${fontBold}
  font-size: 14px;
  color: ${({ theme }) => theme.primaryText};
  transition: 0.2s ease-in-out all;
  margin-left: 8px;
  position: relative;
  top: -2px;
`;

const ValidError = styled(CloseCircleOutlined)`
  color: ${({ theme }) => theme.red};
`;
const ValidPass = styled(CheckCircleOutlined)`
  color: ${({ theme }) => theme.disable};
`;
export default AccountInput;
