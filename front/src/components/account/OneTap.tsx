import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as egg from 'store/types';
import * as account from 'store/account';

import BlueBtn from 'src/components/ui/BlueBtn';
import IconKeyHole from 'src/components/ui/icon/IconKeyHole';

import styled from 'styled-components';
import { flexCenter, fontBold } from 'styles/theme';

const OneTap = () => {
  const disparch = useDispatch();
  const logInSuccess = useSelector(
    (state: egg.StoreState) => state.account.logInSuccess,
  );
  const signUpSuccess = useSelector(
    (state: egg.StoreState) => state.account.signUpSuccess,
  );

  const onClickSaveBtn = React.useCallback(() => {}, []);
  const onClickPassBtn = React.useCallback(() => {
    disparch(account.resetSuccess());
  }, [logInSuccess, signUpSuccess]);
  return (
    <Container>
      <CenterBox>
        <IconKeyHole />
        <Title>로그인 정보를 저장하시겠어요?</Title>
        <SubTitle>
          다음에 다시 입력할 필요가 없도록 이 브라우저에 로그인 정보가
          저장됩니다.
        </SubTitle>
        <BlueBtn onClick={onClickSaveBtn}>정보 저장</BlueBtn>
        <BlueBtn onClick={onClickPassBtn} invert={true}>
          나중에 하기
        </BlueBtn>
      </CenterBox>
    </Container>
  );
};
const Container = styled.section`
  ${flexCenter}
  width: 100%;
  padding-bottom: 40px;
`;
const CenterBox = styled.div`
  ${flexCenter}
  flex-direction:column;
  width: 350px;
  padding: 30px 40px 20px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.mainBackground};
`;
const Title = styled.h2`
  text-align: center;
  ${fontBold}
  font-size:14px;
  color: ${({ theme }) => theme.primaryText};
  margin: 20px 0 8px;
`;
const SubTitle = styled.p`
  line-height: 1.4em;
  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.secondaryText};
`;

export default OneTap;
