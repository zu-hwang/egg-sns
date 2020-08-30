import * as React from 'react';

export type KeyNameProps = 'userId' | 'password';

export const useInputDefault = (
  initialValue: string,
): [string, (e: any) => void, React.Dispatch<React.SetStateAction<string>>] => {
  const [value, setValue] = React.useState(initialValue);
  const handleOnChange = React.useCallback((e: any) => {
    setValue(e.target.value);
  }, []);

  return [value, handleOnChange, setValue];
};

export default useInputDefault;
