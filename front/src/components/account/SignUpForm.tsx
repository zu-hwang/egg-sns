import React, { useState, useCallback } from 'react';
import useInput from 'hooks/useInput';
import styled from 'styled-components';
import { flexCenter, fontBold } from 'src/styles/theme';
import { checkSignUpInputValid } from 'src/util/InputValid';
import logoText from 'public/static/images/svg/logo-text.svg';
import image from 'src/data/loginPageImageUrl';
import OrDivider from 'src/components/ui/OrDivider';
import BlueBtn from 'src/components/ui/BlueBtn';
import AccountInput from 'src/components/ui/AccountInput';

const SignUpForm = () => {
  const [validIconOnOff, setValidIconOnOff] = useState(false);
  const [otherContact, onChangeOtherContact] = useInput('');
  const [fullname, onChangeFullname] = useInput('');
  const [username, onChangeUsername] = useInput('');
  const [password, onChangePassword] = useInput('');
  const onClickSubmit = useCallback(
    (e) => {
      // ! 버튼클릭
      // ! 인풋 유효성 검사
      setValidIconOnOff(true);
      checkSignUpInputValid(otherContact, fullname, username, password);
      // ! 유효성 검사 문제 없을 > 서버에 요청
      // ? 서버응답
      // ? 1. 고유값 중복 : 아이디/핸드폰번호/이메일 다시 작성
      // ? 2. 비밀번호 유효성 에러
      // ? 3. 500 서버에러
      // ! 유효성 검사 문제 있음 > 에러 state true 설정
      // ? error 상태값에 따라 화면 랜더링 > ErrorComponent 출력
    },
    [otherContact, fullname, username, password],
  );
  // const onKeypressEnter = useCallback((e) => {}, []);
  const checkInputValid = useCallback((): boolean => {
    return !checkSignUpInputValid(otherContact, fullname, username, password);
  }, [otherContact, fullname, username, password]);

  console.log('렌더:', { otherContact, fullname, username, password });
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
          />
          <AccountInput
            forId={'user-fullname'}
            label={'성명'}
            value={fullname}
            onChangeValue={onChangeFullname}
            validIconOnOff={validIconOnOff}
          />
          <AccountInput
            forId={'user-name'}
            label={'사용자 이름'}
            value={username}
            onChangeValue={onChangeUsername}
            validIconOnOff={validIconOnOff}
          />
          <AccountInput
            type={'password'}
            forId={'user-password'}
            label={'비밀번호'}
            value={password}
            onChangeValue={onChangePassword}
            validIconOnOff={validIconOnOff}
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
