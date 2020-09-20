import * as React from 'react';
import * as css from 'styles/theme';
import styled from 'styled-components';
import image from 'src/data/loginPageImageUrl';
import IconSprite from 'src/components/ui/IconSprite';

interface ITabMenu {
  tabSelected: 'feed' | 'igtv' | 'saved' | 'taged';
  onClick: (e) => void;
}

const TabMenu: React.FC<ITabMenu> = ({ onClick, tabSelected }) => {
  // 탭메뉴를 state로 관리해야 하나...?
  return (
    <LocalNav>
      <Ul>
        {/* 클릭 -> 리듀서 state변경 */}
        <Li
          active={tabSelected === 'feed' ? true : false}
          data-tabname={'feed'}
          onClick={onClick}>
          <IconSprite
            data-tabname={'feed'}
            url={image.iconSprite}
            iconSize={[13, 13]}
            imageSize={[912 / 2, 860 / 2]}
            position={[-444, -176]}
          />
          게시물
        </Li>
        <Li
          active={tabSelected === 'igtv' ? true : false}
          data-tabname={'igtv'}
          onClick={onClick}>
          <IconSprite
            data-tabname={'igtv'}
            url={image.iconSprite}
            iconSize={[13, 13]}
            imageSize={[912 / 2, 860 / 2]}
            position={[-444, -108]}
          />
          IGTV
        </Li>
        <Li
          active={tabSelected === 'saved' ? true : false}
          data-tabname={'saved'}
          onClick={onClick}>
          <IconSprite
            data-tabname={'saved'}
            url={image.iconSprite}
            iconSize={[13, 13]}
            imageSize={[912 / 2, 860 / 2]}
            position={[-443, -227]}
          />
          저장됨
        </Li>
        <Li
          active={tabSelected === 'taged' ? true : false}
          data-tabname={'taged'}
          onClick={onClick}>
          <IconSprite
            data-tabname={'taged'}
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
const Li = styled.li<{ active: boolean }>`
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
  ${({ active, theme }) =>
    active &&
    `   
      opacity: 1;
      border-top: 1px solid ${theme.primaryText};
  `}
  &:hover {
    cursor: pointer;
    /* opacity: 1;
    border-top: 1px solid ${({ theme }) =>
      theme.primaryText}; */
  }
`;

export default TabMenu;
