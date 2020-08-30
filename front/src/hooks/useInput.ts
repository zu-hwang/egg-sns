import * as redux from 'src/hooks/customRedux';
import * as React from 'react';
import * as egg from 'store/types';
import * as account from 'store/account';

export type KeyNameProps =
  | 'contact'
  | 'userId'
  | 'email'
  | 'phoneNumber'
  | 'userName'
  | 'fullName'
  | 'password';

export const useInput = (
  keyName: KeyNameProps,
): [string, (e: any) => void, React.Dispatch<React.SetStateAction<string>>] => {
  const [value, setValue] = React.useState('');
  const dispatch = redux.useDispatch();
  const handleOnChange = React.useCallback(
    (e: any) => {
      setValue(e.target.value);
      console.log(keyName);
      let bodyData: egg.RequestInputValidData = {
        keyName,
        value: e.target.value,
      };
      dispatch(account.requestInputValid(bodyData));
    },
    [keyName],
  );

  return [value, handleOnChange, setValue];
};

export default useInput;
