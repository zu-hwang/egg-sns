import React from 'react';
import styled from 'styled-components';
import { flexCenter, fontBold } from 'src/styles/theme';

import Small from 'src/components/storyCard/Small';
import Large from 'src/components/storyCard/Large';

const friend = {};
const friendList = [
  friend,
  friend,
  friend,
  friend,
  friend,
  friend,
  friend,
  friend,
  friend,
  friend,
  friend,
];
const StorySlide = ({ mode }) => {
  return (
    <Container>
      {mode === 'large' && (
        <Header>
          <span>최근 스토리</span>
          <button>모두 보기</button>
        </Header>
      )}
      <MaskBox>
        <HorizonBox>
          {friendList.map((friend, index) => {
            return mode === 'small' ? (
              <Small key={index} />
            ) : (
              <Large key={index} />
            );
          })}
        </HorizonBox>
      </MaskBox>
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 2px;
  background-color: ${({ theme }) => theme.mainBackground};
  margin-bottom: 24px;
  padding: 16px 0;
`;
const Header = styled.header`
  padding: 0px 16px 10px 16px;
  ${flexCenter}
  justify-content:space-between;
  span {
    ${fontBold}
    font-size: 14px;
    color: ${({ theme }) => theme.secondaryText};
  }
  button {
    ${fontBold}
    font-size: 14px;
    border: none;
    background: transparent;
    padding: 0;
    color: ${({ theme }) => theme.primaryText};
  }
`;
const MaskBox = styled.div`
  width: 100%;
  overflow: hidden;
`;
const HorizonBox = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
`;
export default StorySlide;
