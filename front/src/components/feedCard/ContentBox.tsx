import * as React from 'react';
// import * as css from 'styles/theme';
import * as reg from 'src/util/regex';
import styled from 'styled-components';

interface IContentBox {
  authorName: string;
  content: string;
}
const ContentBox: React.FC<IContentBox> = ({ authorName, content }) => {
  const [moreActive, setMoreActive] = React.useState(false);
  const insertHashtags = (
    item: string,
    index: number,
  ): JSX.Element | string => {
    // split과 정규표현식을 사용할 땐 ()로 감싸주어 구분자 손실을 제어할수 있다
    if (reg.hashtag.test(item as string))
      return <HashTag key={index}>{item}</HashTag>;
    return item;
  };
  const insertEnter = (item: string | JSX.Element): string | JSX.Element => {
    if (typeof item === 'string') {
      item.split(/(\\\n)/g).map((string) => {
        if (/\\\n/g.test(string)) {
          // ! 개행 작동 안함.. 나중에 수정하기
          return <br />;
        }
        return string;
      });
    }
    return item;
  };

  const onClickMoreBtn = () => {
    setMoreActive(true);
  };

  const contentPrint = (first?: boolean) => {
    if (first) {
      const firstLine = content.split('\n')[0];
      const stringWithSpaceList = firstLine.split(/(\s)/); // 공백기준 짜르기 -> 글짤림 방지
      const appliedHashtag = stringWithSpaceList.map((string) => {
        if (string !== ' ')
          return string.split(reg.hashtagSplit).map(insertHashtags);
        return string;
      });
      return appliedHashtag;
    }
    return content.split(reg.hashtagSplit).map(insertHashtags).map(insertEnter);
  };
  React.useEffect(() => {
    const contentLines = content.split('\n');
    if (contentLines.length === 1 && contentLines[0].length < 40) {
      setMoreActive(true); // 더보기 된 상태 === 더보기 버튼 없음
    }
  }, [content]);
  React.useEffect(() => {}, [authorName, content]);
  return (
    <Container>
      <Content moreActive={moreActive}>
        <AuthorName>{authorName}</AuthorName>
        {/* 첫줄 */}
        {!moreActive && contentPrint(true)}
        {/* 첫줄 */}
        {moreActive && contentPrint()}
      </Content>
      {!moreActive && <MoreButton onClick={onClickMoreBtn}>더 보기</MoreButton>}
    </Container>
  );
};

const Container = styled.div`
  font-size: 14px;
  margin: 0 16px;
`;
const AuthorName = styled.span`
  font-weight: 500;
  margin-right: 10px;
`;
const Content = styled.span<{ moreActive: boolean }>`
  ${({ moreActive }) => {
    if (!moreActive) {
      return `
      max-width: 60%;
      text-overflow: ellipsis;`;
    }
    return `
    white-space: wrap;
    `;
  }}
  line-height:1.3em;
`;
export const HashTag = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.darkBlue};
  opacity: 0.8;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;
const MoreButton = styled.span`
  padding: 0;
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.secondaryText};
  cursor: pointer;
  &:before {
    content: '...';
  }
`;
export default ContentBox;
