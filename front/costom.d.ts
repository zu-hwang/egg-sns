import * as React from 'react';
import * as store from 'store';
import { Task } from 'redux-saga';
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

declare module 'redux' {
  export interface Task {
    /**
     * Returns true if the task hasn't yet returned or thrown an error
     */
    isRunning(): boolean;
    /**
     * Returns true if the task has been cancelled
     */
    isCancelled(): boolean;
    /**
     * Returns task return value. `undefined` if task is still running
     */
    result<T = any>(): T | undefined;
    /**
     * Returns task thrown error. `undefined` if task is still running
     */
    error(): any | undefined;
    /**
     * Returns a Promise which is either:
     * - resolved with task's return value
     * - rejected with task's thrown error
     */
    toPromise<T = any>(): Promise<T>;
    /**
     * Cancels the task (If it is still running)
     */
    cancel(): void;
    setContext<C extends object>(props: Partial<C>): void;
  }

  interface Store {
    // sagaTask: Task | null;
    sagaTask: Task;
  }
}

// declare module 'next' {
//   interface NextPageContext {
//     store?: store.SagaStore;
//   }
// }
