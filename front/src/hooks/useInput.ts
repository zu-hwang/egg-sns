// import * as React from 'react';
import { useState, useCallback, Dispatch, SetStateAction } from 'react';

const useInput = (
  initValue: string,
): [string, (e: any) => void, Dispatch<SetStateAction<string>>] => {
  const [value, setValue] = useState(initValue);
  const handler = useCallback((e: any) => {
    // console.log('useInput', e.target.value);
    setValue(e.target.value);
  }, []);
  return [value, handler, setValue];
};

export default useInput;
