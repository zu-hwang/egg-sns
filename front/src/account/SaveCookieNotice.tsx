import * as React from 'react';
import styled from 'styled-components';
import BlueBtn from 'src/components/ui/BlueBtn';

const SavaCookieNotice = () => {
  return (
    <>
      <CenterBox>
        <SuccessBox>
          <h2>회원가입이 완료되었습니다.</h2>
          <p>잠시 후 메인페이지로 이동합니다.</p>
          <BlueBtn onClick={onClickMoveBtn}>메인페이지로 이동</BlueBtn>
        </SuccessBox>
      </CenterBox>
    </>
  );
};

const CenterBox = styled.div`
  ${flexCenter}
  flex-direction:column;
`;
const SuccessBox = styled.div`
  padding: 80px 100px 65px;
  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.mainBackground};
  text-align: center;
  & > h2 {
    color: ${({ theme }) => theme.blue};
    font-size: 20px;
    margin-bottom: 20px;
  }
  & > p {
    font-size: 14px;
    color: ${({ theme }) => theme.secondaryText};
    margin-bottom: 30px;
  }
`;

export default SaveCookieNotice;
