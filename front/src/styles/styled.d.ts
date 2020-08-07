// 스타일드-컴포넌트 내부 스타일정의 가저오기
import 'styled-components';

declare module 'styled-compontns' {
  export interface DefaultTheme {
    dark: {
      mainBackground: string;
      // neutral color
      title: string;
      primaryText: string;
      secondaryText: string;
      disable: string;
      border: string;
      divider: string;
      background: string;
      tableHeader: string;
    };
    light: {
      mainBackground: string;
      // neutral color
      title: string;
      primaryText: string;
      secondaryText: string;
      disable: string;
      border: string;
      divider: string;
      background: string;
      tableHeader: string;
      // point-color
      // point-color
    };
    response: {};
  }
}
