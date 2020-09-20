import * as egg from 'store/types';
export const REQUEST_UPLOAD_IMAGE = 'feed/REQUEST_UPLOAD_IMAGE';
export const REQUEST_DELETE_IMAGE = 'feed/REQUEST_DELETE_IMAGE';
export const REQUEST_UPLOAD_NEW_FEED = 'feed/REQUEST_UPLOAD_NEW_FEED';
export const REQUEST_FEED_LIST_HOME = 'feed/REQUEST_FEED_LIST_HOME';
export const REQUEST_FEED_LIST_MYPAGE = 'feed/REQUEST_FEED_LIST_MYPAGE';
export const REQUEST_MYPAGE_PROFILE = 'feed/REQUEST_MYPAGE_PROFILE';
export const REQUEST_CREATE_COMMENT = 'comment/REQUEST_CREATE_COMMENT';
export const REQUEST_DELETE_COMMENT = 'comment/REQUEST_DELETE_COMMENT';
export const REQUEST_UPDATE_COMMENT = 'comment/REQUEST_UPDATE_COMMENT';
export const REQUEST_HEART_ADD = 'comment/REQUEST_HEART_ADD';
export const REQUEST_HEART_DELETE = 'comment/REQUEST_HEART_DELETE';
export const ADD_FEED_HEART = 'feed/ADD_FEED_HEART';
export const DELETE_FEED_HEART = 'feed/DELETE_FEED_HEART';
export const SET_LOADING_COMMENT = 'comment/SET_LOADING_COMMENT';
export const SET_LOADING_COMMENT_DELETE = 'comment/SET_LOADING_COMMENT_DELETE';
export const SUCCESS_UPLOAD_COMMENT = 'feed/SUCCESS_UPLOAD_COMMENT';
export const SUCCESS_UPLOAD_NEW_FEED = 'feed/SUCCESS_UPLOAD_NEW_FEED';
export const ADD_FEED_LIST_AT_HOME = 'feed/ADD_FEED_LIST_AT_HOME';
export const ADD_COMMENT = 'feed/ADD_COMMENT';
export const DELETE_COMMENT = 'feed/DELETE_COMMENT';
export const UPDATE_COMMENT = 'feed/UPDATE_COMMENT';
export const UPDATE_FEED = 'feed/UPDATE_FEED';
export const SET_COMMENT_ID_FOR_DEL = 'feed/SET_COMMENT_ID_FOR_DEL';
export const SET_COMMENT_ID_FOR_UD = 'feed/SET_COMMENT_ID_FOR_UD';
export const SET_PAGING = 'feed/SET_PAGING';
export const SET_LOADING = 'feed/SET_LOADING';
export const SET_FEED_LIST_HOME = 'feed/SET_FEED_LIST_HOME';
export const SET_MYPAGE_FEED_LIST = 'feed/SET_MYPAGE_FEED_LIST';
export const SET_MYPAGE_PROFILE = 'feed/SET_MYPAGE_PROFILE';
export const SET_MODAL_NEW_FEED = 'feed/SET_WRITE_FEED_MODAL';
export const SET_MODAL_DETAIL_MYPAGE = 'feed/SET_MODAL_DETAIL_MYPAGE';
export const SET_ALERT_NEW_FEED = 'feed/SET_ALERT_NEW_FEED';
export const SET_ALERT_PAGING = 'feed/SET_ALERT_PAGING';
export const SET_ALERT_AUTO_ON = 'feed/SET_ALERT_AUTO_ON';
export const SET_UPLOADED_IMAGES = 'feed/SET_UPLOADED_IMAGES';
export const REMOVE_UPLOADED_IMAGE = 'feed/REMOVE_UPLOADED_IMAGE';
// 마이페이지 -> 팔로우 언팔로우
export const ADD_FOLLOW_LIST = 'feed/ADD_FOLLOW_LIST';
export const DELETE_FOLLOW_LIST = 'feed/DELETE_FOLLOW_LIST';

export const addFeedHeart = ({
  feedId,
  userId,
}: {
  feedId: number;
  userId: number;
}): {
  type: typeof ADD_FEED_HEART;
  payload: { feedId: number; userId: number };
} => ({
  type: ADD_FEED_HEART,
  payload: {
    feedId,
    userId,
  },
});
export const deleteFeedHeart = ({
  feedId,
  userId,
}: {
  feedId: number;
  userId: number;
}): {
  type: typeof DELETE_FEED_HEART;
  payload: { feedId: number; userId: number };
} => ({
  type: DELETE_FEED_HEART,
  payload: {
    feedId,
    userId,
  },
});
export interface HeartPayload {
  feedId: number;
}
export const requestHeartAdd = (
  feedId: number,
): {
  type: typeof REQUEST_HEART_ADD;
  payload: number;
} => ({ type: REQUEST_HEART_ADD, payload: feedId });

