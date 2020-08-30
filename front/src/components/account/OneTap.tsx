import * as React from 'react';
import * as redux from 'src/hooks/customRedux';
import * as route from 'next/router';
import * as account from 'store/account';
import * as css from 'styles/theme';
import * as antd from '@ant-design/icons';
import styled from 'styled-components';
import BlueBtn from 'src/components/ui/BlueBtn';
import IconKeyHole from 'src/components/ui/icon/IconKeyHole';

const OneTap: React.FC = () => {
  const router = route.useRouter();
  const dispatch = redux.useDispatch();
  const user = redux.useSelector((s) => s.account.user);
  const isLoading = redux.useSelector((s) => s.account.isLoading);
  const onClickSaveBtn = React.useCallback(async () => {
    if (user) {
      dispatch(account.requestCookieExpiry());
      setTimeout(() => {
        // 로딩창 보여주고
        router.push('/');
      }, 2 * 1000);
    }
  }, [user]);
  const onClickNextBtn = React.useCallback(() => {
    router.push('/');
  }, []);

  return (
    <Container>
      <CenterBox>
        <IconKeyHole />
        <Title>로그인 정보를 저장하시겠어요?</Title>
        <SubTitle>
          다음에 다시 입력할 필요가 없도록 이 브라우저에 로그인 정보가
          저장됩니다.
        </SubTitle>
        <BlueBtn onClick={onClickSaveBtn}>
          {isLoading ? <antd.LoadingOutlined /> : '정보 저장'}
        </BlueBtn>
        <BlueBtn onClick={onClickNextBtn} invert={true}>
          나중에 하기
        </BlueBtn>
      </CenterBox>
    </Container>
  );
};

const Container = styled.section`
  ${css.flexCenter}
  width: 100%;
  padding-bottom: 40px;
`;
const CenterBox = styled.div`
  ${css.flexCenter}
  flex-direction:column;
  width: 350px;
  padding: 30px 40px 20px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.mainBackground};
`;
const Title = styled.h2`
  text-align: center;
  ${css.fontBold}
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
