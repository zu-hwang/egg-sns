import * as React from 'react';
import * as css from 'styles/theme';
import * as redux from 'src/hooks/customRedux';
import * as feed from 'store/feed';
import * as antd from '@ant-design/icons';
import styled from 'styled-components';
import { useInputDefault } from 'src/hooks/useInputDefault';

interface ICommentInput {
  feedId?: number;
  commentId?: number;
  value?: string;
  mode?: 'create' | 'edit';
  onClickCancle?: (e) => void;
}
const CommentInput: React.FC<ICommentInput> = (props) => {
  const {
    mode = 'create',
    value = '',
    feedId,
    commentId,
    onClickCancle,
  } = props;
  const dispatch = redux.useDispatch();
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const loadingComment = redux.useSelector((s) => s.feed.loadingComment);
  const successComment = redux.useSelector((s) => s.feed.successComment);
  const selectedCommentId = redux.useSelector((s) => s.feed.selectedCommentId);
  const [content, onChangeContent, setContent] = useInputDefault(value);
  const checkValue = React.useCallback(() => {
    if (content === '') return true;
    return false;
  }, [content]);
  const placeholder = () => {
    return mode === 'edit' ? '댓글 수정하기' : '댓글 달기';
  };
  const onClickSubmitButton = (): void => {
    if (mode === 'create' && feedId && content.length > 0) {
      console.log({ mode, feedId, content });
      const createData = {
        content: content,
        feedId,
      };
      console.log('onClickSubmitButton');
      dispatch(feed.requestCreateComment(createData));
    }
    if (
      mode === 'edit' &&
      selectedCommentId === commentId &&
      content.length > 0
    ) {
      const editData = {
        content,
        commentId,
      };
      console.log('코멘트 수정');
      dispatch(feed.requestUpdateComment(editData));
    }
  };
  const onKeyDownEnter = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ): void => {
    if (mode === 'create' && e.key === 'Enter') {
      console.log('onKeyDownEnter');
      onClickSubmitButton();
      inputRef.current?.blur();
    }
  };
  React.useEffect(() => {
    successComment && setContent('');
  }, [successComment]);
  React.useEffect(() => {}, [content, selectedCommentId]);
  return (
    <Container>
      <Input
        mode={mode}
        ref={inputRef}
        data-comid={commentId}
        placeholder={placeholder()}
        required
        value={content}
        onKeyDown={onKeyDownEnter}
        onChange={onChangeContent}></Input>
      <ButtonBox mode={mode}>
        {mode === 'edit' && (
          <IconWrapper>
            <CancelButton
              data-feedid={feedId}
              data-comid={commentId}
              onClick={onClickCancle}>
              취소
            </CancelButton>
          </IconWrapper>
        )}
        <IconWrapper>
          <SubmitButton
            data-comid={commentId}
            disabled={checkValue()}
            onClick={onClickSubmitButton}>
            {loadingComment && selectedCommentId === commentId ? (
              <LoadingOutlined />
            ) : (
              (mode === 'create' && '게시') || (mode === 'edit' && '저장')
            )}
          </SubmitButton>
        </IconWrapper>
      </ButtonBox>
    </Container>
  );
};

const Container = styled.div`
  padding: 5px 16px;
  ${css.flexCenter}
  justify-content: space-between;
  position: relative;
  overflow: hidden;
`;

type TMode = 'create' | 'edit';
const Input = styled.textarea<{ mode: TMode; value: string }>`
  ${css.font}
  flex-grow: 1;
  font-size: 14px;
  position: relative;
  outline: none;
  border: none;
  ${({ mode, value }) => {
    return (
      // (mode === 'edit' && `height:100px;`) ||
      (mode === 'edit' && `height:${value.split('\n').length * 20}px;`) ||
      (mode === 'create' && `height: 22px;`)
    );
  }};
  resize: none;
  overflow: auto;
  margin: 10px 0;
  color: ${(props) => props.theme.primaryText};
  background: transparent;
  &::placeholder {
    text-align: start;
    color: ${(props) => props.theme.secondaryText};
    position: relative;
    top: -3px;
  }
`;
const ButtonBox = styled.div<{ mode: TMode }>`
  display: flex;
  ${({ mode }) =>
    mode === 'edit' &&
    `align-self: flex-end;
  padding-bottom:11px;`}/* background-color: beige; */
`;
const IconWrapper = styled.div`
  ${css.flexCenter}
  text-align:center;
  /* margin-left: 12px; */
  opacity: 0.7;
  font-size: 12px;
  color: ${({ theme }) => theme.secondaryText};
  &:last-child {
    color: ${({ theme }) => theme.red};
  }
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;
const LoadingOutlined = styled(antd.LoadingOutlined)`
  text-align: center;
  font-size: 12px;
`;
const SubmitButton = styled.button<{ disabled: boolean }>`
  ${css.fontBold}
  height:20px;
  font-size: 13px;
  border: none;
  padding: 0;
  width: 30px;
  /* margin-left: 15px; */
  background: transparent;
  text-align: cemter;
  color: ${({ theme }) => theme.blue};
  opacity: 1;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;
const CancelButton = styled.button`
  font-size: 13px;
  border: none;
  /* margin-left: 15px; */
  background: transparent;
  text-align: right;
  color: ${({ theme }) => theme.secondaryText};
  opacity: 0.7;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;
export default CommentInput;
