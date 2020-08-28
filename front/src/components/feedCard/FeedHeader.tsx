import * as React from 'react';
import styled from 'styled-components';
import { flexCenter, unit } from 'styles/theme';
import Avatar from 'src/components/ui/Avatar';
import UserNameBox from 'src/components/ui/UserNameBox';
import threedot from 'public/static/images/svg/threedot.svg';

interface FeedHeaderProps {
  author: string;
  authorImage: string;
}

const FeedHeader: React.FC<FeedHeaderProps> = ({ author, authorImage }) => {
  return (
    <UserInfoBox>
      <div>
        <Avatar size={'small'} url={authorImage} />
        <ReUserNameBox username={author} />
      </div>
      <div>
        <ThreeDotIcon src={threedot} />
      </div>
    </UserInfoBox>
  );
};

const UserInfoBox = styled.div`
  padding: 10px 16px;

  ${flexCenter}
  justify-content:space-between;
  div {
    ${flexCenter}
  }
`;
const ThreeDotIcon = styled.img`
  height: ${4 * unit + 'px'};
  width: ${4 * unit + 'px'};
  margin-right: 25px;
  &:last-child {
    margin-right: 0;
  }
`;
const ReUserNameBox = styled(UserNameBox)`
  margin-right: 30px;
`;
export default FeedHeader;
