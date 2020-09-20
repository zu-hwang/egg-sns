import * as React from 'react';
import * as css from 'styles/theme';
import * as egg from 'store/types';
import styled from 'styled-components';
import image from 'src/data/feedImageUrl';
import IconSprite from 'src/components/ui/IconSprite';
import heartActiveBlack from 'public/static/images/svg/heart_active_black.svg';
import commentActive from 'public/static/images/svg/comment_active.svg';
import numberWithComma from 'src/util/numberWithComma';
import { STATIC_URL } from 'common/config';
interface FeedProps {
  data: egg.IFeedImage[]; // 다시 설정하기
  likes: number;
  comments: number; // 다시설정하기
}
const Feed: React.FC<FeedProps> = ({ data, likes, comments }) => {
  const onClickFeedDetailModal = () => {
    console.log('모달을 띄우자!');
  };
  return (
    <Container onClick={onClickFeedDetailModal}>
      <FeedBox>
        {data.length > 0 &&
          data
            .filter((_, index) => index < 1)
            .map((item, index) => {
              return (
                <div key={item.id}>
                  <HoverData>
                    <p>
                      <Icon src={heartActiveBlack} />
                      <span>{numberWithComma(likes)}</span>
                      <Icon src={commentActive} />
                      <span>{numberWithComma(comments)}</span>
                    </p>
                  </HoverData>
                  <ImageBox key={item.id} url={STATIC_URL + item.url}>
                    {/* 사진 여러장이고, 첫장 이미지 일때 => 아이콘 설정 */}
                    {data.length > 1 && data[0].category === 'photo' && (
                      <IconSprite
                        url={image.feedImage}
                        position={[0, 0]}
                        iconSize={[32, 32]}
                        imageSize={[130 / 2, 130 / 2]}
                      />
                    )}
                    {/* data[0]이 동영상 일때 => 동영상아이콘 설정 */}
                    {data[0].category === 'video' && (
                      <IconSprite
                        url={image.feedImage}
                        position={[0, -33]}
                        iconSize={[32, 32]}
                        imageSize={[130 / 2, 130 / 2]}
                      />
                    )}
                  </ImageBox>
                </div>
              );
            })}
      </FeedBox>
    </Container>
  );
};
const Container = styled.div`
  /* width: 100%; */
  width: ${css.col + 'px'};
  height: ${css.col + 'px'};
  background-color: ${({ theme }) => theme.mainBackground};
  border: ${({ theme }) => theme.border};
  &:hover {
    cursor: pointer;
  }
`;
const FeedBox = styled.div`
  width: 100%;
  position: relative;
  /* overflow: hidden; */
`;

const ImageBox = styled.div<{ url: string }>`
  background: url(${({ url }) => url}) no-repeat center;
  background-size: contain;
  position: relative;
  top: 0;
  right: 0;
  width: ${css.col + 'px'};
  height: ${css.col + 'px'};
  &:hover {
    filter: brightness(80%);
  }
  & > div {
    position: absolute;
    /* border: 1px solid blue; */
    top: 0;
    right: 0;
    opacity: 0.7;
  }
`;
const HoverData = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  opacity: 0;
  ${css.flexCenter}
  p {
    ${css.flexCenter}
    flex-direction:row;
  }
  p > span {
    ${css.fontBold}
    margin-right:20px;
    color: ${({ theme }) => theme.mainBackground};
  }
  p > span:last-child {
    margin: 0;
  }
  &:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Icon = styled.img`
  height: 19px;
  width: 19px;
  margin-right: 10px;
  filter: brightness(100);
`;

export default Feed;
