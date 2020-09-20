import * as React from 'react';
import * as css from 'styles/theme';
import * as egg from 'store/types';
import styled from 'styled-components';
import { STATIC_URL } from 'common/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';

interface ImageSlideProps {
  feedImage: egg.IFeedImage[];
  mode?: 'upload';
}
const ImageSlide: React.FC<ImageSlideProps> = ({ feedImage, mode }) => {
  const IMAGE_WIDTH = 614;
  const [position, setPosition] = React.useState(0);
  const moveRight = () => {
    setPosition(position + IMAGE_WIDTH);
  };
  const moveLeft = () => {
    setPosition(position - IMAGE_WIDTH);
  };
  const checkButtonVisible = React.useCallback(
    (arrow) => {
      if (
        arrow === 'right' &&
        position === -(feedImage?.length * IMAGE_WIDTH) + IMAGE_WIDTH
      )
        return 'hidden';
      if (arrow === 'left' && position === 0) return 'hidden';
      return 'visible';
    },
    [position, feedImage],
  );

  return (
    <Container>
      {/* 사진여러장 Or 동영상 표시 아이콘 추가 */}
      <HiddenBox width={IMAGE_WIDTH}>
        {feedImage && feedImage.length > 0 && (
          <ImageRoll
            position={position}
            length={feedImage.length}
            width={IMAGE_WIDTH}>
            {feedImage.map((image) => {
              return (
                <ImageStep key={image.id} width={IMAGE_WIDTH}>
                  <Image src={STATIC_URL + image.url} />
                </ImageStep>
              );
            })}
          </ImageRoll>
        )}
      </HiddenBox>
      <StatusBar>
        {feedImage &&
          feedImage.length > 1 &&
          feedImage.map((feed, index) => (
            <Dot
              key={feed.id}
              index={index}
              current={position}
              width={IMAGE_WIDTH}
            />
          ))}
      </StatusBar>
      <Controller>
        <Wrapper visible={checkButtonVisible('left')} onClick={moveRight}>
          <FontAwesomeIcon icon={faChevronCircleLeft} color='Gainsboro' />
        </Wrapper>
        <Wrapper visible={checkButtonVisible('right')} onClick={moveLeft}>
          <FontAwesomeIcon icon={faChevronCircleRight} color='Gainsboro' />
        </Wrapper>
      </Controller>
    </Container>
  );
};
const Container = styled.div`
  ${css.flexCenter}
  position: relative;
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
  background-color: pink;
`;
const Controller = styled.div`
  ${css.flexCenter}
  justify-content: space-between;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 10px;
`;

const Wrapper = styled.div<{ visible: 'hidden' | 'visible' }>`
  ${({ visible }) => `visibility:${visible};`}
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  position: relative;
  box-shadow: 0px 0px 10px gray;
  opacity: 0.5;
  font-size: 20px;
  transition: 0.1s linear opacity;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
    transition: 0.1s linear opacity;
  }
`;
/**
 * 1. 컨테이너 width 구하기 -> imageBoxWidth 스테이트
 * 2. 컨테이너 width로 width 설정하고
 * 3. height는 자동
 *
 */
const HiddenBox = styled.div<{ width: number }>`
  /* width는 고정 */
  max-width: ${({ width }) => width + 'px'};
  /* height는 모든이미지 높이 같으면 해당 값, 다르면 width와 통일 지정*/
  min-height: auto;
`;
const ImageRoll = styled.div<{
  position: number;
  width: number;
  length: number;
}>`
  width: ${({ width, length }) => width * length + 'px'};
  display: flex;
  position: relative;
  left: ${({ position }) => position + 'px'};
  transition: 0.3s ease-in-out left;
`;
const ImageStep = styled.div<{ width: number }>`
  ${css.flexCenter}
  width: ${({ width }) => width + 'px'};
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: auto;
  margin-right: 25px;
  &:last-child {
    margin-right: 0;
  }
`;

const StatusBar = styled.div`
  ${css.flexCenter}
  position:absolute;
  bottom: -20px;
  background-color: transparent;
`;
interface IDotProps {
  current: number;
  index: number;
  width: number;
}
const Dot = styled.div<IDotProps>`
  width: 6px;
  height: 6px;
  margin-right: 6px;
  border-radius: 50%;
  box-shadow: 0px 0px 5px ${({ theme }) => theme.border};
  background-color: ${({ current, index, width, theme }) =>
    -(current / width) === index ? theme.blue : theme.primaryText};
  opacity: ${({ current, index, width }) =>
    -(current / width) === index ? 0.8 : 0.5};
  &:last-child {
    margin-right: 0;
  }
`;
export default ImageSlide;
