import styled, { css } from 'styled-components';
export const response = {
  web: 975,
};

export const theme = {
  dark: {
    mainBackground: `#333`,
    // neutral color
    title: `rgba(255,255,255,0.9)`,
    primaryText: `rgba(255,255,255,0.8)`,
    secondaryText: `rgba(255,255,255,0.45)`,
    disable: `rgba(255,255,255,0.25)`,
    border: `rgba(255,255,255,0.15)`,
    divider: `rgba(255,255,255,0.06)`,
    background: `rgba(255,255,255,0.04)`,
    tableHeader: `rgba(255,255,255,0.02)`,
    response,
  },
  light: {
    mainBackground: `#fff`,
    // neutral color
    title: `rgba(0, 0, 0, 0.9)`,
    primaryText: `rgba(0, 0, 0, 0.8)`,
    secondaryText: `rgba(0, 0, 0, 0.45)`,
    disable: `rgba(0, 0, 0, 0.25)`,
    border: `rgba(0, 0, 0, 0.15)`,
    divider: `rgba(0, 0, 0, 0.06)`,
    background: `rgba(0, 0, 0, 0.04)`,
    tableHeader: `rgba(0, 0, 0, 0.02)`,
    response,
    // point-color
    // point-color
  },
};

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const font = css`
  font-family: 'Roboto', 'Noto Sans KR', sans-serif;
`;
export const fontBold = css`
  ${font}
  font-size: 16px;
  font-weight: 500;
`;
export const unit = 4;
