// const getContent = (content, mode) => {
//   let result = [];
//   if (mode === 'first') {
//     const firstLine = content.split('\n')[0];
//     const listWithSpace = firstLine.split(/(\s)/g).slice(0, 15); // 띄어쓰기 분리
//     listWithSpace.forEach((string) => {
//       if (string.match(hashtag)) {
//         string.split(hashtagSplit).forEach((str, index) => {
//           if (hashtag.test(str)) result.push('x' + str);
//         });
//       } else {
//         result.push(string);
//       }
//     });
//   } else {
//     // 전체에서 해쉬태그 기준으로 분리
//     // 리스트 맵돌리며 해쉬태그 일 경우 해시태그화
//     // 그밖의 경우 \n으로 분리
//     // 분리된 리스트 맵돌리며 \n을 br로 교체
//     // 아무것도 아닌경우 string 리턴
//     const hashSplit = content.split(hashtagSplit).map((str, index) => {
//       if (hashtag.test(str)) {
//         return 'x' + str;
//       } else if (str.match(/\\\n/g)) {
//         // 개행이 있을때
//         const result = str.split(/(\\\n)/g).map((s) => {
//           if (/\\\n/g.test(s)) {
//             return '<>{s}<br/><>';
//           } else {
//             return s;
//           }
//         });
//         return result;
//       } else {
//         return str;
//       }
//     });
//     console.log({ hashSplit });
//     hashSplit.forEach(() => {});
//   }
//   return { result };
// };
