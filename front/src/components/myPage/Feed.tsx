import * as React from 'react';
import styled from 'styled-components';
import { flexCenter, col, fontBold } from 'styles/theme';
import IconSprite from 'src/components/ui/IconSprite';
// import zuzuImage from 'public/static/images/zuzu/4.jpg';
import image from 'src/data/feedImageUrl';
// import feedImageUrl from 'src/data/feedImageUrl';

interface FeedProps {
  data: any; // 다시 설정하기
  likes: number;
  comments: any; // 다시설정하기
}
const Feed: React.FC<FeedProps> = ({ data, likes, comments }) => {
  // console.log({ data });
  // console.log(data[0].category);
  return (
    <Container>
      <FeedBox>
        {data.length > 0 &&
          data
            .filter((_, index) => index < 1)
            .map((item, index) => {
              return (
                <div key={index}>
                  <HoverData>
                    <p>
                      <IconSprite
                        url={image.feedImage}
                        position={[0, 0]}
                        iconSize={[32, 32]}
                        imageSize={[130 / 2, 130 / 2]}
                      />
                      <span>{likes}</span>
                      <IconSprite
                        url={image.feedImage}
                        position={[0, 0]}
                        iconSize={[32, 32]}
                        imageSize={[130 / 2, 130 / 2]}
                      />
                      <span>{comments}</span>
                    </p>
                  </HoverData>
                  <ImageBox key={item.id} url={item.url}>
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
  width: 100%;
  width: ${col + 'px'};
  height: ${col + 'px'};
`;
const FeedBox = styled.div`
  /* ${flexCenter} */
  width: 100%;
  position: relative;
`;

const ImageBox = styled.div<{ url: string }>`
  background: url(${({ url }) => url}) no-repeat center;
  background-size: contain;
  position: relative;
  top: 0;
  right: 0;
  width: ${col + 'px'};
  height: ${col + 'px'};
  &:hover {
    filter: brightness(80%);
  }
  & > div {
    position: absolute;
    border: 1px solid blue;
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
  ${flexCenter}
  p {
    ${flexCenter}
    flex-direction:row;
  }
  p > span {
    ${fontBold}
    margin-right:20px;
    color: ${({ theme }) => theme.mainBackground};
  }
  p > span:last-child {
    margin: 0;
  }
  &:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.35);
  }
`;

export default Feed;
