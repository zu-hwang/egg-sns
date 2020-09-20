import * as React from 'react';
import * as css from 'styles/theme';
import * as egg from 'store/types';
// import * as antd from '@ant-design/icons';
import * as redux from 'src/hooks/customRedux';
import * as feed from 'store/feed';
// import * as moment from 'moment';
import styled from 'styled-components';
import CommentLine from 'src/components/feedCard/CommentLine';

interface CommentListBoxProps {
  comments: egg.IComment[] | [];
  feedId: number;
}
const CommentListBox: React.FC<CommentListBoxProps> = ({
  comments,
  feedId,
}) => {
  const dispatch = redux.useDispatch();
  // const selectedCommentId = redux.useSelector((s) => s.feed.selectedCommentId);
  const onClickMoreCommentBtn = () => {
    // 피드 상세 보기 모달 띄우기
  };
  const onClickEditBtn = (e) => {
    const commentId = parseInt(
      e.target.dataset.comid ||
        e.target.parentNode.dataset.comid ||
        e.target.parentNode.parentNode.dataset.comid ||
        e.target.parentNode.parentNode.parentNode.dataset.comid,
      10,
    );
    console.log(commentId);
    commentId && dispatch(feed.setCommentIdForUD(commentId));
  };
  const onClickDeleteBtn = (e) => {
    const commentId = parseInt(
      e.target.dataset.comid ||
        e.target.parentNode.dataset.comid ||
        e.target.parentNode.parentNode.dataset.comid ||
        e.target.parentNode.parentNode.parentNode.dataset.comid,
      10,
    );
    console.log(commentId, e.target);
    dispatch(feed.setCommentIdForDEL(commentId));
    dispatch(feed.requestDeleteComment({ feedId, commentId }));
  };

  return (
    <ContentBox>
      {comments?.length > 2 && (
        <Wrapper>
          <MoreButton>
            댓글 {comments.length}개
            <span onClick={onClickMoreCommentBtn}>모두 보기</span>
          </MoreButton>
        </Wrapper>
      )}
      {comments &&
        (comments as egg.IComment[]).map((comment, index) => {
          if (index < 2) {
            return (
              <CommentLine
                key={comment.id}
                comment={comment}
                onClickEditBtn={onClickEditBtn}
                onClickDeleteBtn={onClickDeleteBtn}
              />
            );
          }
          return null;
        })}
    </ContentBox>
  );
};

const ContentBox = styled.div`
  ${css.font}font-size: 14px;
  border-bottom: 1px solid ${(props) => props.theme.divider};
  padding-bottom: 10px;
`;

const MoreButton = styled.span<{ dot?: boolean }>`
  padding: 0;
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.secondaryText};
  cursor: pointer;
  ${({ dot }) => {
    if (dot) {
      return `
      &:before {
        content: '...';
      }`;
    } else {
      return ``;
    }
  }}
`;

const Wrapper = styled.div`
  margin: 8px 16px;
`;
export default CommentListBox;