export const requestHeartDelete = (
  feedId: number,
): {
  type: typeof REQUEST_HEART_DELETE;
  payload: number;
} => ({
  type: REQUEST_HEART_DELETE,
  payload: feedId,
});
export const successUploadComment = (
  bool,
): {
  type: typeof SUCCESS_UPLOAD_COMMENT;
  payload: boolean;
} => ({
  type: SUCCESS_UPLOAD_COMMENT,
  payload: bool,
});
// 코멘트 리퀘스트 이후 추가하기
export const addComment = ({
  feedId,
  newComment,
}: {
  feedId: number;
  newComment: egg.IComment;
}): {
  type: typeof ADD_COMMENT;
  payload: {
    feedId: number;
    newComment: egg.IComment;
  };
} => ({
  type: ADD_COMMENT,
  payload: {
    feedId,
    newComment,
  },
});
export const updateComment = ({
  feedId,
  updatedComment,
}: {
  feedId: number;
  updatedComment: egg.IComment;
}): {
  type: typeof UPDATE_COMMENT;
  payload: {
    feedId: number;
    updatedComment: egg.IComment;
  };
} => ({
  type: UPDATE_COMMENT,
  payload: {
    feedId,
    updatedComment,
  },
});

export interface DeleteCommentData {
  feedId: number;
  commentId: number;
}
export const deleteComment = ({
  feedId,
  commentId,
}: DeleteCommentData): {
  type: typeof DELETE_COMMENT;
  payload: DeleteCommentData;
} => ({
  type: DELETE_COMMENT,
  payload: {
    feedId: feedId,
    commentId: commentId,
  },
});
export const setLoadingCommentDelete = (
  bool: boolean,
): {
  type: typeof SET_LOADING_COMMENT_DELETE;
  payload: boolean;
} => ({
  type: SET_LOADING_COMMENT_DELETE,
  payload: bool,
});
export const setCommentIdForUD = (
  commentId: number | null,
): {
  type: typeof SET_COMMENT_ID_FOR_UD;
  payload: number | null;
} => ({
  type: SET_COMMENT_ID_FOR_UD,
  payload: commentId,
});
export const setCommentIdForDEL = (
  commentId: number | null,
): {
  type: typeof SET_COMMENT_ID_FOR_DEL;
  payload: number | null;
} => ({
  type: SET_COMMENT_ID_FOR_DEL,
  payload: commentId,
});

export const addFollowList = (
  loginedUserId: number,
): { type: typeof ADD_FOLLOW_LIST; payload: number } => ({
  type: ADD_FOLLOW_LIST,
  payload: loginedUserId,
});
export const deleteFollowList = (
  loginedUserId: number,
): { type: typeof DELETE_FOLLOW_LIST; payload: number } => ({
  type: DELETE_FOLLOW_LIST,
  payload: loginedUserId,
});

export const setLoading = (
  bool: boolean,
): { type: typeof SET_LOADING; payload: boolean } => ({
  type: SET_LOADING,
  payload: bool,
});
export const setModalNewFeed = (
  bool: boolean,
): { type: typeof SET_MODAL_NEW_FEED; payload: boolean } => ({
  type: SET_MODAL_NEW_FEED,
  payload: bool,
});

export interface IUploadImage {
  formData: FormData;
  uplodedImages?: string[] | null;
}
export const requestUploadImage = (
  formData: FormData,
  uplodedImages?: string[] | null,
): {
  type: typeof REQUEST_UPLOAD_IMAGE;
  payload: IUploadImage;
} => ({
  type: REQUEST_UPLOAD_IMAGE,
  payload: { formData, uplodedImages },
});

export const setUploadedImages = (
  uplodedImageUrlList: string[],
): { type: typeof SET_UPLOADED_IMAGES; payload: string[] } => ({
  type: SET_UPLOADED_IMAGES,
  payload: uplodedImageUrlList,
});
export const requestDeleteImage = (
  badyData,
): {
  type: typeof REQUEST_DELETE_IMAGE;
  payload: { deleteImageUrl: string; index: number };
} => ({
  type: REQUEST_DELETE_IMAGE,
  payload: badyData,
});

export const removeUploadedImage = (
  index: number,
): { type: typeof REMOVE_UPLOADED_IMAGE; payload: number } => ({
  type: REMOVE_UPLOADED_IMAGE,
  payload: index,
});

export const requestNewFeed = (
  data: RequestNewFeedData,
): { type: typeof REQUEST_UPLOAD_NEW_FEED; payload: RequestNewFeedData } => {
  return { type: REQUEST_UPLOAD_NEW_FEED, payload: data };
};
export const successUploadNewFeed = (
  bool: boolean,
): {
  type: typeof SUCCESS_UPLOAD_NEW_FEED;
  payload: boolean;
} => ({ type: SUCCESS_UPLOAD_NEW_FEED, payload: bool });

