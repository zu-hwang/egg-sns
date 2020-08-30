import * as React from 'react';
import * as antd from '@ant-design/icons';
import * as css from 'styles/theme';
import styled from 'styled-components';

export type ForID = 'user-id' | 'user-password';
interface LoginInputProps {
  forId: ForID;
  value: string;
  label?: string;
  type?: string;
  iconOn?: boolean;
  iconError?: string | null;
  onChange: (e: any) => void;
}
const LoginInput: React.FC<LoginInputProps> = (props) => {
  const [active, setActive] = React.useState(false);
  const [reType, setReType] = React.useState(props.type);
  const TogglePasswordVisible = React.useCallback(() => {
    if (reType === 'password') setReType('text');
    if (reType === 'text') setReType('password');
  }, [reType]);
  const onFocus = React.useCallback(() => {
    setActive(true);
  }, []);
  const onBlur = React.useCallback(() => {
    if (props.value.length === 0) {
      setActive(false);
    }
  }, [props.value]);
  return (
    <>
      <Box>
        <RightBox>
          {props.iconOn &&
            (props.iconError === 'ok' ? (
              <ValidPass />
            ) : (
              props.iconError === 'validationError' && <ValidError />
            ))}
          {props.type === 'password' && props.value.length > 0 && (
            <VisiblePasswordBtn onClick={TogglePasswordVisible}>
              {reType === 'password' ? '비밀번호 표시' : '숨기기'}
            </VisiblePasswordBtn>
          )}
        </RightBox>
        <Input
          type={reType}
          id={props.forId}
          name={props.forId}
          value={props.value}
          onChange={props.onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          isActive={active}
        />
        {props.label && (
          <Label isActive={active} htmlFor={props.forId}>
            {props.label}
          </Label>
        )}
      </Box>
    </>
  );
};

LoginInput.defaultProps = {
  type: 'text',
  iconOn: false,
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
  transition: 0.3s ease-in-out all;
  color: ${({ theme }) => theme.primaryText};
  &:focus {
    transition: 0.3s ease-in-out all;
    border: 1px solid ${({ theme }) => theme.lightBlue};
  }
  &:focus ~ label {
    ${({ isActive }) =>
      isActive &&
      `
      transition: 0.2s ease-in-out all;
      top: 6px;
      font-size: 8px;
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
  top: ${({ isActive }) => (isActive ? '6px' : '12px')};
  font-size: ${({ isActive }) => (isActive ? '8px' : '12px')};
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
  ${css.fontBold}
  font-size: 14px;
  color: ${({ theme }) => theme.primaryText};
  transition: 0.2s ease-in-out all;
  margin-left: 8px;
  position: relative;
`;

const ValidError = styled(antd.CloseCircleOutlined)`
  color: ${({ theme }) => theme.red};
`;
const ValidPass = styled(antd.CheckCircleOutlined)`
  color: ${({ theme }) => theme.disable};
`;

export default LoginInput;
