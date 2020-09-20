// ! feeds - 홈화면 피드 조회
/**
 * @param feedAuthorIdList : 작성자 id 목록 [나 + 내친구들]
 * @param order
 * @param limit
 */
const feedAuthorIdList = [6, 3, 4, 5, 6];
const order = `id DESC`;
const limit = 5;
console.log(
  `
SELECT id,content,createdAt FROM feeds
  WHERE ${feedAuthorIdList.reduce((acc, id, index) => {
    acc = acc + `(authorId="${id}")`;
    if (feedAuthorIdList.length !== index + 1) acc = acc + ` OR `;
    return acc;
  }, '')}
  ORDER BY ${order}
  LIMIT ${limit}
`,
);
