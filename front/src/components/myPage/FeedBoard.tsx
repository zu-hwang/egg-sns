import * as React from 'react';
import * as css from 'styles/theme';
import * as redux from 'src/hooks/customRedux';
import * as egg from 'store/types';
import styled from 'styled-components';
import Feed from 'src/components/myPage/Feed';
import EmptyFeed from 'src/components/myPage/EmptyFeed';

const FeedBoard: React.FC = () => {
  const mypageFeedList = redux.useSelector((s) => s.feed.mypageFeedList);
  return (
    <Board>
      {mypageFeedList.length > 0 &&
        (mypageFeedList as egg.IMypageFeed[]).map((feed, index) => {
          return (
            <GutterMap key={feed.id} isThird={(index + 1) % 3 == 0}>
              <Feed
                data={feed.Images}
                likes={feed.FeedLike.length}
                comments={feed.Comments.length}
              />
            </GutterMap>
          );
        })}
      {mypageFeedList.length === 0 && <EmptyFeed />}
    </Board>
  );
};
const Board = styled.div`
  width: 100%;
  padding-top: ${css.gutter + 'px'};
  ${css.flexCenter}
  flex-wrap:wrap;
  justify-content: flex-start;
`;
const GutterMap = styled.div<{ isThird: boolean }>`
  padding-bottom: ${css.gutter + 'px'};
  padding-right: ${({ isThird }) => (isThird ? '0px' : css.gutter + 'px')};
  position: relative;
`;

export default FeedBoard;
