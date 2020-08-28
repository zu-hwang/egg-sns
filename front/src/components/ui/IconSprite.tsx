import * as React from 'react';
import styled from 'styled-components';

interface IconSpriteProps {
  url: string;
  position: Array<number>;
  iconSize: Array<number>;
  imageSize: Array<number>;
}
const IconSprite: React.FC<IconSpriteProps> = ({
  url,
  position,
  iconSize,
  imageSize,
}) => {
  return (
    <Container>
      <Sprite
        url={url}
        position={position}
        iconSize={iconSize}
        imageSize={imageSize}
      />
    </Container>
  );
};
export const Container = styled.div`
  /* background-color: tomato; */
`;
export const Sprite = styled.div<{
  url: string;
  position: Array<number>;
  iconSize: Array<number>;
  imageSize: Array<number>;
}>`
  background: url(${({ url }) => url}) no-repeat;
  background-size: ${({ imageSize }) => `${imageSize[0]}px ${imageSize[1]}px`};
  background-position: ${({ position }) => `${position[0]}px ${position[1]}px`};
  width: ${({ iconSize }) => iconSize[0] + 'px'};
  height: ${({ iconSize }) => iconSize[1] + 'px'};
`;

export default IconSprite;
