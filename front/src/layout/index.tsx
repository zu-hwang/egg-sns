import * as React from 'react';
import * as css from 'styles/theme';
import * as redux from 'src/hooks/customRedux';
import * as route from 'next/router';
import * as feed from 'store/feed/';
import styled from 'styled-components';
import Header from 'src/components/header/Header';
import Footer from 'src/components/sidebar/Footer';
import NewFeed from 'src/components/feedCard/NewFeed';
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = route.useRouter();
  const dispatch = redux.useDispatch();
  const [onFooter, setOnFooter] = React.useState(false);
  const modalNewFeed = redux.useSelector((s) => s.feed.modalNewFeed);
  // const homeFeedList = redux.useSelector((s) => s.feed.homeFeedList);
  const onClickModal = React.useCallback(() => {
    dispatch(feed.setModalNewFeed(false));
  }, [modalNewFeed]);
  React.useEffect(() => {
    window &&
      document.documentElement.scrollHeight >
        document.documentElement.clientHeight * 1.5 &&
      setOnFooter(true);
  }, []);
  return (
    <Div>
      {/* 배경 블러처리를 위해 layout에 위치함! */}
      {modalNewFeed && <NewFeed onClick={onClickModal} />}
      <Container filter={modalNewFeed.toString()}>
        <Header />
        <CenterBox>{children}</CenterBox>
        <FooterBox>
          {(onFooter || router.pathname === '/account/onetap') && (
            <Footer position={'bottom'} />
          )}
        </FooterBox>
      </Container>
    </Div>
  );
};
const Div = styled.div`
  box-sizing: border-box;
`;
const Container = styled.div<{ filter: string }>`
  position: relative;
  ${css.flexCenter}
  justify-content: space-between;
  flex-direction: column;
  ${({ filter }) => filter === 'true' && `filter: blur(100px);`}
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.tableHeader};
  color: ${({ theme }) => theme.primaryText};
`;

const CenterBox = styled.div`
  position: relative;
  ${css.flexCenter}
  width: ${({ theme }) => theme.response.web + 'px'};
  padding: 0 20px;
  margin-top: 24px;
`;

const FooterBox = styled.div`
  margin: 20px 0;
`;

export default Layout;
