import React from 'react';
import styled from 'styled-components';
import { flexCenter, font, fontBold, unit } from 'src/styles/theme';

import heart from 'public/static/images/svg/heart.svg';

const CommentListBox = ({ author, content, comments, likes }) => {
  return (
    <ContentBox>
      <LikeCount>좋아요 22개</LikeCount>
      <CommentBox>
        <Author>
          <span>{author}</span>
          <span>{content}</span>
          <MoreButton>더보기</MoreButton>
        </Author>
        <MoreButton>댓글 {likes}개 모두 보기</MoreButton>
        {comments.map((comment) => {
          return (
            <Comment>
              <div>
                <span>{comment.author}</span>
                <span>{comment.content}</span>
              </div>
              <div>
                <Icon src={heart} />
              </div>
            </Comment>
          );
        })}
      </CommentBox>
      <LatestTimer>6시간 전</LatestTimer>
    </ContentBox>
  );
};

const ContentBox = styled.div`
  ${font}font-size: 14px;
  border-bottom: 1px solid ${(props) => props.theme.divider};
`;
const ButtonBox = styled.div`
  height: 40px;
`;
const LikeCount = styled.p`
  ${fontBold}
  font-size: 14px;
  font-weight: 500;
  padding: 5px 16px;
`;
const CommentBox = styled.div``;
const Author = styled.div`
  padding: 5px 16px;
  span:first-child {
    ${fontBold}
    font-size:15px;
    margin-right: 5px;
  }
`;
const MoreButton = styled.button`
  ${font}
  font-size: 14px;
  /* padding: 5px 16px; */
  border: none;
  background: transparent;
  margin-left: 10px;
  color: ${(props) => props.theme.secondaryText};
`;
const Comment = styled.div`
  padding: 5px 16px;
  ${flexCenter}
  justify-content:space-between;
  div {
    ${flexCenter}
    span:first-child {
      ${fontBold}
      font-size:15px;
      margin-right: 5px;
    }
  }
`;
const LatestTimer = styled.p`
  ${font}
  font-size: 10px;
  padding: 5px 16px;
  color: ${(props) => props.theme.secondaryText};
`;

const Icon = styled.img`
  height: ${3 * unit + 'px'};
  width: ${3 * unit + 'px'};
  margin-right: 25px;
  &:last-child {
    margin-right: 0;
  }
`;
export default CommentListBox;
