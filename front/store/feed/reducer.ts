import produce from 'immer';
import * as egg from 'store/types';
import * as feed from 'store/feed/';

export const initialState: egg.Feed = {
  modalNewFeed: false,
  modalDetailMypage: false,
  newFeedAlert: false,
  pagingAlert: false,
  deleteCommentAlert: false,
  successNewFeed: false,
  successComment: false,
  uploadedImages: [],
  paging: null,
  homeFeedList: [],
  loading: false, // 홈피드, 마이페이지피드, 댓글쓰기
  loadingComment: false, // 댓글 수정
  loadingCommentDelete: false, // 댓글 삭제
  mypageProfile: null,
  mypageFeedList: [],
  selectedCommentId: null, // 수정할때만 쓰기
  deletedCommentId: null, // 삭제할때 쓰기
};

type Action =
  | ReturnType<typeof feed.addFollowList>
  | ReturnType<typeof feed.deleteFollowList>
  | ReturnType<typeof feed.requestUploadImage>
  | ReturnType<typeof feed.removeUploadedImage>
  | ReturnType<typeof feed.requestNewFeed>
  | ReturnType<typeof feed.successUploadNewFeed>
  | ReturnType<typeof feed.addFeedListAtHome>
  | ReturnType<typeof feed.requestHomeFeedList>
  | ReturnType<typeof feed.requestMyPageFeedList>
  | ReturnType<typeof feed.requestDeleteImage>
  | ReturnType<typeof feed.requestCreateComment>
  | ReturnType<typeof feed.requestUpdateComment>
  | ReturnType<typeof feed.requestDeleteComment>
  | ReturnType<typeof feed.updateComment>
  | ReturnType<typeof feed.requestMypageProfile>
  | ReturnType<typeof feed.addComment>
  | ReturnType<typeof feed.deleteComment>
  | ReturnType<typeof feed.successUploadComment>
  | ReturnType<typeof feed.addFeedHeart>
  | ReturnType<typeof feed.setLoading>
  | ReturnType<typeof feed.setLoadingCommentDelete>
  | ReturnType<typeof feed.setUploadedImages>
  | ReturnType<typeof feed.setModalNewFeed>
  | ReturnType<typeof feed.setMypageFeedList>
  | ReturnType<typeof feed.setMypageProfile>
  | ReturnType<typeof feed.setHomeFeedList>
  | ReturnType<typeof feed.setModalDetailMypage>
  | ReturnType<typeof feed.setAlertAutoOn>
  | ReturnType<typeof feed.setAlertNewFeed>
  | ReturnType<typeof feed.setAlertPaging>
  | ReturnType<typeof feed.setPaging>
  | ReturnType<typeof feed.setLoadingComment>
  | ReturnType<typeof feed.setCommentIdForDEL>
  | ReturnType<typeof feed.setCommentIdForUD>
  | ReturnType<typeof feed.deleteFeedHeart>;

export const reducer = (state = initialState, action: Action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case feed.SET_LOADING:
        draft.loading = action.payload;
        break;
      case feed.SET_LOADING_COMMENT:
        draft.loadingComment = action.payload;
        break;
      case feed.SUCCESS_UPLOAD_COMMENT:
        draft.successComment = action.payload;
        break;
      case feed.SET_MODAL_NEW_FEED:
        draft.modalNewFeed = action.payload;
        break;
      case feed.SET_UPLOADED_IMAGES:
        draft.uploadedImages = [...draft.uploadedImages, ...action.payload];
        break;
      case feed.REMOVE_UPLOADED_IMAGE:
        draft.uploadedImages = draft.uploadedImages.filter(
          (_, index) => index !== action.payload,
        );
        break;
      case feed.ADD_FOLLOW_LIST:
        draft.mypageProfile?.follower.push({ id: action.payload });
        break;
      case feed.DELETE_FOLLOW_LIST:
        if (state.mypageProfile && draft.mypageProfile) {
          draft.mypageProfile.follower = draft.mypageProfile.follower.filter(
            (list) => list.id !== action.payload,
          );
        }
        break;
      case feed.SET_PAGING:
        draft.paging = action.payload;
        break;
      case feed.SET_FEED_LIST_HOME:
        draft.homeFeedList = (draft.homeFeedList as egg.IFeed[]).concat(
          action.payload,
        );
        break;
      case feed.SET_MYPAGE_FEED_LIST:
        draft.mypageFeedList = (draft.mypageFeedList as egg.IMypageFeed[]).concat(
          action.payload,
        );
        break;
      case feed.SET_MYPAGE_PROFILE:
        if (action.payload) {
          draft.mypageProfile = action.payload;
        }
        break;
      case feed.SET_ALERT_NEW_FEED:
        draft.newFeedAlert = action.payload;
        break;
      case feed.SET_ALERT_PAGING:
        draft.pagingAlert = action.payload;
        break;
      case feed.SUCCESS_UPLOAD_NEW_FEED:
        // 리셋 : 업로드 데이터,.. 를 지금하면 창에서 날라가징...
        draft.successNewFeed = action.payload;
        draft.uploadedImages = initialState.uploadedImages;
        break;
      case feed.SET_COMMENT_ID_FOR_UD:
        draft.selectedCommentId = action.payload;
        break;
      case feed.SET_COMMENT_ID_FOR_DEL:
        draft.deletedCommentId = action.payload;
        break;
      case feed.ADD_FEED_LIST_AT_HOME:
        draft.homeFeedList.unshift(action.payload as never);
        break;
      case feed.ADD_COMMENT:
        (draft.homeFeedList as egg.IFeed[]).forEach(
          (feed: egg.IFeed, index) => {
            feed.id === (action.payload && action.payload.feedId) &&
              (draft.homeFeedList as egg.IFeed[])[index].Comments.unshift(
                action.payload.newComment as never,
              );
          },
        );
        break;
      case feed.UPDATE_COMMENT:
        (draft.homeFeedList as egg.IFeed[]).forEach((feed, fId) => {
          if (feed.id === action.payload.feedId) {
            (feed.Comments as egg.IComment[]).forEach((comment, cId) => {
              if (comment.id === action.payload.updatedComment.id) {
                draft.homeFeedList[fId].Comments[cId] =
                  action.payload.updatedComment;
              }
            });
          }
        });
        break;
      case feed.DELETE_COMMENT:
        (draft.homeFeedList as egg.IFeed[]).forEach(
          (feed, fId) =>
            feed.id === action.payload.feedId &&
            (feed.Comments as egg.IComment[]).forEach(
              (comment, cId) =>
                comment.id === action.payload.commentId &&
                draft.homeFeedList[fId].Comments.splice(cId, 1),
            ),
        );
        break;
      case feed.ADD_FEED_HEART:
        (draft.homeFeedList as egg.IFeed[]).forEach((feed, fId) => {
          feed.id === action.payload.feedId &&
            feed.FeedLike.unshift({ id: action.payload.userId } as never);
        });
        break;
      case feed.DELETE_FEED_HEART:
        console.log({ 페이로드: action.payload });
        (draft.homeFeedList as egg.IFeed[]).forEach((feed, fId) => {
          feed.id === action.payload.feedId &&
            feed.FeedLike.forEach((item, FLId) => {
              item.id === action.payload.userId &&
                draft.homeFeedList[fId].FeedLike.splice(FLId, 1);
            });
        });
        break;
      case feed.SET_LOADING_COMMENT_DELETE:
        draft.loadingCommentDelete = action.payload;
        break;
      // default:
      //   break;
    }
  });
};

export default reducer;
