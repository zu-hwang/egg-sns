import React from 'react';
import styled from 'styled-components';
import { flexCenter, fontBold } from 'src/styles/theme';
import defaultAvatarImage from 'public/static/images/zuzu/zuzu.jpg';

// ! 스토리 있을때 아바타에 빨간 줄 긋기
type Size = 'medium' | 'large' | 'small';
const Avatar = ({
  card = 'small',
  children,
  size = 'medium',
  url = defaultAvatarImage,
}: {
  children?: any;
  card?: 'small' | 'large';
  size?: Size;
  url?: string;
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
  ${flexCenter}
  flex-direction:column;
`;
const Container = styled.div<{ size: Size }>`
  ${flexCenter}
  width: ${({ size }) =>
    size === 'large' ? '158px' : size === 'small' ? '40px' : '62px'};
  height: ${({ size }) =>
    size === 'large' ? '158px' : size === 'small' ? '40px' : '62px'};
    border: 2px solid tomato;
    border-radius:50%;
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
  ${fontBold}
  font-size: 14px;
  text-align: center;
  color: ${(props) =>
    props.mode === 'large'
      ? props.theme.mainBackground
      : props.theme.primaryText};
`;

export default Avatar;
