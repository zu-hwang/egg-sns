import * as React from 'react';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import * as account from 'store/account';
import useInput from 'src/hooks/useInput';
import { checkLoginInputValid } from 'src/util/inputValidation';

import BlueBtn from 'src/components/ui/BlueBtn';
import OrDivider from 'src/components/ui/OrDivider';
import AccountInput from 'src/components/ui/AccountInput';

import styled from 'styled-components';
import { flexCenter, font, fontBold } from 'styles/theme';
import image from 'src/data/loginPageImageUrl';

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const [validIconOnOff, setValidIconOnOff] = useState(false);
  const [userName, onChangeUserName] = useInput('');
  const [password, onChangePassword] = useInput('');

  const checkInputValid = useCallback((): boolean => {
    return !checkLoginInputValid(userName, password);
  }, [userName, password]);

  const onClickSubmit = useCallback(
    (e) => {
      setValidIconOnOff(true); //  인풋 유효성 검사
      const { result, keyName = '' } = checkLoginInputValid(userName, password);
      if (result) {
        interface BodyData {
          userName?: string;
          email?: string;
          phoneNumber?: string;
          password: string;
        }
        const bodyData: BodyData = { [keyName]: userName, password };
        dispatch(account.requestLogIn(bodyData));
      }
    },
    [userName, password],
  );

  return (
    <Container>
      <FormBox>
        <AccountInput
          forId={'user-name'}
          label={'전화번호, 사용자 이름 또는 이메일'}
          value={userName}
          onChangeValue={onChangeUserName}
          validIconOnOff={validIconOnOff}
        />
        <AccountInput
          forId={'user-password'}
          label={'비밀번호'}
          type={'password'}
          value={password}
          onChangeValue={onChangePassword}
          validIconOnOff={validIconOnOff}
        />
        <BlueBtn disabled={checkInputValid()} onClick={onClickSubmit}>
          {/* 서버요청중일떼 로딩중 로테이션 아이콘 띄우기 */}
          로그인
        </BlueBtn>
      </FormBox>
      <OrDivider />
      <FacebookLoginBtn>
        <Icon /> FaceBook으로 로그인
      </FacebookLoginBtn>
      <ForgotPasswordBtn>비밀번호를 잊으셨나요?</ForgotPasswordBtn>
    </Container>
  );
};

const Container = styled.section`
  width: 268px;
  & > * {
    ${font}
  }
`;

const FormBox = styled.div`
  ${flexCenter}
  flex-direction:column;
  width: 268px;
  border-radius: 2px;
  p:first-child {
    color: ${({ theme }) => theme.secondaryText};
    ${fontBold}
    font-size: 14px;
    margin-bottom: 15px;
  }
`;
const FacebookLoginBtn = styled.button`
  cursor: pointer;
  ${flexCenter}
  width:100%;
  border: none;
  background: transparent;
  ${fontBold}
  font-size: 14px;
  /* background-color: tomato; */
  color: ${({ theme }) => theme.darkBlue};
`;
export const Icon = styled.div`
  background: url(${image.iconSprite}) no-repeat center;
  background-size: 440px 411px;
  background-position: -347px -329px;
  width: 16px;
  height: 16px;
  margin-right: 10px;
`;
const ForgotPasswordBtn = styled.button`
  cursor: pointer;
  width: 100%;
  border: none;
  background: transparent;
  padding-top: 16px;
  font-size: 12px;
  color: ${({ theme }) => theme.darkBlue};
`;
export default LoginForm;
