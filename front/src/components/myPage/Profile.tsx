import * as React from 'react';
import * as css from 'styles/theme';
import styled from 'styled-components';
import Avatar from 'src/components/ui/Avatar';
import settingIcon from 'public/static/images/2x/setting.png';

interface ProfileProps {
  user: any; // 타입지정 다시하기
  feedCount: number;
  followerCount: number;
  followCount: number;
}
const Profile: React.FC<ProfileProps> = ({
  user,
  feedCount,
  followerCount,
  followCount,
}) => {
  return (
    <Container>
      <Avatar size={'large'} url={user.imageUrl} />
      <InfoSection>
        <div>
          <Title>{user.username}</Title>
          <ModifyButton>프로필 편집</ModifyButton>
          <Icon src={settingIcon} />
        </div>
        <CountBox>
          <DataName>
            게시물 <span>{feedCount}</span>
          </DataName>
          <DataName>
            팔로워 <span>{followerCount}</span>
          </DataName>
          <DataName>
            팔로우 <span>{followCount}</span>
          </DataName>
        </CountBox>
        <div>{user.content}</div>
      </InfoSection>
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

const Icon = styled.img`
  height: ${7 * css.unit + 'px'};
  width: ${7 * css.unit + 'px'};
`;
const ModifyButton = styled.button`
  border: 1px solid ${({ theme }) => theme.border};
  padding: 4px 8px;
  margin-right: 10px;
  border-radius: 4px;
  ${css.fontBold}
  font-size:14px;
  background: transparent;
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
