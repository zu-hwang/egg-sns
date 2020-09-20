import * as React from 'react';
import * as css from 'styles/theme';
import * as redux from 'src/hooks/customRedux';
import * as antd from '@ant-design/icons';
// import * as egg from 'store/types';
import * as feed from 'store/feed/';
import styled from 'styled-components';
import FeedHeader from 'src/components/feedCard/FeedHeader';
import Alert from 'src/components/ui/Alert';
import ImageUpload from 'src/components/ui/ImageUpload';
interface INewFeed {
  onClick: () => void;
}
const NewFeed: React.FC<INewFeed> = (props) => {
  const MAX = 3;
  const inputFile = React.useRef<HTMLInputElement>(null);
  const dispatch = redux.useDispatch();
  const [content, setContent] = React.useState('');
  const modalNewFeed = redux.useSelector((s) => s.feed.modalNewFeed);
  const successNewFeed = redux.useSelector((s) => s.feed.successNewFeed);
  const uploadedImages = redux.useSelector((s) => s.feed.uploadedImages);
  const newFeedAlert = redux.useSelector((s) => s.feed.newFeedAlert);
  const loading = redux.useSelector((s) => s.feed.loading);
  const user = redux.useSelector((s) => s.account.user);
  const onChangeUploadImage = (e) => {
    const formData = new FormData();
    if (e.target.files.length + uploadedImages.length > MAX) {
      alert(`최대 ${MAX}개 이미지 업로드 가능합니다!`);
      e.target.form.reset();
    } else {
      // 유사배열형태인 files에 배열메서드 쓰기위해 아래처럼 작성
      [].forEach.call(e.target.files, (file, index) => {
        if (index < MAX) formData.append('addImages', file);
      });
      dispatch(feed.requestUploadImage(formData));
    }
  };
  const onButtonClick = React.useCallback(() => {
    if (inputFile && inputFile.current) {
      // Ref객체가 null이 아닐때 실행되도록 분기
      inputFile.current.click();
    }
  }, [inputFile]);
  React.useEffect(() => {}, [uploadedImages]);
  const onSubmitFeed = () => {
    if (content.length > 0 && uploadedImages.length > 0) {
      const data = {
        content: content,
        uploadedImages: uploadedImages,
      };
      dispatch(feed.requestNewFeed(data));
    } else {
      dispatch(feed.setAlertAutoOn('newFeed')); // 경고창 3초후 꺼짐
    }
  };
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  React.useEffect(() => {
    if (successNewFeed) dispatch(feed.setModalNewFeed(false));
  }, [successNewFeed]);
  return (
    <>
      {modalNewFeed && user !== null && (
        <FullScreen onOff={modalNewFeed}>
          <Wapper>
            <LeftOutlined />
            <RightOutlined />
            <Container>
              <LightBox>
                <form
                  method='post'
                  encType='multipart/form-data'
                  name='addImages'>
                  <UploadImgButton
                    ref={inputFile}
                    multiple
                    type='file'
                    accept='image/jpg,image/png,image/jpeg,'
                    name='addImages' // 백에서 받을때 사용할 이름
                    onChange={onChangeUploadImage}
                  />
                </form>
                {uploadedImages.length === 0 ? (
                  <UploadBtn>
                    <div onClick={onButtonClick}>
                      <antd.PlusOutlined />
                      <span>사진 업로드</span>
                    </div>
                  </UploadBtn>
                ) : (
                  <ImageUpload MAX={MAX} onClick={onButtonClick} />
                )}
              </LightBox>
              <RightBox uploadedImages={uploadedImages}>
                <div>
                  <FeedHeader
                    author={user.userName}
                    authorImage={user.imageUrl}
                  />
                </div>
                <TextField
                  placeholder={'내용을 작성해주세요'}
                  value={content}
                  onChange={onChangeContent}
                />
                <Button onClick={onSubmitFeed}>
                  {loading ? <LoadingOutlined /> : '전송'}
                </Button>
              </RightBox>
            </Container>
            {newFeedAlert && (
              <AlertWrapper>
                <Alert>사진과 게시글을 작성해주세요 😊</Alert>
              </AlertWrapper>
            )}
          </Wapper>
          <CloseOutlined onClick={props.onClick} />
        </FullScreen>
      )}
    </>
  );
};

const FullScreen = styled.div<{ onOff: boolean }>`
  position: relative;
  z-index: ${({ onOff }) => (onOff ? 1 : -1)};
  ${css.flexCenter}
  position:fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.divider}; /* or 투명 */
`;
const Container = styled.div`
  overflow: hidden;
  display: flex;
  height: 100%;
  max-height: 600px;
  position: relative;
  height: auto;
  justify-content: space-between;
  background-color: #fff;
  color: ${({ theme }) => theme.primaryText};
  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.border};
`;
const Wapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LeftOutlined = styled(antd.LeftOutlined)`
  position: absolute;
  left: -60px;
  font-size: 24px;
`;
const RightOutlined = styled(antd.RightOutlined)`
  position: absolute;
  right: -60px;
  font-size: 24px;
`;
const RightBox = styled.div<{ uploadedImages: string[] }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 335px;
  width: 335px;
  height: 100%;
  ${({ uploadedImages }) =>
    uploadedImages.length === 0
      ? `height:600px;`
      : `height:auto;max-heignt:600px;`}
  border-left: 1px solid ${({ theme }) => theme.border};
  &:first-child {
  }
`;
const LightBox = styled.div`
  ${css.flexCenter}
  height: 100%;
  & > form {
    ${css.flexCenter}
    height: 600px;
  }
`;
const UploadBtn = styled.div`
  ${css.flexCenter}
  width: 600px;
  padding: 20px;
  ${css.fontBold}
  & > div {
    height: 100%;
    cursor: pointer;
  }
  & > div > span:last-child {
    margin-left: 10px;
  }
`;
const UploadImgButton = styled.input`
  display: none;
`;
const Button = styled.button`
  width: 100%;
  /* padding: 10px 16px; */
  height: 54px;
  color: ${({ theme }) => theme.primaryText};
  ${css.fontBold}
  border-top: 1px solid ${({ theme }) => theme.border};
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.background};
  }
`;
const LoadingOutlined = styled(antd.LoadingOutlined)`
  font-size: 16px;
`;
const CloseOutlined = styled(antd.CloseOutlined)`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 24px;
`;

const TextField = styled.textarea`
  ${css.font}
  align-self:stretch;
  flex-grow: 2;
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  font-size: 14px;
  padding: 10px;
  border-top: 1px solid ${({ theme }) => theme.border};
`;

const AlertWrapper = styled.div`
  position: absolute;
  bottom: 60px;
  right: 18px;
`;
export default NewFeed;
