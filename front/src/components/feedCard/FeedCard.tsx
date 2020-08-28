import * as React from 'react';
import styled from 'styled-components';
import CommentInput from 'src/components/feedCard/CommentInput';
import FeedHeader from 'src/components/feedCard/FeedHeader';
import CommentListBox from 'src/components/feedCard/CommentListBox';
import ImageSlide from 'src/components/ui/ImageSlide';

interface FeedCardProps {
  feed: any; // feed 타입 다시 확인
}
const FeedCard: React.FC<FeedCardProps> = ({ feed }) => {
  return (
    <Container>
      <FeedHeader author={feed.author} authorImage={feed.authorImage} />
      <Divider />
      <ImageSlide feedImage={feed.feedImage} />
      <CommentListBox
        author={feed.author}
        content={feed.content}
        comments={feed.comments}
        likes={feed.likes}
      />
      <Divider />
      <CommentInput />
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
export default FeedCard;
