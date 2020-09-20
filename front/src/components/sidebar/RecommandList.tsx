import * as React from 'react';
import * as css from 'styles/theme';
import * as redux from 'src/hooks/customRedux';
import * as account from 'store/account';
import * as egg from 'store/types';
import styled from 'styled-components';
import Avatar from 'src/components/ui/Avatar';
import UserNameBox from 'src/components/ui/UserNameBox';
import { IRecommand } from 'store/types';

// const UserList = [{}, {}, {}, {}, {}];

const RecommandList: React.FC = () => {
  const dispatch = redux.useDispatch();
  const recommandList = redux.useSelector((s) => s.account.recommandList);
  const contentMap = React.useCallback(
    (recommandUser: egg.IRecommand): string => {
      // const random = (max: number): number => {
      //   return Math.floor(Math.random() * max);
      // };
      if (recommandUser.type === 'New') return 'Instagram 신규 가입';
      if (recommandUser.type === 'Random')
        return `회원님을 위한 추천 회원입니다`;
      if (recommandUser.type === 'Follower') return `회원님을 팔로우합니다`;
      if (recommandUser.type === 'Target' && recommandUser.xFriend) {
        console.log(recommandUser.xFriend.length);
        if (recommandUser.xFriend.length === 1)
          return `${recommandUser.xFriend[0]}님이 팔로우합니다`;
        if (recommandUser.xFriend.length > 1)
          return `${recommandUser.xFriend[0]}님 외 ${
            recommandUser.xFriend.length - 1
          }명이 팔로우합니다`;
      }
      return '';
    },
    [recommandList],
  );
  const onClickRelationBtn = (e) => {
    const targetId = parseInt(e.target.dataset.relationid, 10);
    let followStatus = false;
    recommandList.forEach((RCMUser) => {
      RCMUser.id === targetId &&
        (followStatus = RCMUser.followStatus ? RCMUser.followStatus : false);
    });
    if (followStatus) dispatch(account.requestUnFollow(targetId));
    if (!followStatus) dispatch(account.requestFollow(targetId));
  };
  return (
    <Container>
      <Header>
        <span>회원님을 위한 추천</span>
        <button>모두 보기</button>
      </Header>
      <List>
        {(recommandList as IRecommand[]).map((user, index) => {
          return (
            <Li key={user.id}>
              <div>
                <Avatar url={user.imageUrl} size={'small'} />
                <UserNameBox
                  username={user.userName}
                  content={contentMap(user)}
                />
              </div>
              <FollowBtn data-relationid={user.id} onClick={onClickRelationBtn}>
                {user.followStatus ? '팔로잉' : '팔로우'}
              </FollowBtn>
            </Li>
          );
        })}
      </List>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  ${css.flexCenter};
  flex-direction: column;
`;
const Header = styled.header`
  width: 100%;
  margin-bottom: 12px;
  ${css.flexCenter}
  justify-content:space-between;
  span {
    ${css.fontBold}
    font-size: 14px;
    color: ${({ theme }) => theme.secondaryText};
  }
  button {
    ${css.fontBold}
    font-size:12px;
    border: none;
    background: transparent;
    padding: 0;
    color: ${({ theme }) => theme.primaryText};
  }
`;
const List = styled.ul`
  width: 100%;
`;
const Li = styled.li`
  ${css.flexCenter}
  justify-content: space-between;
  margin: 12px 0;
  div:first-child {
    display: flex;
    align-items: center;
    flex-direction: row;
    div:nth-child(2) {
      margin-left: 12px;
      p:nth-child(1) {
        font-size: 14px;
      }
      p:nth-child(2) {
        font-size: 12px;
        line-height: 1.1em;
        /* margin-top: 1px; */
      }
    }
  }
`;
const FollowBtn = styled.button`
  border: none;
  width: 50px;
  padding: 0;
  text-align: right;
  background: transparent;
  ${css.fontBold}
  font-size:12px;
  color: ${({ theme }) => theme.blue};
  &:hover {
    cursor: pointer;
  }
`;
export default RecommandList;
