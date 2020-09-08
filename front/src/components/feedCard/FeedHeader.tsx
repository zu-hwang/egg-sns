import * as React from 'react';
import * as css from 'styles/theme';
import styled from 'styled-components';
import Avatar from 'src/components/ui/Avatar';
import threedot from 'public/static/images/svg/threedot.svg';
import UserNameBox from 'src/components/ui/UserNameBox';

interface FeedHeaderProps {
  author: string;
  authorImage?: string | null;
}

const FeedHeader: React.FC<FeedHeaderProps> = ({
  author,
  authorImage = '',
}) => {
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
  ${css.flexCenter}
  justify-content:space-between;
  div {
    ${css.flexCenter}
  }
`;
const ThreeDotIcon = styled.img`
  height: ${4 * css.unit + 'px'};
  width: ${4 * css.unit + 'px'};
  margin-right: 25px;
  &:last-child {
    margin-right: 0;
  }
`;
const ReUserNameBox = styled(UserNameBox)`
  margin-right: 30px;
`;
export default FeedHeader;
