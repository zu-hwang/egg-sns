import * as React from 'react';
import * as egg from 'store/types';
import * as css from 'styles/theme';
import * as redux from 'src/hooks/customRedux';
import styled from 'styled-components';
import StatusBar from 'src/components/ui/StatusBar';
import ImageSlide from 'src/components/ui/ImageSlide';
import FeedHeader from 'src/components/feedCard/FeedHeader';
import CommentInput from 'src/components/feedCard/CommentInput';
import CommentListBox from 'src/components/feedCard/CommentListBox';
import ContentBox from 'src/components/feedCard/ContentBox';
import numberWithComma from 'src/util/numberWithComma';
const FeedCard: React.FC<{ feed: egg.IFeed }> = ({ feed }) => {
  const user = redux.useSelector((s) => s.account.user);
  const like = React.useMemo(() => {
    let result = false;
    user &&
      feed.FeedLike.forEach((item) => item.id === user.id && (result = true));
    return result;
  }, [feed]);
  return (
    <Container>
      <FeedHeader
        author={feed.Author.userName}
        authorImage={feed.Author.imageUrl}
      />
      <Divider />
      <ImageSlide feedImage={feed.Images} />
      <StatusBar feedId={feed.id} like={like}></StatusBar>
      {feed && feed.FeedLike && (
        <LikesCounter>
          좋아요 {numberWithComma(feed.FeedLike.length)}개
        </LikesCounter>
      )}
      <ContentBox authorName={feed.Author.userName} content={feed.content} />
      {/* <Divider /> */}
      <LatestTimer>{feed.createdAt}</LatestTimer>
      <CommentListBox feedId={feed.id} comments={feed.Comments} />
      <CommentInput feedId={feed.id} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.mainBackground};
  margin-bottom: 60px;
`;
const Divider = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.divider};
`;
const LikesCounter = styled.div`
  margin: 0 16px 10px;
  font-size: 14px;
  font-weight: 500;
  margin-right: 10px;
`;
const LatestTimer = styled.p`
  ${css.font}
  font-size: 10px;
  padding: 5px 16px;
  color: ${(props) => props.theme.secondaryText};
`;
export default FeedCard;
