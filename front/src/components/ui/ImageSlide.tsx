import * as React from 'react';
import * as css from 'styles/theme';
import styled from 'styled-components';
import heart from 'public/static/images/svg/heart.svg';
import comment from 'public/static/images/svg/comment.svg';
import send from 'public/static/images/svg/send.svg';
import bookmark from 'public/static/images/svg/bookmark.svg';

interface ImageSlideProps {
  feedImage: Array<string>;
}
const ImageSlide: React.FC<ImageSlideProps> = ({ feedImage }) => {
  return (
    <>
      {feedImage.map((image, index) => {
        return (
          <div key={index}>
            {/* 여기에 슬라이드 구현 */}
            <Image src={image} />
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
    </>
  );
};

const Image = styled.img`
  display: block;
  width: 100%;
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
export default ImageSlide;
