import {
  follow,
  unFollow,
  login,
  logout,
  requestFollow,
  requestUnFollow,
  requestUserData,
} from './user/actions';
// import {} from './comment';
// import {} from './feed';

// state 타입지정
export type ImageUrl = string | null;
export type Content = string | null;
export type LikeCount = Array<{ id: number; userId: number } | null>;
export type MyFeedList = Array<{ id: number; imageUrl: ImageUrl } | null>;

export interface UserData {
  id: number;
  username: string;
  imageUrl: string | null;
  content: string | null;
}

export type FollowList = Array<UserData | null>;

export interface Feed {
  id: number;
  author: UserData;
  imageUrl: ImageUrl;
  content: Content;
  like: LikeCount;
  comment: Comment;
}

export type FeedList = Array<Feed | null>;

export type Comment = Array<{
  id: number;
  author: UserData;
  content: Content;
  like: LikeCount;
} | null>;

export interface SelectFeed {
  id: number;
  imageUrl: ImageUrl;
  content: Content;
  author: UserData;
  like: LikeCount;
  comment: Comment;
}

export interface UserInitState {
  userData: UserData;
  followList: FollowList;
}

// 리듀서의 action인자에 사용될 타입
export type UserAction =
  | ReturnType<typeof follow>
  | ReturnType<typeof unFollow>
  | ReturnType<typeof login>
  | ReturnType<typeof logout>
  | ReturnType<typeof requestUserData>
  | ReturnType<typeof requestFollow>
  | ReturnType<typeof requestUnFollow>;
// ! Store의 전체 State
// const initState: InitState = {
//   userData: {
//     id: 0,
//     username: 'loading',
//     imageUrl: 'loading',
//     content: 'loading',
//   },
//   followList: [
//     {
//       id: 0,
//       username: 'loading',
//       imageUrl: 'loading',
//       content: 'loading',
//     },
//   ],
//   feedList: [
//     {
//       id: 0,
//       author: {
//         id: 0,
//         username: 'loading',
//         imageUrl: 'loading',
//         content: 'loading',
//       },
//       imageUrl: 'loading',
//       content: 'loading',
//       like: [{ id: 0, userId: 0 }],
//       comment: [
//         {
//           id: 0,
//           author: {
//             id: 0,
//             username: 'loading',
//             imageUrl: 'loading',
//             content: 'loading',
//           },
//           content: 'loading',
//           like: [{ id: 0, userId: 0 }],
//         },
//       ],
//     },
//   ],
//   myFeedList: [
//     {
//       id: 0,
//       imageUrl: 'loading',
//     },
//   ],
//   selectFeed: {
//     id: 3, // feedId,
//     imageUrl: 'loading', // FeedImage
//     content: 'loading',
//     author: {
//       id: 2, //userId,
//       username: 'loading',
//       content: 'loading',
//       imageUrl: 'loading',
//     },
//     like: [{ id: 0, userId: 0 }],
//     comment: [
//       {
//         id: 0,
//         author: {
//           id: 0,
//           username: 'loading',
//           imageUrl: 'loading',
//           content: 'loading',
//         },
//         content: 'loading',
//         like: [{ id: 0, userId: 0 }],
//       },
//     ],
//   },
// };
