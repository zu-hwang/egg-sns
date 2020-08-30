import * as React from 'react';
import * as redux from 'src/hooks/customRedux';
import * as route from 'next/router';
import * as account from 'store/account';
import * as valid from 'src/util/inputValidation';
import styled from 'styled-components';
import useInput from 'src/hooks/useInput';
import BlueBtn from 'src/components/ui/BlueBtn';
import AccountInput from 'src/components/ui/AccountInput';
import * as antd from '@ant-design/icons';

const SignUpForm: React.FC = () => {
  const dispatch = redux.useDispatch();
  const router = route.useRouter();
  const isLoading = redux.useSelector((s) => s.account.isLoading);
  const signUpSuccess = redux.useSelector((s) => s.account.signUpSuccess);
  const signUpError = redux.useSelector((s) => s.account.signUpError);
  const contactValidMessage = redux.useSelector(
    (s) => s.account.contactValidMessage,
  );
  const emailValidMessage = redux.useSelector(
    (s) => s.account.emailValidMessage,
  );
  const phoneNumberValidMessage = redux.useSelector(
    (s) => s.account.phoneNumberValidMessage,
  );
  const userNameValidMessage = redux.useSelector(
    (s) => s.account.userNameValidMessage,
  );
  const fullNameValidMessage = redux.useSelector(
    (s) => s.account.fullNameValidMessage,
  );
  const passwordValidMessage = redux.useSelector(
    (s) => s.account.passwordValidMessage,
  );
  const [iconOn, setIconOn] = React.useState(false);
  const [contact, onChangeContact] = useInput('contact');
  const [fullName, onChangeFullName] = useInput('fullName');
  const [userName, onChangeUserName] = useInput('userName');
  const [password, onChangePassword] = useInput('password');

  const onClickSubmit = React.useCallback(
    (e) => {
      setIconOn(true);
      // 1. 키네임 분류
      const keyName = valid.seperateKeyName('contact', contact);
      console.log('SignUpFrom전송버튼 클릭 > 키네임 확인: ', { keyName });
      const bodyData = {
        userName,
        password,
        fullName,
        [keyName]: contact,
      };
      console.log('클릭 이벤트', { bodyData });
      dispatch(account.requestSignUp(bodyData));
    },
    [contact, fullName, userName, password],
  );
  const smallCheck = (): boolean => {
    if (
      contact.length > 0 &&
      fullName.length > 0 &&
      userName.length > 0 &&
      password.length > 7
    )
      return !true;
    return !false;
  };
  const errorMessage = React.useCallback((): string | null => {
    if (contactValidMessage) return contactValidMessage;
    if (emailValidMessage) return emailValidMessage;
    return phoneNumberValidMessage;
  }, [contactValidMessage, emailValidMessage, phoneNumberValidMessage]);
  React.useEffect(() => {
    if (signUpSuccess) router.push('/account/onetap');
  }, [signUpSuccess]);

  return (
    <>
      <AccountInput
        forId={'user-contact'}
        label={'휴대폰 번호 또는 이메일 주소'}
        value={contact}
        onChange={onChangeContact}
        iconOn={iconOn}
        iconError={errorMessage()}
      />
      <AccountInput
        forId={'user-fullName'}
        label={'성명'}
        value={fullName}
        onChange={onChangeFullName}
        iconOn={iconOn}
        iconError={fullNameValidMessage}
      />
      <AccountInput
        forId={'user-name'}
        label={'사용자 이름'}
        value={userName}
        onChange={onChangeUserName}
        iconOn={iconOn}
        iconError={userNameValidMessage}
      />
      <AccountInput
        type={'password'}
        forId={'user-password'}
        label={'비밀번호'}
        value={password}
        onChange={onChangePassword}
        iconOn={iconOn}
        iconError={passwordValidMessage}
      />
      <BlueBtn disabled={smallCheck()} onClick={onClickSubmit}>
        {isLoading ? <antd.LoadingOutlined /> : '가입하기'}
      </BlueBtn>
      {/* 여기에 회원가입 실패 에러메세지 출력 */}
      {signUpError &&
        signUpError.code !== 500 &&
        typeof signUpError.message === 'string' && (
          <Error>{signUpError.message}</Error>
        )}
    </>
  );
};

const Error = styled.p`
  text-align: center;
  font-size: 12px;
  color: ${({ theme }) => theme.red};
  margin-top: 15px;
`;
export default SignUpForm;
