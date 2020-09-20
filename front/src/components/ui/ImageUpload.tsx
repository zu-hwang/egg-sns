import * as React from 'react';
import * as css from 'styles/theme';
import * as antd from '@ant-design/icons';
import * as redux from 'src/hooks/customRedux';
import * as feed from 'store/feed';
import styled from 'styled-components';
import usePrev from 'src/hooks/usePrev';
import { STATIC_URL } from 'common/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';

type Visible = 'hidden' | 'visible';
interface ImageUploadProps {
  MAX: number;
  onClick: () => void;
}
const ImageUpload: React.FC<ImageUploadProps> = ({ MAX, onClick }) => {
  const IMAGE_WIDTH = 600;
  const dispatch = redux.useDispatch();
  const uploadedImages = redux.useSelector((s) => s.feed.uploadedImages);
  const [position, setPosition] = React.useState(0);
  const [leftArrow, setLeftArrow] = React.useState<Visible>('hidden');
  const [rightArrow, setRightArrow] = React.useState<Visible>('hidden');
  // const [imageHeight, setImageHeight] = React.useState(600);
  // const [imageWidth, setImageWidth] = React.useState(600);
  const prevUploadedImages = usePrev(uploadedImages);
  const onClickDeleteImageBtn = () => {
    const index = position / -IMAGE_WIDTH; // (0 ~ index)
    const bodyData = {
      deleteImageUrl: uploadedImages[index],
      index,
    };
    dispatch(feed.requestDeleteImage(bodyData)); // 서버요청
  };
  const moveRight = () => {
    setPosition(position + IMAGE_WIDTH);
  };
  const moveLeft = () => {
    setPosition(position - IMAGE_WIDTH);
  };
  React.useEffect(() => {
    // 이미지 추가, 제거할 경우 슬라이드 위치 조정
    const maxPosition = (uploadedImages.length - 1) * -IMAGE_WIDTH;
    const addPosition =
      prevUploadedImages && prevUploadedImages.length * -IMAGE_WIDTH;
    if (position < maxPosition) setPosition(maxPosition);
    if (
      addPosition &&
      prevUploadedImages &&
      prevUploadedImages.length < uploadedImages.length
    )
      setPosition(addPosition);
  }, [uploadedImages]);

  React.useEffect(() => {
    // 좌우 방향기 보임 설정
    const timer = (func, arg) => {
      setTimeout(() => {
        func(arg);
      }, 200);
    };
    const maxPosition = (uploadedImages.length - 1) * -IMAGE_WIDTH;
    if (position === 0) timer(setLeftArrow, 'hidden');
    if (position !== 0) timer(setLeftArrow, 'visible');
    if (position === maxPosition) timer(setRightArrow, 'hidden');
    if (position !== maxPosition) timer(setRightArrow, 'visible');
  }, [uploadedImages, position]);
  return (
    <Container width={IMAGE_WIDTH}>
      {/* w={imageWidth} h={imageHeight} */}
      <HiddenBox width={IMAGE_WIDTH}>
        <ImageRoll
          position={position}
          length={uploadedImages.length}
          width={IMAGE_WIDTH}>
          {uploadedImages.length > 0 &&
            uploadedImages.map((url, index) => {
              return (
                <ImageStep key={index}>
                  <Image src={STATIC_URL + url} />
                </ImageStep>
              );
            })}
        </ImageRoll>
      </HiddenBox>
      <StatusBar>
        {uploadedImages.length > 1 &&
          uploadedImages.map((_, index) => (
            <Dot
              key={index}
              index={index}
              current={position}
              width={IMAGE_WIDTH}
            />
          ))}
      </StatusBar>
      <Controller>
        <CloseOutlined onClick={onClickDeleteImageBtn} />
        {uploadedImages.length < MAX && (
          <div onClick={onClick}>
            <PlusOutlined />
          </div>
        )}
        <WrapperL visible={leftArrow} onClick={moveRight}>
          <FontAwesomeIcon icon={faChevronCircleLeft} color='Gainsboro' />
        </WrapperL>
        <WrapperR visible={rightArrow} onClick={moveLeft}>
          <FontAwesomeIcon icon={faChevronCircleRight} color='Gainsboro' />
        </WrapperR>
      </Controller>
    </Container>
  );
};
const Container = styled.div<{ width: number }>`
  ${css.flexCenter}
  position: relative;
  width: 100%;
  height: 100%;
  max-width: ${({ width }) => width + 'px'};
  max-height: ${({ width }) => width + 'px'};
  overflow: hidden;
`;
const Controller = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;
const Wrapper = styled.div<{ visible: Visible }>`
  ${({ visible }) => `visibility:${visible};`}
  position: absolute;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
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
const WrapperR = styled(Wrapper)`
  right: 15px;
`;
const WrapperL = styled(Wrapper)`
  left: 15px;
`;
const HiddenBox = styled.div<{ width?: number }>`
  max-width: ${({ width }) => width + 'px'};
  /* width: 600px;
  height: 600px; */
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
const ImageStep = styled.div`
  width: 100%;
`;

const PlusOutlined = styled(antd.PlusOutlined)`
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 1;
  font-weight: bold;
  color: gray;
  font-size: 25px;
  opacity: 0.5;
  ${css.flexCenter}
  transition: 0.2s linear all;
  &:hover {
    transition: 0.2s linear all;
    opacity: 0.5;
    &:after {
      content: '사진 추가하기';
      font-size: 14px;
      margin-left: 8px;
      font-weight: normal;
      transition: 0.2s linear all;
    }
  }
`;
const CloseOutlined = styled(antd.CloseOutlined)`
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 1;
  font-weight: bold;
  color: gray;
  font-size: 25px;
  opacity: 0.5;
  &:hover {
    opacity: 0.8;
  }
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
  bottom: 20px;
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
  opacity: ${({ current, width, index }) =>
    -(current / width) === index ? 0.8 : 0.5};
  &:last-child {
    margin-right: 0;
  }
`;
export default ImageUpload;
