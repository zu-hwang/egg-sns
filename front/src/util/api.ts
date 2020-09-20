import * as axios from 'axios';
import * as egg from 'store/types';
import * as feed from 'store/feed/';

// let headers = new Headers();
// headers.append('Content-Type', 'application/json');
// headers.append('Accept', 'application/json');
// headers.append('Origin', 'http://localhost:3000');
// headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
// headers.append('Access-Control-Allow-Credentials', 'true');

export const api = axios.default.create({
  baseURL: 'http://localhost:3030',
  responseType: 'json',
  withCredentials: true, // 쿠키 땜시 설정
});

/** @팔로우_언팔로우 쿼리스트링 keyname : target */
export const follow = async (targetId: number): Promise<axios.AxiosResponse> =>
  await api.get(`/relation?target=${targetId}`);

export const unFollow = async (
  targetId: number,
): Promise<axios.AxiosResponse> =>
  await api.delete(`/relation?target=${targetId}`);

/** @api요청_회원가입 */
export const signUp = async (
  bodyData: egg.RequestSignUpData,
): Promise<axios.AxiosResponse<egg.RequestSignUpData>> =>
  await api.post('/account/sign-up', bodyData);

/** @api요청_로그인 */
export const logIn = async (
  bodyData: egg.RequestLoginData,
): Promise<axios.AxiosResponse<egg.RequestLoginData>> =>
  await api.post('/account/sign-in', bodyData);

/** @api요청_로그아웃 */
export const logOut = async (): Promise<axios.AxiosResponse> =>
  await api.get('/account/log-out');

/** @api요청_쿠키_유저정보_가져오기 */
export const loadUserData = async (): Promise<axios.AxiosResponse> =>
  await api.get('/account/user');

/** @api요청_인풋_유요성체크 */
export const inputValidation = async (
  body: egg.RequestInputValidData,
): Promise<axios.AxiosResponse<egg.RequestInputValidData>> =>
  await api.post('/account/validation', body);

/** @api요청_쿠키_만료연장 */
export const cookieExpiry = async (): Promise<axios.AxiosResponse> =>
  await api.get('/account/cookie-expiry');

/** @이미지업로드_피드 */
export const uploadImage = async ({
  formData,
}: feed.IUploadImage): Promise<axios.AxiosResponse<feed.IUploadImage>> =>
  await api.post('/upload/sampleImages', formData);
/** @이미지업로드_삭제 */
export const deleteSampleImage = async (
  deleteImageUrl,
): Promise<axios.AxiosResponse<{ deleteImageUrl: string }>> =>
  await api.post('/upload/delete', { deleteImageUrl });

/** @NEW_FEED_UPLOAD */
export const uploadNewFeed = async (
  data: feed.RequestNewFeedData,
): Promise<axios.AxiosResponse<feed.RequestNewFeedData>> =>
  await api.post('/feed/create', data);

/** @FeedList Read*/
export const homeFeedList = async (paging): Promise<axios.AxiosResponse> => {
  if (paging) {
    return await api.get(`/feeds?paging=${paging}`);
  }
  return await api.get('/feeds');
};

/** @Create_Comment 코멘트 추가 */
export const createComment = async (
  bodyData: feed.RequestCreateCommentBodyData,
): Promise<axios.AxiosResponse<feed.RequestCreateCommentBodyData>> =>
  await api.post(`/comment/create`, bodyData);

/** @Update_Comment 코멘트 업데이트 */
export const updateComment = async (
  bodyData: feed.RequestUpdateCommentBodyData,
): Promise<axios.AxiosResponse<feed.RequestUpdateCommentBodyData>> =>
  await api.post(`/comment/update`, bodyData);

/** @Update_Comment 코멘트 삭제 */
export const deleteComment = async (
  bodyData: feed.RequestDeleteCommentBodyData,
): Promise<axios.AxiosResponse<feed.RequestDeleteCommentBodyData>> =>
  await api.delete(`/comment/${bodyData.feedId}/${bodyData.commentId}`);

/** @Mypage_FeedList Read */
export const mypageFeedList = async (
  payload: feed.IParamsAndQuery,
): Promise<axios.AxiosResponse> => {
  if (payload.paging)
    return await api.get(`/feeds/${payload.userName}?paging=${payload.paging}`);
  return await api.get(`/feeds/${payload.userName}`);
};
/** @Mypage_Profile Read */
export const mypageProfile = async (
  payload: string,
): Promise<axios.AxiosResponse> => await api.get(`/feeds/${payload}/profile`);

/** @Heart_add GET*/
export const addFeedHeart = async (
  feedId: number,
): Promise<axios.AxiosResponse> => await api.get(`/like/feed/${feedId}`);

/** @Heart_delete DELETE*/
export const deleteFeedHeart = async (
  feedId: number,
): Promise<axios.AxiosResponse> => await api.delete(`/like/feed/${feedId}`);

/** @UserRecommand */
export const recommandUser = async (): Promise<axios.AxiosResponse> =>
  await api.get(`/relation/recommand`);

export default api;
