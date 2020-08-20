import React from 'react';
import styled, { css } from 'styled-components';
import Avatar, { UserName } from 'src/components/ui/Avatar';
import { flexCenter, font, fontBold, unit } from 'src/styles/theme';
import SampleImage from 'public/static/images/zuzu/2.jpg';

const Large = () => {
  return (
    <div>
      <ImageBox>
        <GradientBox>
          <Avatar isLargeCard={true}>
            <span>{'username'}</span>
          </Avatar>
        </GradientBox>
      </ImageBox>
    </div>
  );
};
const ImageBox = styled.div`
  /* z-index: -1; */
  background: url(${SampleImage}) no-repeat center;
  border-radius: 8px;
  overflow: hidden;
  background-size: cover;
  width: 116px;
  height: 208px;
  margin-left: 12px;
  align-items: flex-end;
  position: relative;
`;
const GradientBox = styled.div`
  ${flexCenter}
  position: absolute;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0));
  width: 100%;
  height: 60%;
`;

export default Large;
