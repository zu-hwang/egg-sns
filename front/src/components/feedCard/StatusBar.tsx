import * as React from 'react';
import * as css from 'styles/theme';
import * as egg from 'store/types';
import styled from 'styled-components';
import heart from 'public/static/images/svg/heart.svg';
import comment from 'public/static/images/svg/comment.svg';
import send from 'public/static/images/svg/send.svg';
import bookmark from 'public/static/images/svg/bookmark.svg';
import { STATIC_URL } from 'common/config';
interface ImageBoxProps {
  feedImage: egg.IFeedImage[];
}
const ImageBox: React.FC<ImageBoxProps> = ({ feedImage }) => {
  return (
    <Container>
      {feedImage.length > 0 &&
        feedImage.map((image) => {
          return (
            <div key={image.id}>
              {/* 여기에 슬라이드 구현 */}
              <Image src={STATIC_URL + image.url} />
              <Divider />
              <IconBox>
                <div>
                  <Icon src={heart} />
                  <Icon src={comment} />
                  <Icon src={send} />
                </div>
                <div>
                  <Icon src={bookmark} />
                </div>
              </IconBox>
            </div>
          );
        })}
    </Container>
  );
};
const Container = styled.div`
  width: 600px;
  height: 600px;
  overflow: hidden;
`;
const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  margin-right: 25px;
  &:last-child {
    margin-right: 0;
  }
`;
const Divider = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.divider};
`;
const IconBox = styled.div`
  ${css.flexCenter}
  justify-content:space-between;
  padding: 2px 8px;
`;
const Icon = styled.img`
  height: ${6 * css.unit + 'px'};
  width: ${6 * css.unit + 'px'};
  margin: 9px;
`;
export default ImageBox;
