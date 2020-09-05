export const REQUEST_UPLOAD_IMAGE = 'feed/REQUEST_UPLOAD_IMAGE';
export const REQUEST_UPLOAD_NEW_FEED = 'feed/REQUEST_UPLOAD_NEW_FEED';
export const SET_MODAL_NEW_FEED = 'feed/SET_WRITE_FEED_MODAL';
export const SET_UPLOADED_IMAGES = 'feed/SET_UPLOADED_IMAGES';
export const REMOVE_UPLOADED_IMAGE = 'feed/REMOVE_UPLOADED_IMAGE';

export const setModalNewFeed = (
  bool: boolean,
): { type: typeof SET_MODAL_NEW_FEED; payload: boolean } => ({
  type: SET_MODAL_NEW_FEED,
  payload: bool,
});

export const requestUploadImage = (formData) => ({
  type: REQUEST_UPLOAD_IMAGE,
  payload: formData,
});

export const setUploadedImages = (uplodedImageUrlList) => ({
  type: SET_UPLOADED_IMAGES,
  payload: uplodedImageUrlList,
});
export const removeUploadedImage = (
  seletedImageUrl: string,
): { type: typeof REMOVE_UPLOADED_IMAGE; payload: string } => ({
  type: REMOVE_UPLOADED_IMAGE,
  payload: seletedImageUrl,
});

export const requestNewFeed = (
  data: RequestNewFeedData,
): { type: typeof REQUEST_UPLOAD_NEW_FEED; payload: RequestNewFeedData } => {
  return { type: REQUEST_UPLOAD_NEW_FEED, payload: data };
};

export interface RequestNewFeedData {
  content: string;
  uplodedImages: Array<string>;
}
