import React, { ComponentElement, Component } from 'react';
import styled from 'styled-components';
import { flexCenter, fontBold } from 'src/styles/theme';
import defaultAvatarImage from 'public/static/images/zuzu/zuzu.jpg';

// ! 스토리 있을때 아바타에 빨간 줄 긋기
type Size = 'medium' | 'large' | 'small';
const Avatar = ({
  isLargeCard = false,
  children,
  size = 'medium',
  url = defaultAvatarImage,
}: {
  children?: ComponentElement;
  isLargeCard?: boolean;
  size?: Size;
  url?: string;
}) => {
  // console.log({ size, url });
  return (
    <div>
      <Container size={size}>
        <UserImage size={size} src={url}></UserImage>
      </Container>
      {children && <UserName isLargeCard={isLargeCard}>{children}</UserName>}
    </div>
  );
};

const Container = styled.div<{ size: Size }>`
  ${flexCenter}
  width: ${({ size }) =>
    size === 'large' ? '156px' : size === 'small' ? '40px' : '62px'};
  height: ${({ size }) =>
    size === 'large' ? '156px' : size === 'small' ? '40px' : '62px'};
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
const StoryLine = styled.canvas`
  width: 100%;
  height: 100%;
`;
export const UserName = styled.p`
  margin-top: 6px;
  ${fontBold}
  font-size: 14px;
  text-align: center;
  color: ${(props) =>
    props.isLargeCard ? props.theme.mainBackground : props.theme.primaryText};
`;

export default Avatar;
