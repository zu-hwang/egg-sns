export const numberWithComma = (n: number): string => {
  const inputToString = n.toString().split('.');
  return (
    inputToString[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
    (inputToString[1] ? '.' + inputToString[1] : '')
  );
};

export default numberWithComma;
