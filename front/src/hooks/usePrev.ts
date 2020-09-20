// 이전 값과 현재 값 비교하는 훅
import { useRef, useEffect } from 'react';

const usePrev = <T>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
export default usePrev;
