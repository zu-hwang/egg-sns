import image from 'src/data/loginPageImageUrl';
import styled from 'styled-components';

const IconKeyHole = () => {
  return <Image url={image.iconSprite}></Image>;
};

const Image = styled.div<{ url: string }>`
  height: 62px;
  width: 62px;
  /* margin: 9px; */
  background: url(${({ url }) => url}) no-repeat;
  /* background-color: tomato; */
  background-size: ${`${880 / 2}px ${822 / 2}px`};
  background-position: -319px -223px;
`;

export default IconKeyHole;
