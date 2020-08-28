import * as React from 'react';
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from 'src/hooks/useInput';
import OrDivider from 'src/components/ui/OrDivider';
import BlueBtn from 'src/components/ui/BlueBtn';
import AccountInput from 'src/components/ui/AccountInput';
import {
  checkSignUpInputValid,
  seperateContact,
} from 'src/util/inputValidation';
import * as actions from 'store';
import styled from 'styled-components';
import { flexCenter, fontBold } from 'styles/theme';
import logoText from 'public/static/images/svg/logo-text.svg';
import image from 'src/data/loginPageImageUrl';

import { SignUpError } from 'store/account/state';
import errorMessageMap from 'src/util/errorMessage';

const SignUpForm: React.FC = () => {
  const dispatch = useDispatch();
  const signUpError: SignUpError | null = useSelector(
    (state: actions.RootState) => state.account.signUpError,
  );
  const [validIconOnOff, setValidIconOnOff] = useState(false);
  const [otherContact, onChangeOtherContact] = useInput('');
  const [fullName, onChangeFullName] = useInput('');
  const [userName, onChangeUserName] = useInput('');
  const [password, onChangePassword] = useInput('');
  const onClickSubmit = useCallback(
    (e) => {
      setValidIconOnOff(true);
      if (checkSignUpInputValid(otherContact, fullName, userName, password)) {
        // 인풋 유효 검사 문제없으면 회원가입 요청
        const contactKeyName = seperateContact(otherContact);
        const requestBodyData = {
          userName,
          password,
          fullName,
          [contactKeyName]: otherContact,
        };
        console.log('클릭 이벤트', { requestBodyData });
        dispatch(actions.requestSignUp(requestBodyData));
      }
    },
    [otherContact, fullName, userName, password],
  );
  const checkInputValid = useCallback((): boolean => {
    return !checkSignUpInputValid(otherContact, fullName, userName, password);
  }, [otherContact, fullName, userName, password]);

  type KeyName = 'contact' | 'fullName' | 'userName' | 'password';
  const Error400PrintMessage = (keyName: KeyName): string | null => {
    if (
      signUpError !== null &&
      signUpError.code === 400 &&
      signUpError.message !== null
    ) {
      return errorMessageMap[signUpError.message[keyName]];
    }
    return null;
  };
  return (
    <Container>
      <FirstBox>
        <Logo src={logoText} />
        <FormBox>
          <p>친구들의 사진과 동영상을 보려면 가입하세요.</p>
          <BlueBtn name={'facebook'}>
            <Icon /> FaceBook으로 로그인
          </BlueBtn>
          <OrDivider />
          <AccountInput
            forId={'user-otherContact'}
            label={'휴대폰 번호 또는 이메일 주소'}
            value={otherContact}
            onChangeValue={onChangeOtherContact}
            validIconOnOff={validIconOnOff}
            message={Error400PrintMessage('contact')}
          />
          <AccountInput
            forId={'user-fullName'}
            label={'성명'}
            value={fullName}
            onChangeValue={onChangeFullName}
            validIconOnOff={validIconOnOff}
            message={Error400PrintMessage('fullName')}
          />
          <AccountInput
            forId={'user-name'}
            label={'사용자 이름'}
            value={userName}
            onChangeValue={onChangeUserName}
            validIconOnOff={validIconOnOff}
            message={Error400PrintMessage('userName')}
          />
          <AccountInput
            type={'password'}
            forId={'user-password'}
            label={'비밀번호'}
            value={password}
            onChangeValue={onChangePassword}
            validIconOnOff={validIconOnOff}
            message={Error400PrintMessage('password')}
          />
          <BlueBtn disabled={checkInputValid()} onClick={onClickSubmit}>
            가입
          </BlueBtn>
          {false && <p>서버 응답 에러 : 고유아이디 중복</p>}
          <Notice>
            가입하면 Instagram의 <span>약관</span>, <span>데이터 정책</span> 및{' '}
            <span>쿠키 정책</span>에 동의하게 됩니다.
          </Notice>
        </FormBox>
      </FirstBox>
    </Container>
  );
};
const Container = styled.div``;
const FirstBox = styled.div`
  ${flexCenter}
  flex-direction:column;
  padding: 35px 20px;
  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.mainBackground};
`;
const Logo = styled.img`
  height: 45px;
  display: block;
  margin-bottom: 20px;
`;
const FormBox = styled.div`
  ${flexCenter}
  flex-direction:column;
  width: 268px;
  border-radius: 2px;
  /* margin-bottom: 10px; */
  margin: 0 20px 10px;
  p:first-child {
    color: ${({ theme }) => theme.secondaryText};
    ${fontBold}
    font-size: 14px;
    margin-bottom: 15px;
  }
`;
const Notice = styled.p`
  margin-top: 20px;
  font-size: 12px;
  color: ${({ theme }) => theme.secondaryText};
  text-align: center;
  line-height: 1.5em;
  span {
    cursor: pointer;
    font-weight: 500;
  }
`;
const Icon = styled.div`
  background: url(${image.iconSprite}) no-repeat center;
  background-size: 440px 411px;
  background-position: -347px -329px;
  width: 16px;
  height: 16px;
  margin-right: 10px;
`;

export default SignUpForm;
