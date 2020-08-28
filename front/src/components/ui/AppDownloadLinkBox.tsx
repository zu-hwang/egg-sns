import * as React from 'react';
import styled from 'styled-components';
import { flexCenter } from 'styles/theme';
import image from 'src/data/loginPageImageUrl';

const AppDownloadLinkBox: React.FC = () => {
  return (
    <AppDownloadLink>
      <p>앱을 다운로드하세요.</p>
      <div>
        <AppStoreBtn src={image.appStoreBtn} />
        <GooglePlayBtn src={image.googlePlayBtn} />
      </div>
    </AppDownloadLink>
  );
};
const AppDownloadLink = styled.div`
  ${flexCenter}
  flex-direction:column;
  margin: 25px 0 0;
  p {
    margin-bottom: 20px;
    font-size: 14px;
    color: ${({ theme }) => theme.primaryText};
  }
  img:first-child {
    margin-right: 8px;
  }
`;
const AppStoreBtn = styled.img`
  cursor: pointer;
  height: 40px;
`;
const GooglePlayBtn = styled.img`
  cursor: pointer;
  height: 40px;
`;
export default AppDownloadLinkBox;
