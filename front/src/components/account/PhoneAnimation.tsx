import * as React from 'react';
import styled from 'styled-components';
import image from 'src/data/loginPageImageUrl';

const PhoneAnimation: React.FC = () => {
  return (
    <PhoneImage>
      <OverlayImage src={image.screen[0]} />
      <BottomImage src={image.screen[1]} />
    </PhoneImage>
  );
};

const PhoneImage = styled.div`
  position: relative;
  width: 454px;
  height: 618px;
  background: url(${image.device}) no-repeat center;
  background-size: contain;
`;
const BottomImage = styled.div<{ src: string }>`
  position: absolute;
  top: 96px;
  left: 148px;
  width: ${480 / 1.95 + 'px'};
  height: ${854 / 1.96 + 'px'};
  background: url(${({ src }) => src}) no-repeat center;
  background-size: cover;
  opacity: 1;
  transition: ease-in-out 1s all;
`;
const OverlayImage = styled(BottomImage)``;

export default PhoneAnimation;
