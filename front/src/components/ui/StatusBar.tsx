import * as React from 'react';
import * as css from 'styles/theme';
import * as redux from 'src/hooks/customRedux';
import * as feed from 'store/feed';
import styled from 'styled-components';
import heart from 'public/static/images/svg/heart.svg';
import heartActive from 'public/static/images/svg/heart_active.svg';
import comment from 'public/static/images/svg/comment.svg';
import send from 'public/static/images/svg/send.svg';
import bookmark from 'public/static/images/svg/bookmark.svg';
interface StatusBar {
  feedId: number;
  like: boolean;
}
const StatusBar: React.FC<StatusBar> = ({ feedId, like }) => {
  const dispatch = redux.useDispatch();
  const onClickHeart = () => {
    like
      ? dispatch(feed.requestHeartDelete(feedId))
      : dispatch(feed.requestHeartAdd(feedId));
  };
  React.useEffect(() => {}, [like]);
  return (
    <Container>
      <IconBox>
        <div>
          <Icon src={like ? heartActive : heart} onClick={onClickHeart} />
          <Icon src={comment} />
          <Icon src={send} />
        </div>
        <div>
          <Icon src={bookmark} />
        </div>
      </IconBox>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
`;

const IconBox = styled.div`
  ${css.flexCenter}
  justify-content:space-between;
  /* padding: 2px 8px; */
`;
const Icon = styled.img`
  height: ${6 * css.unit + 'px'};
  width: ${6 * css.unit + 'px'};
  margin: 9px;
  &:hover {
    cursor: pointer;
  }
`;
export default StatusBar;
