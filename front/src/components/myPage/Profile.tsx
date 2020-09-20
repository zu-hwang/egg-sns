import * as React from 'react';
import * as css from 'styles/theme';
// import * as egg from 'store/types';
import * as feed from 'store/feed/';
import * as account from 'store/account/';
import * as redux from 'src/hooks/customRedux';
import * as antd from '@ant-design/icons';
import styled from 'styled-components';
import Avatar from 'src/components/ui/Avatar';
import settingIcon from 'public/static/images/2x/setting.png';
import threedot from 'public/static/images/svg/threedot.svg';

const Profile: React.FC = () => {
  const dispatch = redux.useDispatch();
  const user = redux.useSelector((s) => s.account.user);
  const mypageProfile = redux.useSelector((s) => s.feed.mypageProfile);
  const onClickFollowBtn = () => {
    if (mypageProfile) dispatch(account.requestFollow(mypageProfile.id));
    if (user) dispatch(feed.addFollowList(user.id));
  };
  const onClickUnFollowBtn = () => {
    if (mypageProfile) dispatch(account.requestUnFollow(mypageProfile.id));
    if (user) dispatch(feed.deleteFollowList(user.id));
  };
  const myTarget = React.useMemo(() => {
    let result = false;
    if (mypageProfile)
      mypageProfile.follower.forEach((list) => {
        if (user && list.id === user.id) result = true;
      });
    return result;
  }, [mypageProfile, user]);
  return (
    <Container>
      {mypageProfile && (
        <>
          <Avatar size={'large'} url={mypageProfile.imageUrl} />
          <InfoSection>
            <div>
              <Title>{mypageProfile.userName}</Title>
              {user?.userName === mypageProfile.userName ? (
                <>
                  <Button>프로필 편집</Button>
                  <Icon src={settingIcon} />
                </>
              ) : (
                <>
                  <Button>메세지 보내기</Button>
                  {myTarget ? (
                    <Button onClick={onClickUnFollowBtn}>
                      팔로잉
                      <CheckOutlined />
                    </Button>
                  ) : (
                    <Button onClick={onClickFollowBtn}>
                      팔로우
                      <PlusOutlined />
                    </Button>
                  )}
                  <IconDotMenu data-nav={'threeDotMenu'} src={threedot} />
                </>
              )}
            </div>
            <CountBox>
              <DataName>
                게시물 <span>{mypageProfile.feedCount}</span>
              </DataName>
              <DataName>
                팔로워 <span>{mypageProfile.follower.length}</span>
              </DataName>
              <DataName>
                팔로우 <span>{mypageProfile.following.length}</span>
              </DataName>
            </CountBox>
            <UserName>{mypageProfile.userName}</UserName>
            <UserContent>
              {mypageProfile.content ? mypageProfile.content : '우헤헤헿'}
            </UserContent>
          </InfoSection>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  ${css.flexCenter}
  justify-content:space-between;
  width: 100%;
  margin-top: 60px;
  & > div:first-child {
    width: ${css.col + 'px'};
  }
`;
const InfoSection = styled.div`
  flex-direction: column;
  & > div {
    ${css.flexCenter}
    justify-content:flex-start;
  }
`;
const Title = styled.span`
  display: inline-block;
  font-size: 24px;
  margin-right: 20px;
`;
const UserName = styled.span`
  display: inline-block;
  font-size: 16px;
  font-weight: 500;
  margin-right: 20px;
`;
const UserContent = styled.p`
  padding-top: 10px;
  font-size: 14px;
  margin-right: 20px;
`;
const Icon = styled.img`
  height: ${7 * css.unit + 'px'};
  width: ${7 * css.unit + 'px'};
  &:hover {
    cursor: pointer;
  }
`;

const IconDotMenu = styled.img`
  height: 18px;
  width: 18px;
  margin-left: 8px;
  &:hover {
    cursor: pointer;
  }
`;
const Button = styled.button`
  border: 1px solid ${({ theme }) => theme.border};
  padding: 4px 10px;
  margin-right: 8px;
  border-radius: 4px;
  ${css.fontBold}
  font-size:13px;
  background: transparent;
  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.tableHeader};
  }
`;
const CheckOutlined = styled(antd.CheckOutlined)`
  padding-left: 5px;
`;
const PlusOutlined = styled(antd.PlusOutlined)`
  padding-left: 5px;
`;
const CountBox = styled.ul`
  margin: 25px 0;
  width: ${css.col * 2 + css.gutter + 'px'};
`;
const DataName = styled.li`
  display: inline-block;
  margin-right: 40px;
  & > span {
    ${css.fontBold}
  }
`;

export default Profile;
