import * as React from 'react';
import * as css from 'styles/theme';
import styled from 'styled-components';
import { BASIC_USER_AVATAR } from 'common/config';

// ! 스토리 있을때 아바타에 빨간 줄 긋기
type Size = 'medium' | 'large' | 'small' | 'xsmall';
interface AvatarProps {
  children?: any;
  card?: 'small' | 'large';
  size?: Size;
  url?: string | null;
  onClick?: (e) => void;
}

const Avatar: React.FC<AvatarProps> = ({
  children,
  onClick,
  url = BASIC_USER_AVATAR, // undefined일때만 기본값 적용됨, null일때 styled에서 기본이미지적용
  card = 'small',
  size = 'medium',
}) => {
  return (
    <Div data-nav={'my'} onClick={onClick}>
      <Container data-nav={'my'} size={size}>
        {url !== null && <UserImage data-nav={'my'} size={size} src={url} />}
        {url === null && (
          <UserImage data-nav={'my'} size={size} src={BASIC_USER_AVATAR} />
        )}
      </Container>
      {children && <UserName mode={card}>{children}</UserName>}
    </Div>
  );
};

Avatar.defaultProps = {};

const Div = styled.div`
  ${css.flexCenter}
  flex-direction:column;
  &:hover {
    cursor: pointer;
  }
`;
const Container = styled.div<{ size: Size }>`
  ${css.flexCenter}
  width: ${({ size }) => {
    switch (size) {
      case 'xsmall':
        return '26px';
      case 'small':
        return '40px';
      case 'medium':
        return '62px';
      case 'large':
        return '158px';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case 'xsmall':
        return '26px';
      case 'small':
        return '40px';
      case 'medium':
        return '62px';
      case 'large':
        return '158px';
    }
  }};
  border: 2px solid tomato;
  border-radius: 50%;
`;

const UserImage = styled.img<{ size: Size }>`
  width: ${({ size }) => {
    switch (size) {
      case 'xsmall':
        return '22px';
      case 'small':
        return '34px';
      case 'medium':
        return '56px';
      case 'large':
        return '150px';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case 'xsmall':
        return '22px';
      case 'small':
        return '34px';
      case 'medium':
        return '56px';
      case 'large':
        return '150px';
    }
  }};

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
