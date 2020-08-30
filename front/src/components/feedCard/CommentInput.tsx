import * as React from 'react';
import * as css from 'styles/theme';
import styled from 'styled-components';

const CommentInput: React.FC = () => {
  return (
    <Container>
      <Input placeholder={'댓글 달기...'} required></Input>
      <SubmitButton disabled={true}>게시</SubmitButton>
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

const Input = styled.textarea`
  ${css.font}
  flex-grow: 1;
  font-size: 14px;
  position: relative;
  outline: none;
  border: none;
  height: 18px;
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
const SubmitButton = styled.button`
  border: none;
  padding: 0;
  margin-left: 15px;
  ${css.fontBold}
  background: transparent;
  text-align: right;
`;
export default CommentInput;
