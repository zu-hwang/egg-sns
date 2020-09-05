import * as React from 'react';
import * as css from 'styles/theme';
import * as redux from 'src/hooks/customRedux';
import * as feed from 'store/feed/';
import styled from 'styled-components';
import Header from 'src/components/header/Header';
import Footer from 'src/components/sidebar/Footer';
import NewFeed from 'src/components/feedCard/NewFeed';
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = redux.useDispatch();
  const modalNewFeed = redux.useSelector((s) => s.feed.modalNewFeed);
  const onClickModal = React.useCallback(() => {
    dispatch(feed.setModalNewFeed(false));
  }, [modalNewFeed]);
  return (
    <Div>
      {modalNewFeed && <NewFeed onClick={onClickModal} />}
      <Container filter={modalNewFeed.toString()}>
        <Header />
        <div></div>
        <CenterBox>{children}</CenterBox>
        <FooterBox>
          <Footer position={'bottom'} />
        </FooterBox>
      </Container>
    </Div>
  );
};
const Div = styled.div`
  box-sizing: border-box;
`;
const Container = styled.div<{ filter: string }>`
  ${css.flexCenter}
  ${({ filter }) =>
    filter === 'true' && `filter: blur(100px);`}
  position: relative;
  ${css.flexCenter}
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.tableHeader};
  color: ${(props) => props.theme.primaryText};
`;

const CenterBox = styled.div`
  ${css.flexCenter}
  width: ${(props) => props.theme.response.web + 'px'};
  padding: 0 20px;
  /* min-height: 100vh; */
  justify-content: space-between;
  /* border-right: 1px solid ${(props) => props.theme.border}; */
  /* border-left: 1px solid ${(props) => props.theme.border}; */
  margin-top: 70px;
`;
const FooterBox = styled.div`
  margin: 20px 0;
`;

export default Layout;
