import * as React from 'react';
import * as css from 'styles/theme';
import * as antd from '@ant-design/icons';
import * as redux from 'src/hooks/customRedux';
import * as feed from 'store/feed';
import styled from 'styled-components';
import { STATIC_URL } from 'common/config';

interface ImageSlideSimpleProps {
  feedImage: string[];
}
const ImageSlideSimple: React.FC<ImageSlideSimpleProps> = ({ feedImage }) => {
  const dispatch = redux.useDispatch();
  const onClickDeleteImageBtn = (e) => {
    e.persist();
    const id = e.target.parentNode.parentNode.id || e.target.parentNode.id;
    dispatch(feed.removeUploadedImage(id));
  };
  return (
    <Container feedImage={feedImage}>
      {feedImage.length > 0 &&
        feedImage.map((url, index) => {
          console.log(STATIC_URL + url);
          return (
            <div key={index}>
              <Controller>
                <CloseOutlined onClick={onClickDeleteImageBtn} id={url} />
                {/* {feedImage.length < 10 && <PlusOutlined />} */}
              </Controller>
              <ImageMaxBox key={index} feedImage={feedImage}>
                <Image src={STATIC_URL + url} />
              </ImageMaxBox>
            </div>
          );
        })}
    </Container>
  );
};
const Container = styled.div<{ feedImage: string[] }>`
  ${css.flexCenter}
  position: relative;
  overflow: hidden;
  ${({ feedImage }) => {
    console.log({ feedImage });
    if (feedImage.length === 0) {
      // 파일 업로드 전
      return `
      width:600px;
      height:600px;
      min-width:600px;
      min-height:600px;
      `;
    } else {
      return `
      width:auto;
      height:auto;`;
    }
  }}
`;
const Controller = styled.div`
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.mainBackground};
  position: absolute;
  ${css.flexCenter}
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease-in-out;
  }
`;
const PlusOutlined = styled(antd.PlusOutlined)`
  position: absolute;
  font-size: 20px;
`;
const CloseOutlined = styled(antd.CloseOutlined)`
  font-size: 20px;
  position: absolute;
  top: 10px;
  right: 10px;
`;
const ImageMaxBox = styled.div<{ feedImage: string[] }>`
  ${css.flexCenter}
  overflow:hidden;
  top: 0;
  ${({ feedImage }) => {
    if (feedImage.length === 0) {
      // 파일 업로드 전
      return `
      width:600px;
      height:600px;
      `;
    } else {
      return `
      max-width:600px;
      max-height:600px;`;
    }
  }}
`;

const Image = styled.img`
  max-width: 600px;
  max-height: 600px;
  height: auto;
  margin-right: 25px;
  &:last-child {
    margin-right: 0;
  }
`;

export default ImageSlideSimple;
