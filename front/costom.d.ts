import * as React from 'react';
import * as store from 'store';
/**
 * 타입스크립트에서 .svg파일 사용하기
 * 1. custom.d.ts 에 .svg 타입 선언
 * 2. tsconfig.json에 "include":[..., 경로/custom.d.ts"] 추가
 */

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.json' {
  const content: string;
  export default content;
}

declare module 'react' {
  interface HTMLAttributes<T>
    extends React.AriaAttributes,
      React.DOMAttributes<T> {
    // extends React's HTMLAttributes
    // ! Type error: Property 'disabled' does not exist on type 'Pick<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "value" | ... 264 more ... | "formTarget"> & { ...; } & ThemeProps<...>'. 와 같은 에러 발생!!!!..
    // 참고 URL : https://stackoverflow.com/questions/46215614/property-does-not-exist-on-type-detailedhtmlprops-htmldivelement-with-react
    // 커스텀 버튼 컴포넌트의 disabled 속성의 타입 설정
    disabled?: boolean;
  }
}

// declare module 'next' {
//   interface NextPageContext {
//     store?: store.SagaStore;
//   }
// }
