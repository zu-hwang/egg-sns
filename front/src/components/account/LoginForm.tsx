import * as React from 'react';
import * as redux from 'src/hooks/customRedux';
import * as css from 'styles/theme';
import * as antd from '@ant-design/icons';
import * as account from 'store/account';
import useInputDefault from 'src/hooks/useInputDefault';

import BlueBtn from 'src/components/ui/BlueBtn';
import OrDivider from 'src/components/ui/OrDivider';
import LoginInput from 'src/components/ui/LoginInput';

import styled from 'styled-components';

import image from 'src/data/loginPageImageUrl';

const LoginForm: React.FC = () => {
  const dispatch = redux.useDispatch();
  const isLoading = redux.useSelector((state) => state.account.isLoading);
  const logInError = redux.useSelector((state) => state.account.logInError);
  const userIdValidMessage = redux.useSelector(
    (state) => state.account.userIdValidMessage,
  );
  const passwordValidMessage = redux.useSelector(
    (state) => state.account.passwordValidMessage,
  );
  const [iconOn, setIconOn] = React.useState(false);
  const [userId, onChangeUserId] = useInputDefault('');
  const [password, onChangePassword] = useInputDefault('');
  const smallCheck = React.useCallback((): boolean => {
    if (userId.length > 0 && password.length > 7) {
      return !true;
    }
    return !false;
  }, [userId, password]);
  const onClickSubmit = React.useCallback(
    (e) => {
      setIconOn(true); // 에러 표시 활성화
      const bodyData = {
        password,
        userId,
      };
      dispatch(account.requestLogIn(bodyData));
    },
    [userId, password],
  );
  return (
    <Container>
      <FormBox>
        <LoginInput
          forId={'user-id'}
          label={'전화번호, 사용자 이름 또는 이메일'}
          value={userId}
          onChange={onChangeUserId}
          iconOn={iconOn}
          iconError={userIdValidMessage}
        />
        <LoginInput
          forId={'user-password'}
          label={'비밀번호'}
          type={'password'}
          value={password}
          onChange={onChangePassword}
          iconOn={iconOn}
          iconError={passwordValidMessage}
        />
        <BlueBtn disabled={smallCheck()} onClick={onClickSubmit}>
          {isLoading ? <antd.LoadingOutlined /> : '로그인'}
        </BlueBtn>
      </FormBox>
      <OrDivider />
      <FacebookLoginBtn>
        <Icon /> FaceBook으로 로그인
      </FacebookLoginBtn>
      {/* 로그인 실패 할 경우 메세지 출력 */}
      {iconOn &&
        logInError &&
        logInError.code !== 500 &&
        typeof logInError.message === 'string' && (
          <Error>{logInError.message}</Error>
        )}
      <ForgotPasswordBtn>비밀번호를 잊으셨나요?</ForgotPasswordBtn>
    </Container>
  );
};

const Container = styled.section`
  width: 268px;
  & > * {
    ${css.font}
  }
`;

const FormBox = styled.div`
  ${css.flexCenter}
  flex-direction:column;
  width: 268px;
  border-radius: 2px;
  p:first-child {
    color: ${({ theme }) => theme.secondaryText};
    ${css.fontBold}
    font-size: 14px;
    margin-bottom: 15px;
  }
`;
const FacebookLoginBtn = styled.button`
  cursor: pointer;
  ${css.flexCenter}
  width:100%;
  border: none;
  background: transparent;
  ${css.fontBold}
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
const Error = styled.div`
  ${css.flexCenter}
  font-size:12px;
  color: ${({ theme }) => theme.red};
  margin-top: 15px;
`;
export default LoginForm;
