import * as React from 'react';
import * as css from 'styles/theme';
import styled from 'styled-components';
import footerList from 'src/data/footerList';

interface FooterProps {
  position?: 'bottom' | 'side';
}
const Footer: React.FC<FooterProps> = ({ position = 'side' }) => {
  return (
    <FooterNav position={position}>
      <Ul position={position}>
        {footerList.length !== 0 &&
          footerList.map((list) => {
            return position === 'side' ? (
              <LiContent key={list.id} position={position}>
                {list.name}
              </LiContent>
            ) : (
              <Li key={list.id} position={position}>
                {list.name}
              </Li>
            );
          })}
      </Ul>
      <div>
        <CopyRight position={position}>
          © 2020 INSTAGRAM FROM FACEBOOK
        </CopyRight>
        <SubText position={position}>
          인스타그램 클론 프로젝트 Github @zu-hwang
        </SubText>
      </div>
    </FooterNav>
  );
};
const FooterNav = styled.nav`
  ${({ theme, position }: { theme: any; position: string }): string => {
    if (position === 'bottom') {
      return `
      width: 1000px;
      ${css.flexCenter}
      justify-content: space-between;
      margin-top: 0;
      margin: 0 auto;
      `;
    } else {
      return `
      width: 100%;
      margin-top: 20px;
      `;
    }
  }}
  ${css.font}
`;
const Ul = styled.ul`
  ${({ theme, position }: { theme: any; position: string }): string => {
    if (position === 'bottom') {
      return `
        ${css.flexCenter}
        justify-content:flex-start;
        `;
    } else {
      return `
      `;
    }
  }}
`;

const Li = styled.li`
  ${({ theme, position }: { theme: any; position: string }): string => {
    if (position === 'bottom') {
      return `
      margin-top: 5px;
        margin-right:15px;
        font-size: 13px;
        font-weight: 500;
        color: ${theme.darkBlue};
        `;
    } else {
      return `
        display: inline-block;
        font-size: 11px;
        font-weight: normal;
        color: ${theme.disable};
        `;
    }
  }}
  &:hover {
    cursor: pointer;
  }
`;
const LiContent = styled(Li)`
  &:after {
    content: '⋅';
    margin: 0 2px;
  }
  &:last-child:after {
    content: none;
  }
`;
const CopyRight = styled.p`
  ${({ theme, position }: { theme: any; position: string }): string => {
    if (position === 'bottom') {
      return `
      font-size: 12px;
      font-weight: 500;
      margin-top: 0;
      color: ${theme.secondaryText};
      `;
    } else {
      return `
      font-size: 11px;
      font-weight: normal;
      margin-top: 20px;
      color: ${theme.disable};
        `;
    }
  }}
  &:last-child {
    margin-top: 5px;
    font-weight: normal;
  }
`;
const SubText = styled(CopyRight)``;

export default Footer;
