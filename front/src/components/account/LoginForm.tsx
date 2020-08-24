import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { flexCenter, font, fontBold } from 'src/styles/theme';
import image from 'src/data/loginPageImageUrl';
import OrDivider from 'src/components/ui/OrDivider';
import BlueBtn from 'src/components/ui/BlueBtn';
import AccountInput from 'src/components/ui/AccountInput';
import useInput from 'hooks/useInput';
import { checkLoginInputValid } from 'src/util/InputValid';

const LoginForm = () => {
  const [validIconOnOff, setValidIconOnOff] = useState(false);
  const [username, onChangeUsername] = useInput('');
  const [password, onChangePassword] = useInput('');

  const checkInputValid = useCallback((): boolean => {
    return !checkLoginInputValid(username, password);
  }, [username, password]);

  const onClickSubmit = useCallback(
    (e) => {
      // ! 버튼클릭
      // ! 인풋 유효성 검사
      setValidIconOnOff(true);
      checkLoginInputValid(username, password);
      // ! 유효성 검사 문제 없을 > 서버에 요청
      // ! isLoading = true  > 화면에 로딩 로테이션 이미지 돌리기
      // ? 서버응답
      // ? 1. 아이디 없음
      // ? 2. 비밀번호 틀림
      // ? 3. 200 성공 > JWT 리턴
      // ? 4. 500 서버에러
      // ! isLoading=false > 화면로딩 끝
      // ? 상태코드 200 > JWT 쿠키에 저장
      // 참고 : https://medium.com/@anMagpie/next-js-jwt-auth-example-app-4ea4d7f49fa3
      // 메인페이지에서 JWT존재유무에 따라 컴포넌트 변경하여 보일경우
      // 메인페이지와 login페이지 따로 둘 경우 > 메인화면으로 페이지 이동
      // ! 유효성 검사 문제 있음 > 에러 state true 설정
      // ? error 상태값에 따라 화면 랜더링 > ErrorComponent 출력
    },
    [username, password],
  );

  return (
    <Container>
      <FormBox>
        <AccountInput
          forId={'user-name'}
          label={'전화번호, 사용자 이름 또는 이메일'}
          value={username}
          onChangeValue={onChangeUsername}
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
