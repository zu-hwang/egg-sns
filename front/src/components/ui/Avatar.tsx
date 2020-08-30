import * as React from 'react';
import * as css from 'styles/theme';
import styled from 'styled-components';
import defaultAvatarImage from 'public/static/images/zuzu/zuzu.jpg';

// ! 스토리 있을때 아바타에 빨간 줄 긋기
type Size = 'medium' | 'large' | 'small';
interface AvatarProps {
  children?: any;
  card?: 'small' | 'large';
  size?: Size;
  url?: string;
}
const Avatar: React.FC<AvatarProps> = ({
  card = 'small',
  children,
  size = 'medium',
  url = defaultAvatarImage,
}) => {
  // console.log({ size, url });
  return (
    <Div>
      <Container size={size}>
        <UserImage size={size} src={url}></UserImage>
      </Container>
      {children && <UserName mode={card}>{children}</UserName>}
    </Div>
  );
};
const Div = styled.div`
  ${css.flexCenter}
  flex-direction:column;
`;
const Container = styled.div<{ size: Size }>`
  ${css.flexCenter}
  width: ${({ size }) =>
    size === 'large' ? '158px' : size === 'small' ? '40px' : '62px'};
  height: ${({ size }) =>
    size === 'large' ? '158px' : size === 'small' ? '40px' : '62px'};
  border: 2px solid tomato;
  border-radius: 50%;
`;

const UserImage = styled.img<{ size: Size }>`
  width: ${({ size }) =>
    size === 'large' ? '150px' : size === 'small' ? '34px' : '56px'};
  height: ${({ size }) =>
    size === 'large' ? '150px' : size === 'small' ? '34px' : '56px'};
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.border};
`;

export const UserName = styled.p<{ mode?: 'large' | 'small' }>`
  margin-top: 6px;
  ${css.fontBold}
  font-size: 14px;
  text-align: center;
  color: ${(props) =>
    props.mode === 'large'
      ? props.theme.mainBackground
      : props.theme.primaryText};
`;

export default Avatar;
