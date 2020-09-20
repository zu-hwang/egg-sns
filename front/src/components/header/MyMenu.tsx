import * as React from 'react';
import * as redux from 'src/hooks/customRedux';
import * as account from 'store/account';
import styled from 'styled-components';
import Link from 'next/link';

const MyMenu = () => {
  const dispatch = redux.useDispatch();
  const user = redux.useSelector((s) => s.account.user);
  const onClickLogoutBtn = async () => {
    dispatch(account.requestLogOut());
  };
  return (
    <Container>
      {user !== null && (
        <>
          <UnorderList>
            <Link href={`/${user.userName}`}>
              <List>프로필</List>
            </Link>
            <List>저장됨</List>
            <List>설정</List>
          </UnorderList>
          <Button onClick={onClickLogoutBtn}>로그아웃</Button>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.mainBackground};
`;
const UnorderList = styled.ul`
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;
const List = styled.li`
  font-size: 14px;
  padding: 10px 16px;
  width: 100%;
  text-align: left;
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.tableHeader};
  }
`;
const Button = styled.button`
  font-size: 14px;
  padding: 10px 16px;
  width: 100%;
  text-align: left;
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.tableHeader};
  }
`;
export default MyMenu;
