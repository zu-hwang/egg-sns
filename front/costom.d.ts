/**
 * 타입스크립트에서 .svg파일 사용하기
 * 1. custom.d.ts 에 .svg 타입 선언
 * 2. tsconfig.json에 "include":[..., 경로/custom.d.ts"] 추가
 */

declare module '\*.svg' {
  import React = require('react');
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '\*.jpg' {
  const content: string;
  export default content;
}

declare module '\*.png' {
  const content: string;
  export default content;
}

declare module '\*.json' {
  const content: string;
  export default content;
}