export const addFeedListAtHome = (
  newFeedData: egg.IFeed[],
): {
  type: typeof ADD_FEED_LIST_AT_HOME;
  payload: egg.IFeed[];
} => ({
  type: ADD_FEED_LIST_AT_HOME,
  payload: newFeedData,
});

export const requestHomeFeedList = (
  paging?: number,
): {
  type: typeof REQUEST_FEED_LIST_HOME;
  payload?: number;
} => {
  if (paging) return { type: REQUEST_FEED_LIST_HOME, payload: paging };
  return { type: REQUEST_FEED_LIST_HOME };
};

export const setHomeFeedList = (
  homeFeedList: egg.IFeed[],
): {
  type: typeof SET_FEED_LIST_HOME;
  payload: egg.IFeed[];
} => ({
  type: SET_FEED_LIST_HOME,
  payload: homeFeedList,
});

export const setModalDetailMypage = (
  bool: boolean,
): { type: typeof SET_MODAL_DETAIL_MYPAGE; payload: boolean } => ({
  type: SET_MODAL_DETAIL_MYPAGE,
  payload: bool,
});
export const setAlertAutoOn = (
  mode: 'newFeed' | 'paging',
): {
  type: typeof SET_ALERT_AUTO_ON;
  payload: 'newFeed' | 'paging';
} => ({ type: SET_ALERT_AUTO_ON, payload: mode });

export const setAlertNewFeed = (
  bool: boolean,
): {
  type: typeof SET_ALERT_NEW_FEED;
  payload: boolean;
} => ({ type: SET_ALERT_NEW_FEED, payload: bool });
export const setAlertPaging = (
  bool: boolean,
): {
  type: typeof SET_ALERT_PAGING;
  payload: boolean;
} => ({ type: SET_ALERT_PAGING, payload: bool });

export const setPaging = (
  paging: number | null,
): {
  type: typeof SET_PAGING;
  payload: number | null;
} => ({ type: SET_PAGING, payload: paging });

export interface RequestNewFeedData {
  content: string;
  uploadedImages: Array<string>;
}

// ! 코멘트 CRUD

export interface RequestCreateCommentBodyData {
  content: string;
  feedId: number;
}
export interface ReturnRequestCreateComment {
  type: typeof REQUEST_CREATE_COMMENT;
  payload: RequestCreateCommentBodyData;
}
export const requestCreateComment = (
  bodyData: RequestCreateCommentBodyData,
): ReturnRequestCreateComment => ({
  type: REQUEST_CREATE_COMMENT,
  payload: bodyData,
});

export interface RequestUpdateCommentBodyData {
  content: string;
  commentId: number;
}
export interface ReturnRequestUpdateComment {
  type: typeof REQUEST_UPDATE_COMMENT;
  payload: RequestUpdateCommentBodyData;
}
export const requestUpdateComment = (
  bodyData: RequestUpdateCommentBodyData,
): ReturnRequestUpdateComment => ({
  type: REQUEST_UPDATE_COMMENT,
  payload: bodyData,
});

export interface RequestDeleteCommentBodyData {
  feedId: number;
  commentId: number;
}
export interface ReturnRequestDeleteComment {
  type: typeof REQUEST_DELETE_COMMENT;
  payload: RequestDeleteCommentBodyData;
}
export const requestDeleteComment = (
  bodyData: RequestDeleteCommentBodyData,
): ReturnRequestDeleteComment => ({
  type: REQUEST_DELETE_COMMENT,
  payload: bodyData,
});

export const setLoadingComment = (
  bool: boolean,
): { type: typeof SET_LOADING_COMMENT; payload: boolean } => ({
  type: SET_LOADING_COMMENT,
  payload: bool,
});

// ? 마이페이지 ======================================================

export const requestMypageProfile = (
  userName: string,
): {
  type: typeof REQUEST_MYPAGE_PROFILE;
  payload: string;
} => ({
  type: REQUEST_MYPAGE_PROFILE,
  payload: userName,
});

export interface IParamsAndQuery {
  userName: string;
  paging?: number;
}
export const requestMyPageFeedList = (
  paramsAndQuery: IParamsAndQuery,
): {
  type: typeof REQUEST_FEED_LIST_MYPAGE;
  payload: IParamsAndQuery;
} => ({ type: REQUEST_FEED_LIST_MYPAGE, payload: paramsAndQuery });

export const setMypageProfile = (
  mypageProfile: egg.IMypageProfile | null,
): {
  type: typeof SET_MYPAGE_PROFILE;
  payload: egg.IMypageProfile | null;
} => ({
  type: SET_MYPAGE_PROFILE,
  payload: mypageProfile,
});
export const setMypageFeedList = (
  mypageFeedList: egg.IMypageFeed[] | [],
): {
  type: typeof SET_MYPAGE_FEED_LIST;
  payload: egg.IMypageFeed[] | [];
} => ({
  type: SET_MYPAGE_FEED_LIST,
  payload: mypageFeedList,
});
