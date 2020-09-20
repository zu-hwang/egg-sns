import baseStyled, { css, ThemedStyledInterface } from 'styled-components';
export { css } from 'styled-components';
export const response = {
  // desktop:1167,
  web: 975,
  phone: 576,
};

// 미디어쿼리 ---------------------------------- 시작
// 참고: http://tlog.tammolo.com/blog/Next-js-SSR-Styled-component-feat-TS-c66fa617-64e0-4da6-bb01-5fb4dd7b2cf4/
// const media = {
//   desktop: (...args) => undefined,
//   tablet: (...args) => undefined,
//   phone: (...args) => undefined,
// };
// Object.keys(sizes).reduce((acc, label: string) => {
//   acc[label] = (...args) => css`
//     @media (max-width: ${sizes[label]}px) {
//       ${css(args.shift(), ...args)}
//     }
//   `;
//   return acc;
// }, media);
// 미디어쿼리 ---------------------------------- 끝

export const gutter = 28;
export const col = (response.web - 40 - gutter * 2) / 3;

const pointColor = {
  blue: `#0095f6`,
  lightBlue: `#5bb4f0`,
  darkBlue: `#00376b`,
  red: `tomato`,
};
export const theme = {
  dark: {
    mainBackground: `#333`,
    // neutral color
    title: `rgba(255,255,255,0.9)`,
    primaryText: `rgba(255,255,255,0.8)`,
    secondaryText: `rgba(255,255,255,0.45)`,
    midtoneText: `gray`,
    disable: `rgba(255,255,255,0.25)`,
    border: `rgba(255,255,255,0.15)`,
    divider: `rgba(255,255,255,0.06)`,
    background: `rgba(255,255,255,0.04)`,
    tableHeader: `rgba(255,255,255,0.02)`,
    response,
    blue: pointColor.blue,
    lightBlue: pointColor.lightBlue,
    darkBlue: pointColor.darkBlue,
    red: pointColor.red,
  },
  light: {
    mainBackground: `#fff`,
    // neutral color
    title: `rgba(0, 0, 0, 0.9)`,
    primaryText: `rgba(0, 0, 0, 0.8)`,
    secondaryText: `rgba(0, 0, 0, 0.45)`,
    midtoneText: `gray`,
    disable: `rgba(0, 0, 0, 0.25)`,
    border: `rgba(0, 0, 0, 0.15)`,
    divider: `rgba(0, 0, 0, 0.06)`,
    background: `rgba(0, 0, 0, 0.04)`,
    tableHeader: `rgba(0, 0, 0, 0.02)`,
    response,
    blue: pointColor.blue,
    lightBlue: pointColor.lightBlue,
    darkBlue: pointColor.darkBlue,
    red: pointColor.red,
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

// 타입 내보내기요~
export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
export default theme;
