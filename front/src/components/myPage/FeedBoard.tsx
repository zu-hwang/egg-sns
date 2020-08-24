import React from 'react';
import styled from 'styled-components';
import { flexCenter, gutter } from 'src/styles/theme';
// import image from 'src/data/feedImageUrl';
import Feed from 'src/components/myPage/Feed';
// import feedImageUrl from 'src/data/feedImageUrl';
import zuzuImage from 'public/static/images/zuzu/4.jpg';
// import IconSprite from 'src/components/ui/IconSprite';

const myFeedList = [
  {
    id: 'feed1',
    feedImages: [
      { id: 1, url: zuzuImage, category: 'video' },
      { id: 2, url: zuzuImage, category: 'photo' },
      { id: 2, url: zuzuImage, category: 'photo' },
    ],
    likes: 33,
    comments: 33,
  },
  {
    id: 'feed2',
    feedImages: [{ id: 1, url: zuzuImage, category: 'photo' }],
    likes: 13,
    comments: 13,
  },
  {
    id: 'feed3',
    feedImages: [
      { id: 1, url: zuzuImage, category: 'photo' },
      { id: 2, url: zuzuImage, category: 'photo' },
      { id: 2, url: zuzuImage, category: 'photo' },
    ],
    likes: 4,
    comments: 4,
  },
  {
    id: 'feed4',
    feedImages: [
      { id: 1, url: zuzuImage, category: 'photo' },
      { id: 2, url: zuzuImage, category: 'photo' },
      { id: 2, url: zuzuImage, category: 'photo' },
    ],
    likes: 389,
    comments: 389,
  },
];
const FeedBoard = () => {
  return (
    <Board>
      {myFeedList.map((feed, index) => {
        return (
          <GutterMap key={feed.id} isThird={(index + 1) % 3 == 0}>
            <Feed
              data={feed.feedImages}
              likes={feed.likes}
              comments={feed.comments}
            />
          </GutterMap>
        );
      })}
    </Board>
  );
};
const Board = styled.div`
  width: 100%;
  padding-top: ${gutter + 'px'};
  ${flexCenter}
  flex-wrap:wrap;
  justify-content: flex-start;
`;
const GutterMap = styled.div<{ isThird: boolean }>`
  padding-bottom: ${gutter + 'px'};
  padding-right: ${({ isThird }) => (isThird ? '0px' : gutter + 'px')};
  position: relative;
`;

export default FeedBoard;
