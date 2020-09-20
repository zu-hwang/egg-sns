import * as React from 'react';
import * as route from 'next/router';
import * as css from 'styles/theme';
import styled from 'styled-components';
import BlueBtn from 'src/components/ui/BlueBtn';
import IconKeyHole from 'src/components/ui/icon/IconKeyHole';

const NotExistUserPopup: React.FC = () => {
  const router = route.useRouter();
  const [remainingTime, setRemainingTime] = React.useState(5);
  const onClickNextBtn = React.useCallback(() => {
    router.push('/');
  }, []);
  React.useEffect(() => {
    const id = setInterval(() => {
      setRemainingTime(remainingTime - 1);
    }, 1000);
    setTimeout(() => {
      router.push('/');
    }, 5 * 1000);
    return () => {
      clearInterval(id);
    };
  }, [remainingTime]);
  return (
    <CenterBox>
      <IconKeyHole />
      <Title>사용자를 찾을 수 없습니다.</Title>
      <SubTitle>{remainingTime}초 후 홈 화면으로 이동합니다.</SubTitle>
      <BlueBtn onClick={onClickNextBtn} invert={true}>
        홈 화면으로 이동
      </BlueBtn>
    </CenterBox>
  );
};

const CenterBox = styled.div`
  ${css.flexCenter}
  flex-direction:column;
  width: 350px;
  padding: 40px 40px 30px;
  margin-top: 30%;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.mainBackground};
`;
const Title = styled.h2`
  text-align: center;
  ${css.fontBold}
  font-size:14px;
  color: ${({ theme }) => theme.primaryText};
  margin: 20px 0 20px;
`;
const SubTitle = styled.p`
  line-height: 1.4em;
  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.secondaryText};
`;

export default NotExistUserPopup;
