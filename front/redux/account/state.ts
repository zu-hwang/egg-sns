// 타입스크립트 인터페이스 정의

export interface Account {
  user: {
    id: number;
    fullName: string;
    username: string;
    imageUrl: string;
    content: string;
  };
  // myPage: {
  //   feeds: [
  //     {
  //       id: number;
  //       author: string;
  //       authorImage: string;
  //       content: string;
  //       likes: [{ id: number; userId: number }];
  //       comments: [
  //         {
  //           id: number;
  //           author: string;
  //           authorImage: string;
  //           content: string;
  //           likes: [{ id: number; userId: number }];
  //         },
  //       ];
  //     },
  //   ];
  //   follower: [
  //     {
  //       id: number;
  //       userId: number;
  //     },
  //   ];
  //   follow: [
  //     {
  //       id: number;
  //       targetUserId: number;
  //     },
  //   ];
  // };
}
