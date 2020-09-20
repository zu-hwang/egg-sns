import * as React from 'react';
import * as css from 'styles/theme';
import * as antd from '@ant-design/icons';
import * as redux from 'src/hooks/customRedux';
import * as egg from 'store/types';
import * as feed from 'store/feed';
import * as reg from 'src/util/regex';
import styled from 'styled-components';
import CommentInput from 'src/components/feedCard/CommentInput';

interface ICommentLine {
  // feedId: number;
  comment: egg.IComment;
  onClickEditBtn: (e) => void;
  onClickDeleteBtn: (e) => void;
}
const CommentLine: React.FC<ICommentLine> = (props) => {
  const { comment, onClickEditBtn, onClickDeleteBtn } = props;
  const [moreActive, setMoreActive] = React.useState(false);
  const dispatch = redux.useDispatch();
  const loadingCommentDelete = redux.useSelector(
    (s) => s.feed.loadingCommentDelete,
  );
  const deletedCommentId = redux.useSelector((s) => s.feed.deletedCommentId);
  const selectedCommentId = redux.useSelector((s) => s.feed.selectedCommentId);
  const user = redux.useSelector((s) => s.account.user);
  const onClickCancle = (e) => {
    const commentId = parseInt(
      e.target.dataset.comid ||
        e.target.parentNode.dataset.comid ||
        e.target.parentNode.parentNode.dataset.comid ||
        e.target.parentNode.parentNode.parentNode.dataset.comid,
      10,
    );
    console.log('취소버튼 누른 곳은> ', commentId);
    dispatch(feed.setCommentIdForUD(0));
  };
  const onClickMoreBtn = () => {
    setMoreActive(true);
  };
  const insertHashtags = (
    item: string,
    index: number,
  ): JSX.Element | string => {
    // split과 정규표현식을 사용할 땐 ()로 감싸주어 구분자 손실을 제어할수 있다
    if (reg.hashtag.test(item as string))
      return <HashTag key={index}>{item}</HashTag>;
    return item;
  };
  const insertEnter = (item: string | JSX.Element): string | JSX.Element => {
    if (typeof item === 'string') {
      item.split(/(\\\n)/g).map((string) => {
        if (/\\\n/g.test(string)) {
          // ! 개행 작동 안함.. 나중에 수정하기
          return <br />;
        }
        return string;
      });
    }
    return item;
  };
  const contentPrint = (first?: boolean) => {
    if (first) {
      const firstLine = comment.content.split('\n')[0];
      const stringWithSpaceList = firstLine.split(/(\s)/); // 공백기준 짜르기 -> 글짤림 방지
      const appliedHashtag = stringWithSpaceList.map((string) => {
        if (string !== ' ')
          return string.split(reg.hashtagSplit).map(insertHashtags);
        return string;
      });
      return appliedHashtag;
    }
    return comment.content
      .split(reg.hashtagSplit)
      .map(insertHashtags)
      .map(insertEnter);
  };
  React.useEffect(() => {
    const contentLines = comment.content.split('\n');
    if (contentLines.length === 1 && contentLines[0].length < 40) {
      setMoreActive(true); // 더보기 된 상태 === 더보기 버튼 없음
    }
  }, [comment.content]);
  return (
    <Container key={comment.id}>
      <CommentBox>
        <Author moreActive={moreActive}>
          <span>{comment?.Author?.userName}</span>
          {selectedCommentId !== comment.id && (
            <>
              <span>{contentPrint(true)}</span>
              {!moreActive && (
                <MoreButton dot={true} onClick={onClickMoreBtn}>
                  더 보기
                </MoreButton>
              )}
            </>
          )}
        </Author>
        {user?.id === comment.Author.id && (
          <Controller className={'ctrl'}>
            <IconWrapper data-comid={comment.id} onClick={onClickEditBtn}>
              <span>수정</span>
              <EditOutlined />
            </IconWrapper>
            <IconWrapper data-comid={comment.id} onClick={onClickDeleteBtn}>
              <span>삭제</span>
              {loadingCommentDelete && deletedCommentId === comment.id ? (
                <LoadingOutlined />
              ) : (
                <CloseOutlined />
              )}
            </IconWrapper>
          </Controller>
        )}
      </CommentBox>
      {!loadingCommentDelete && selectedCommentId === comment.id && (
        <EditBox>
          <Divider />
          <CommentInput
            value={comment.content}
            commentId={comment.id}
            mode={'edit'}
            onClickCancle={onClickCancle}
          />
          <Divider />
        </EditBox>
      )}
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
const CommentBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
  /* 여러줄 수정할 경우 대비해서 ~ */
  align-items: flex-start;
  margin: 2px 0;
  &:hover > div.ctrl {
    /* ${css.flexCenter} */
    opacity: 1;
  }
`;

const EditBox = styled.div`
  background-color: ${({ theme }) => theme.tableHeader};
`;
const Divider = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.tableHeader};
`;

const Author = styled.div<{ moreActive: boolean }>`
  line-height: 1.3em;
  padding: 5px 16px;
  width: 100%;
  span:first-child {
    ${css.fontBold}
    font-size:14px;
    margin-right: 5px;
  }
  ${({ moreActive }) => {
    if (!moreActive) {
      return `
      text-overflow: ellipsis;`;
    }
    return `
    white-space: wrap;
    `;
  }}
`;
const Controller = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 7px;
  margin-right: 16px;
  /* font-size: 18px; */
  /* width: 23%; */
  height: 100%;
  color: ${({ theme }) => theme.secondaryText};
  /* display: none; */
  opacity: 0.7;
  transition: 0.2s ease-in-out opacity;
  &:hover {
    transition: 0.2s ease-in-out opacity;
    opacity: 1;
    cursor: pointer;
  }
  &:last-child {
    padding-left: 0;
  }
`;
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-align: center;
  opacity: 0.7;
  font-size: 12px;
  width: 100%;
  color: ${({ theme }) => theme.secondaryText};
  &:last-child {
    color: ${({ theme }) => theme.red};
    margin-left: 10px;
  }
  & > span:nth-child(even) {
    display: inline-block;
  }
  & > span:nth-child(odd) {
    width: 25px;
    display: inline-block;
  }
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;
const ctrlCss = css.css`
${css.flexCenter}
margin-left:3px;
`;
const EditOutlined = styled(antd.EditOutlined)`
  ${ctrlCss};
  &:hover {
    color: ${({ theme }) => theme.secondaryText};
  }
`;
const LoadingOutlined = styled(antd.LoadingOutlined)`
  ${ctrlCss};
`;
const CloseOutlined = styled(antd.CloseOutlined)`
  ${ctrlCss};
`;
const MoreButton = styled.span<{ dot?: boolean }>`
  padding: 0;
  margin: 0;
  font-size: 12px;
  min-width: 50px;
  text-align: center;
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
export const HashTag = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.darkBlue};
  opacity: 0.8;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

export default CommentLine;
