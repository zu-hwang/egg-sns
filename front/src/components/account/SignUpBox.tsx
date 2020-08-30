import * as React from 'react';
import * as css from 'styles/theme';
import styled from 'styled-components';
import BlueBtn from 'src/components/ui/BlueBtn';
import OrDivider from 'src/components/ui/OrDivider';
import SignUpFrom from 'src/components/account/SignUpForm';
import image from 'src/data/loginPageImageUrl';
import logoText from 'public/static/images/svg/logo-text.svg';

const SignUpBox: React.FC = () => {
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
          <SignUpFrom />
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
  ${css.flexCenter}
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
  ${css.flexCenter}
  flex-direction:column;
  width: 268px;
  border-radius: 2px;
  /* margin-bottom: 10px; */
  margin: 0 20px 10px;
  p:first-child {
    color: ${({ theme }) => theme.secondaryText};
    ${css.fontBold}
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

export default SignUpBox;
