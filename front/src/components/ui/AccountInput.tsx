import * as React from 'react';
import { useState, useCallback } from 'react';
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { checkInput } from 'src/util/inputValidation';
import { flexCenter, fontBold } from 'styles/theme';
import styled from 'styled-components';

export type ForID =
  | 'user-otherContact'
  | 'user-fullName'
  | 'user-name'
  | 'user-password';
interface AccountInputProps {
  forId: ForID;
  value: string;
  label?: string;
  type?: string;
  validIconOnOff?: boolean;
  message?: string | null;
  onChangeValue: (e: any) => void;
}

const AccountInput: React.FC<AccountInputProps> = (props) => {
  const { forId, value, label, type, message } = props;
  const { validIconOnOff, onChangeValue } = props;
  const [active, setActive] = useState(false);
  const [reType, setReType] = useState(type);
  const TogglePasswordVisible = useCallback(() => {
    if (reType === 'password') setReType('text');
    if (reType === 'text') setReType('password');
  }, [reType]);
  const handleOnFocus = useCallback(() => {
    setActive(true);
  }, []);
  const handleOnBlur = useCallback(() => {
    if (value.length === 0) {
      setActive(false);
    }
  }, [value]);
  const printValidIcon = (): boolean => {
    if (!checkInput(value, forId)) return true;
    if (message && !checkInput(value, forId)) return true;
    if (message) return true;
    console.log({ value, forId }, checkInput(value, forId));
    return false;
  };
  return (
    <>
      <Box>
        <RightBox>
          {validIconOnOff &&
            (printValidIcon() ? <ValidError /> : <ValidPass />)}
          {/* {validIconOnOff ? (
            printValidIcon() ? (
              <ValidError />
            ) : (
              
            )
          ) : null} */}
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
      {message && <ErrorMessage>{message}</ErrorMessage>}
    </>
  );
};
AccountInput.defaultProps = {
  type: 'text',
  validIconOnOff: false,
  message: null,
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

const ErrorMessage = styled.div`
  ${flexCenter}
  font-size:12px;
  color: ${({ theme }) => theme.red};
  margin-bottom: 10px;
`;
export default AccountInput;
