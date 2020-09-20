import * as reg from 'src/util/regex';
import { HashTag } from 'src/components/feedCard/ContentBox';

export function insertHashtags(
  item: string | JSX.Element,
  index: number,
): JSX.Element | string;
export function insertHashtags(
  item: string,
  index: number,
): JSX.Element | string;
export function insertHashtags(
  item: JSX.Element | string,
  index: number,
): JSX.Element | string {
  // split과 정규표현식을 사용할 땐 ()로 감싸주어 구분자 손실을 제어할수 있다
  if (reg.hashtag.test(item as string)) {
    return <HashTag key={index}>{item}</HashTag>;
  }
  return item;
}

export const insertEnter = (line: string, index: number): JSX.Element => {
  return (
    <span key={index}>
      {line}
      <br />
    </span>
  );
};
