import * as React from 'react';
import styled from 'styled-components';

interface InputErrorMessage {
  message: string;
}
const InputErrorMessage: React.FC<InputErrorMessage> = ({ message }) => {
  return <ErrorMessage>{message}</ErrorMessage>;
};

const ErrorMessage = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.red};
  text-align: center;
`;
export default InputErrorMessage;
