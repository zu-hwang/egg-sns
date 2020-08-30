import * as React from 'react';
import * as css from 'styles/theme';
import styled from 'styled-components';
import image from 'src/data/loginPageImageUrl';
import IconSprite from 'src/components/ui/IconSprite';

const TabMenu: React.FC = () => {
  // 탭메뉴를 state로 관리해야 하나...?
  return (
    <LocalNav>
      <Ul>
        <Li>
          <IconSprite
            url={image.iconSprite}
            iconSize={[13, 13]}
            imageSize={[912 / 2, 860 / 2]}
            position={[-444, -176]}
          />
          게시물
        </Li>
        <Li>
          <IconSprite
            url={image.iconSprite}
            iconSize={[13, 13]}
            imageSize={[912 / 2, 860 / 2]}
            position={[-444, -108]}
          />
          IGTV
        </Li>
        <Li>
          <IconSprite
            url={image.iconSprite}
            iconSize={[13, 13]}
            imageSize={[912 / 2, 860 / 2]}
            position={[-443, -227]}
          />
          저장됨
        </Li>
        <Li>
          <IconSprite
            url={image.iconSprite}
            iconSize={[13, 13]}
            imageSize={[912 / 2, 860 / 2]}
            position={[-444, -136]}
          />
          태그됨
        </Li>
      </Ul>
    </LocalNav>
  );
};
const LocalNav = styled.nav`
  margin-top: 44px;
  border-top: 1px solid ${({ theme }) => theme.border};
  width: 100%;
`;
const Ul = styled.ul`
  width: 100%;
  position: relative;
  ${css.flexCenter}
`;
const Li = styled.li`
  ${css.flexCenter}
  justify-content:space-between;
  position: relative;
  width: 55px;
  margin: 0 20px;
  padding: 20px 2px;
  ${css.fontBold}
  font-size: 12px;
  text-align: center;
  top: -1px;
  border-top: 1px solid rgba(0, 0, 0, 0);
  color: ${({ theme }) => theme.primeryText};
  opacity: 0.5;
  &:hover {
    opacity: 1;
    border-top: 1px solid ${({ theme }) => theme.primaryText};
  }
  &:active {
    opacity: 1;
  }
`;

export default TabMenu;
