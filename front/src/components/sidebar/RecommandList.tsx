import * as React from 'react';
import * as css from 'styles/theme';
import styled from 'styled-components';
import Avatar from 'src/components/ui/Avatar';
import UserNameBox from 'src/components/ui/UserNameBox';

const UserList = [{}, {}, {}, {}, {}];

const RecommandList: React.FC = () => {
  return (
    <Container>
      <Header>
        <span>최근 스토리</span>
        <button>모두 보기</button>
      </Header>
      <List>
        {UserList.map((user, index) => {
          return (
            <Li key={index}>
              <div>
                <Avatar size={'small'} />
                <UserNameBox
                  username={'dal.dal_cake'}
                  content={`yeomida_sewingstudio님 외 1명이 팔로우합니다`}
                />
              </div>
              <FollowBtn>팔로우</FollowBtn>
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
    font-size: 14px;
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
`;
export default RecommandList;
