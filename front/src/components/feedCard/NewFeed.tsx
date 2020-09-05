import * as React from 'react';
import * as css from 'styles/theme';
import * as redux from 'src/hooks/customRedux';
import * as antd from '@ant-design/icons';
import * as feed from 'store/feed/';
import styled from 'styled-components';
import FeedHeader from 'src/components/feedCard/FeedHeader';
import ImageSlideSimple from 'src/components/ui/ImageSlideSimple';
interface INewFeed {
  onClick: () => void;
}
const NewFeed: React.FC<INewFeed> = (props) => {
  const inputFile = React.useRef(null);
  const dispatch = redux.useDispatch();
  const [content, setContent] = React.useState('');
  const uplodedImages = redux.useSelector((s) => {
    // console.log(s.feed);
    console.log('업로드이미지', s.feed.uplodedImages);
    return s.feed.uplodedImages;
  });
  const user = redux.useSelector((s) => s.account.user);
  const onChangeUploadImage = (e) => {
    const formData = new FormData();
    const MAX = 2;
    if (e.target.files.length > MAX) {
      alert(`${MAX}개 이미지 업로드 가능합니다!`);
      console.dir(e.target);
      e.target.form.reset();
    } else {
      // 10개 이하일때만 패치
      // 유사배열형태인 files에 배열메서드 쓰기위해 아래처럼 작성
      [].forEach.call(e.target.files, (file, index) => {
        if (index < MAX) formData.append('feedImages', file);
      });
      dispatch(feed.requestUploadImage(formData));
    }
  };
  const onButtonClick = () => {
    inputFile.current.click();
  };
  React.useEffect(() => {}, [uplodedImages]);
  console.log({ uplodedImages });
  const onSubmitFeed = () => {
    //
    const data = {
      content: content,
      uplodedImages: uplodedImages,
    };
    dispatch(feed.requestNewFeed(data));
  };
  const onChangeContent = (e) => {
    console.log(e.target.value);
    setContent(e.target.value);
  };
  return (
    <>
      {user !== null && (
        <FullScreen>
          <Wapper>
            <LeftOutlined />
            <RightOutlined />
            <Container>
              <LightBox>
                {uplodedImages.length === 0 ? (
                  <form
                    method='post'
                    encType='multipart/form-data'
                    name='feedImages'>
                    <UploadBtn>
                      <div onClick={onButtonClick}>
                        <antd.PlusOutlined />
                        <span>사진 업로드</span>
                      </div>
                    </UploadBtn>
                    <UploadImgButton
                      ref={inputFile}
                      multiple
                      type='file'
                      accept='image/jpg,impge/png,image/jpeg,image/gif'
                      name='feedImages' // 백에서 받을때 사용할 이름
                      onChange={onChangeUploadImage}
                    />
                  </form>
                ) : (
                  <ImageSlideSimple feedImage={uplodedImages} />
                )}
              </LightBox>
              <RightBox uplodedImages={uplodedImages}>
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
                <Button onClick={onSubmitFeed}>전송</Button>
              </RightBox>
            </Container>
          </Wapper>
          <CloseOutlined onClick={props.onClick} />
        </FullScreen>
      )}
    </>
  );
};

const FullScreen = styled.div`
  position: relative;
  z-index: 1;
  ${css.flexCenter}
  position:fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: transparent;
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
const RightBox = styled.div<{ uplodedImages: string[] }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 335px;
  width: 335px;
  height: 100%;
  ${({ uplodedImages }) =>
    uplodedImages.length === 0
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
  padding: 10px 16px;
  color: ${({ theme }) => theme.primaryText};
  ${css.fontBold}
  border-top: 1px solid ${({ theme }) => theme.border};
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.background};
  }
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
export default NewFeed;
