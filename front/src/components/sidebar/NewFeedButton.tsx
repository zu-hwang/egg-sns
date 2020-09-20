import * as React from 'react';
import * as feed from 'store/feed/';
import * as redux from 'src/hooks/customRedux';
import styled from 'styled-components';
// import * as route from 'next/router';
// import * as redux from 'src/hooks/customRedux';
// import * as saga from 'redux-saga';
// import * as store from 'store';
// import * as account from 'store/account/';

const NewFeedButton: React.FC = () => {
  const dispatch = redux.useDispatch();
  const onClickNewFeedBtn = (e) => {
    // 포스팅 모달 뜨우기
    // 1. 리듀서 작동 > 모달 온
    // 2. 레이아웃(일반) > 최상위에 모달컴포 보이기
    dispatch(feed.setModalNewFeed(true));
  };
  return (
    <Container>
      {/* <Divider /> */}
      <Button onClick={onClickNewFeedBtn}>새 글 작성하기</Button>
    </Container>
  );
};

const Container = styled.div``;
const Button = styled.button`
  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.mainBackground};
  width: 100%;
  padding: 6px 10px;
  margin-bottom: 24px;
  transition: 0.1s ease-in-out all;
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.tableHeader};
    transition: 0.1s ease-in-out all;
  }
`;
export default NewFeedButton;
